/**
 * Mock Prisma Client — Mode Test (USE_MOCK_DB=true)
 *
 * Remplace le vrai client Prisma par une implémentation en mémoire
 * qui lit les données depuis test-data/db.json.
 * Les écritures (create/update/delete) modifient uniquement la mémoire
 * (pas de persistance), ce qui convient parfaitement aux tests et démos.
 */

import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

// ─── Chargement du JSON ───────────────────────────────────────────────────────

function loadDb() {
  const filePath = path.join(process.cwd(), "test-data", "db.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

// Chargement unique au démarrage (singleton en mémoire)
const db = loadDb();

// Compteurs auto-incrémentés
const counters: Record<string, number> = {
  collaborateurs: Math.max(0, ...db.collaborateurs.map((c: any) => c.id)) + 1,
  services:       Math.max(0, ...db.services.map((s: any) => s.id)) + 1,
  fonctions:      Math.max(0, ...db.fonctions.map((f: any) => f.id)) + 1,
  roles:          Math.max(0, ...db.roles.map((r: any) => r.id)) + 1,
  fournisseurs:   Math.max(0, ...db.fournisseurs.map((f: any) => f.id)) + 1,
  budgets:        Math.max(0, ...db.budgets.map((b: any) => b.id)) + 1,
  demandes:       Math.max(0, ...db.demandes.map((d: any) => d.id)) + 1,
  historiqueValidations: Math.max(0, ...db.historiqueValidations.map((h: any) => h.id)) + 1,
};

function nextId(table: string) {
  return counters[table]++;
}

// ─── Helpers génériques ───────────────────────────────────────────────────────

function applyWhere(items: any[], where: any): any[] {
  if (!where) return items;
  return items.filter((item) => matchesWhere(item, where));
}

function matchesWhere(item: any, where: any): boolean {
  for (const key of Object.keys(where)) {
    if (key === "AND") {
      if (!where.AND.every((w: any) => matchesWhere(item, w))) return false;
      continue;
    }
    if (key === "OR") {
      if (!where.OR.some((w: any) => matchesWhere(item, w))) return false;
      continue;
    }
    if (key === "NOT") {
      if (matchesWhere(item, where.NOT)) return false;
      continue;
    }
    const val = where[key];
    if (val === undefined) continue;
    if (val === null) {
      if (item[key] !== null && item[key] !== undefined) return false;
      continue;
    }
    if (typeof val === "object" && !Array.isArray(val)) {
      // Opérateurs Prisma : contains, startsWith, in, not, gt, gte, lt, lte
      if ("contains" in val) {
        const s = String(item[key] ?? "").toLowerCase();
        if (!s.includes(String(val.contains).toLowerCase())) return false;
      } else if ("startsWith" in val) {
        if (!String(item[key] ?? "").startsWith(val.startsWith)) return false;
      } else if ("in" in val) {
        if (!val.in.includes(item[key])) return false;
      } else if ("not" in val) {
        if (item[key] === val.not) return false;
      } else if ("gt" in val) {
        if (!(item[key] > val.gt)) return false;
      } else if ("gte" in val) {
        if (!(item[key] >= val.gte)) return false;
      } else if ("lt" in val) {
        if (!(item[key] < val.lt)) return false;
      } else if ("lte" in val) {
        if (!(item[key] <= val.lte)) return false;
      } else {
        // Nested object comparison (traité comme égalité de l'id)
        if (item[key] !== val) return false;
      }
    } else {
      if (item[key] !== val) return false;
    }
  }
  return true;
}

function applyOrderBy(items: any[], orderBy: any): any[] {
  if (!orderBy) return items;
  const orders = Array.isArray(orderBy) ? orderBy : [orderBy];
  return [...items].sort((a, b) => {
    for (const order of orders) {
      for (const [key, dir] of Object.entries(order)) {
        const av = a[key];
        const bv = b[key];
        if (av === bv) continue;
        if (av == null) return 1;
        if (bv == null) return -1;
        const cmp = av < bv ? -1 : 1;
        return dir === "desc" ? -cmp : cmp;
      }
    }
    return 0;
  });
}

function applySelect(items: any[], select: any): any[] {
  if (!select) return items;
  return items.map((item) => {
    const result: any = {};
    for (const key of Object.keys(select)) {
      if (select[key] === true) {
        result[key] = item[key];
      } else if (typeof select[key] === "object") {
        // Relation sélectionnée — on inclut simplement la valeur brute
        result[key] = item[key];
      }
    }
    return result;
  });
}

function applySkipTake(items: any[], skip?: number, take?: number): any[] {
  let result = items;
  if (skip) result = result.slice(skip);
  if (take !== undefined) result = result.slice(0, take);
  return result;
}

// ─── Résolution des relations (include) ──────────────────────────────────────

function resolveIncludes(item: any, include: any, tableName: string): any {
  if (!include || !item) return item;
  const result = { ...item };

  for (const [rel, opts] of Object.entries(include as Record<string, any>)) {
    const refInclude = typeof opts === "object" && opts !== null && "include" in opts ? opts.include : undefined;
    const refSelect  = typeof opts === "object" && opts !== null && "select"  in opts ? opts.select  : undefined;
    const refWhere   = typeof opts === "object" && opts !== null && "where"   in opts ? opts.where   : undefined;

    switch (`${tableName}.${rel}`) {
      // collaborateur → collaborateurRoles
      case "collaborateurs.collaborateurRoles": {
        let rows = db.collaborateurRoles.filter((cr: any) => cr.matricule === item.matricule);
        if (refInclude?.role) {
          rows = rows.map((cr: any) => ({
            ...cr,
            role: db.roles.find((r: any) => r.id === cr.roleID) ?? null,
          }));
        }
        result[rel] = rows;
        break;
      }
      // collaborateur → comptes
      case "collaborateurs.comptes": {
        result[rel] = db.comptesUtilisateurs.find((c: any) => c.matricule_collaborateur === item.matricule) ?? null;
        break;
      }
      // collaborateur → fonction
      case "collaborateurs.fonction": {
        result[rel] = db.fonctions.find((f: any) => f.abreviation === item.fonctionAbbrev) ?? null;
        break;
      }
      // collaborateur → service
      case "collaborateurs.service": {
        result[rel] = db.services.find((s: any) => s.abreviation === item.serviceAbbrev) ?? null;
        break;
      }
      // compteUtilisateur → collaborateur
      case "comptesUtilisateurs.collaborateur": {
        let collab = db.collaborateurs.find((c: any) => c.matricule === item.matricule_collaborateur) ?? null;
        if (collab && refInclude) {
          collab = resolveIncludes(collab, refInclude, "collaborateurs");
        }
        result[rel] = collab;
        break;
      }
      // demande → auteur
      case "demandes.auteur": {
        result[rel] = db.collaborateurs.find((c: any) => c.matricule === item.auteurMatricule) ?? null;
        break;
      }
      // demande → fournisseur
      case "demandes.fournisseur": {
        result[rel] = db.fournisseurs.find((f: any) => f.id === item.fournisseurID) ?? null;
        break;
      }
      // demande → budget
      case "demandes.budget": {
        result[rel] = db.budgets.find((b: any) => b.id === item.budgetID) ?? null;
        break;
      }
      // demande → historique
      case "demandes.historique": {
        let rows = db.historiqueValidations.filter((h: any) => h.demandeurID === item.id);
        if (refWhere) rows = applyWhere(rows, refWhere);
        if (refInclude?.valideur) {
          rows = rows.map((h: any) => ({
            ...h,
            valideur: db.collaborateurs.find((c: any) => c.matricule === h.valideurMatricule) ?? null,
          }));
        }
        result[rel] = rows;
        break;
      }
      // historiqueValidation → demandeur
      case "historiqueValidations.demandeur": {
        result[rel] = db.demandes.find((d: any) => d.id === item.demandeurID) ?? null;
        break;
      }
      // service → collaborateurs (relation)
      case "services.collaborateurs": {
        result[rel] = db.collaborateurs.filter((c: any) => c.serviceAbbrev === item.abreviation);
        break;
      }
      // service → budgets
      case "services.budgets": {
        result[rel] = db.budgets.filter((b: any) => b.serviceId === item.id);
        break;
      }
      // budget → service
      case "budgets.service": {
        result[rel] = db.services.find((s: any) => s.id === item.serviceId) ?? null;
        break;
      }
      default:
        result[rel] = null;
    }

    // Appliquer le select si demandé sur la relation
    if (refSelect && result[rel]) {
      if (Array.isArray(result[rel])) {
        result[rel] = applySelect(result[rel], refSelect);
      } else {
        result[rel] = applySelect([result[rel]], refSelect)[0];
      }
    }
  }
  return result;
}

// ─── Fabrique de table générique ─────────────────────────────────────────────

function makeTable(tableName: string, getItems: () => any[]) {
  return {
    findMany: async (args?: any) => {
      let items = getItems();
      if (args?.where)   items = applyWhere(items, args.where);
      if (args?.orderBy) items = applyOrderBy(items, args.orderBy);
      items = applySkipTake(items, args?.skip, args?.take);
      if (args?.include) items = items.map((i) => resolveIncludes(i, args.include, tableName));
      if (args?.select)  items = applySelect(items, args.select);
      return items;
    },

    findFirst: async (args?: any) => {
      let items = getItems();
      if (args?.where)   items = applyWhere(items, args.where);
      if (args?.orderBy) items = applyOrderBy(items, args.orderBy);
      let item = items[0] ?? null;
      if (item && args?.include) item = resolveIncludes(item, args.include, tableName);
      if (item && args?.select)  item = applySelect([item], args.select)[0];
      return item;
    },

    findUnique: async (args?: any) => {
      let items = getItems();
      if (args?.where) {
        // Compound key support: @@id([a, b])
        items = items.filter((item) => {
          for (const [k, v] of Object.entries(args.where as Record<string, any>)) {
            if (typeof v === "object" && v !== null) {
              // Composite-key object like { matricule: "X", roleID: 1 }
              for (const [sk, sv] of Object.entries(v as Record<string, any>)) {
                if (item[sk] !== sv) return false;
              }
            } else {
              if (item[k] !== v) return false;
            }
          }
          return true;
        });
      }
      let item = items[0] ?? null;
      if (item && args?.include) item = resolveIncludes(item, args.include, tableName);
      if (item && args?.select)  item = applySelect([item], args.select)[0];
      return item;
    },

    create: async (args?: any) => {
      const data = { id: nextId(tableName), ...args?.data };
      getItems().push(data);
      return data;
    },

    createMany: async (args?: any) => {
      const created = (args?.data || []).map((d: any) => ({ id: nextId(tableName), ...d }));
      getItems().push(...created);
      return { count: created.length };
    },

    update: async (args?: any) => {
      const items = getItems();
      const idx = items.findIndex((item) => matchesWhere(item, args.where));
      if (idx === -1) throw new Error(`[MockDB] ${tableName}.update: record not found`);
      items[idx] = { ...items[idx], ...args.data };
      return items[idx];
    },

    updateMany: async (args?: any) => {
      const items = getItems();
      let count = 0;
      items.forEach((item, i) => {
        if (matchesWhere(item, args.where)) {
          items[i] = { ...item, ...args.data };
          count++;
        }
      });
      return { count };
    },

    delete: async (args?: any) => {
      const items = getItems();
      const idx = items.findIndex((item) => matchesWhere(item, args.where));
      if (idx === -1) throw new Error(`[MockDB] ${tableName}.delete: record not found`);
      const [deleted] = items.splice(idx, 1);
      return deleted;
    },

    deleteMany: async (args?: any) => {
      const items = getItems();
      const before = items.length;
      const toKeep = args?.where ? items.filter((i) => !matchesWhere(i, args.where)) : [];
      items.length = 0;
      items.push(...toKeep);
      return { count: before - toKeep.length };
    },

    count: async (args?: any) => {
      let items = getItems();
      if (args?.where) items = applyWhere(items, args.where);
      return items.length;
    },

    aggregate: async (args?: any) => {
      let items = getItems();
      if (args?.where) items = applyWhere(items, args.where);
      const result: any = { _count: items.length };
      if (args?._sum) {
        for (const field of Object.keys(args._sum)) {
          result._sum = result._sum ?? {};
          result._sum[field] = items.reduce((acc: number, i: any) => acc + (parseFloat(i[field]) || 0), 0);
        }
      }
      return result;
    },

    upsert: async (args?: any) => {
      const items = getItems();
      const idx = args?.where ? items.findIndex((i) => matchesWhere(i, args.where)) : -1;
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...args.update };
        return items[idx];
      } else {
        const created = { id: nextId(tableName), ...args.create };
        items.push(created);
        return created;
      }
    },
  };
}

// ─── Mock Prisma Client ───────────────────────────────────────────────────────

const mockPrismaClient = {
  collaborateur:          makeTable("collaborateurs",          () => db.collaborateurs),
  comptesUtilisateurs:    makeTable("comptesUtilisateurs",     () => db.comptesUtilisateurs),
  roles:                  makeTable("roles",                   () => db.roles),
  collaborateurRoles:     makeTable("collaborateurRoles",      () => db.collaborateurRoles),
  service:                makeTable("services",                () => db.services),
  fonction:               makeTable("fonctions",               () => db.fonctions),
  fournisseur:            makeTable("fournisseurs",            () => db.fournisseurs),
  budget:                 makeTable("budgets",                 () => db.budgets),
  workflowEtapes:         makeTable("workflowEtapes",          () => db.workflowEtapes),
  demandeur:              makeTable("demandes",                () => db.demandes),
  historiqueValidation:   makeTable("historiqueValidations",   () => db.historiqueValidations),

  // Transactions simulées (exécution séquentielle)
  $transaction: async (operations: any) => {
    if (typeof operations === "function") {
      return operations(mockPrismaClient);
    }
    return Promise.all(operations);
  },

  $connect:    async () => {},
  $disconnect: async () => {},
  $queryRaw:   async () => [],
  $executeRaw: async () => 0,
};

export default mockPrismaClient;

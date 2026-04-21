/**
 * Types et Interfaces du Projet (Pure TypeScript - Sans Prisma)
 */

export enum Civilite {
  HOMME = "Homme",
  FEMME = "Femme",
}

export enum TypeNavette {
  ACHAT = "Achat",
  PAIEMENT = "Paiement",
  NOTE_FRAIS = "NoteFrais",
  DRFMS = "DRFMS",
  DRFME = "DRFME",
}

export enum StatutDemande {
  EN_ATTENTE = "En attente",
  REFUSEE = "Refusée",
  VALIDEE = "Validée",
  EN_MAGASIN = "En magasin",
}

export enum StatutValidation {
  VALIDEE = "Validée",
  REFUSEE = "Refusée",
  EN_ATTENTE = "En attente",
  MIS_A_JOUR = "Mis à jour",
}

export interface Service {
  id: number;
  nomService: string;
  abreviation?: string | null;
  chefServiceMatricule?: string | null;
  chef?: Collaborateur | null;
  budgets?: Budget[];
  collaborateurs?: Collaborateur[];
  fonctions?: Fonction[];
}

export interface Fournisseur {
  id: number;
  nom?: string | null;
  adresse?: string | null;
  nomCheque?: string | null;
  nif?: string | null;
  cin?: string | null;
  demandes?: Demandeur[];
}

export interface Fonction {
  id: number;
  nomFonction: string;
  abreviation?: string | null;
  serviceId?: number | null;
  chefMatricule?: string | null;
  chef?: Collaborateur | null;
  service?: Service | null;
  collaborateurs?: Collaborateur[];
}

export interface Collaborateur {
  id: number;
  matricule: string;
  nom?: string | null;
  prenom?: string | null;
  prenomUsuelle?: string | null;
  civilite?: Civilite | null;
  fonctionAbbrev?: string | null;
  serviceAbbrev?: string | null;
  telephone?: string | null;
  mailPro?: string | null;
  photo?: string | null;
  collaborateurRoles?: CollaborateurRoles[];
  fonction?: Fonction | null;
  service?: Service | null;
  comptes?: ComptesUtilisateurs | null;
  demandes?: Demandeur[];
  fonctionsChef?: Fonction[];
  historiqueValide?: HistoriqueValidation[];
  servicesChef?: Service[];
}

export interface ComptesUtilisateurs {
  matricule_collaborateur: string;
  motDePasse: string;
  collaborateur?: Collaborateur;
}

export interface Roles {
  id: number;
  nomRole: string;
  collaborateurRoles?: CollaborateurRoles[];
}

export interface CollaborateurRoles {
  matricule: string;
  roleID: number;
  collaborateur?: Collaborateur;
  role?: Roles;
}

export interface Budget {
  id: number;
  codeBudgetaire: string;
  montantDisponible: number | string;
  serviceId?: number | null;
  service?: Service | null;
  demandes?: Demandeur[];
}

export interface WorkflowEtapes {
  id: number;
  type: TypeNavette;
  etape: number;
  roleRequis: string;
  description?: string | null;
}

export interface Demandeur {
  id: number;
  auteurMatricule?: string | null;
  type: TypeNavette;
  etapeActuelle: number;
  numero?: number | null;
  objet?: string | null;
  description?: string | null;
  motif?: string | null;
  quantite?: number | null;
  fournisseurID?: number | null;
  pu?: number | string | null;
  montant?: number | string | null;
  devis?: string | null;
  pieceJointe?: string | null;
  justificationChoix?: string | null;
  imputationComptable?: string | null;
  activite?: string | null;
  codeTIGER?: string | null;
  modePaiement?: string | null;
  paiementDetail?: string | null;
  numeroBonCommande?: string | null;
  dateLivraison?: Date | string | null;
  versQui?: string | null;
  statut: StatutDemande;
  budgetID?: number | null;
  dateDepot: Date | string;
  dateFinalisation?: Date | string | null;
  isAPGenere: boolean;
  isBCGenere: boolean;
  isAPExporte: boolean;
  reference?: string | null;
  auteur?: Collaborateur | null;
  budget?: Budget | null;
  fournisseur?: Fournisseur | null;
  historique?: HistoriqueValidation[];
}

export interface HistoriqueValidation {
  id: number;
  demandeurID: number;
  etape: number;
  valideurMatricule?: string | null;
  statut: StatutValidation;
  motifRefus?: string | null;
  dateValidation: Date | string;
  id_navette?: number | null;
  reference_navette?: string | null;
  demandeur?: Demandeur;
  valideur?: Collaborateur | null;
}

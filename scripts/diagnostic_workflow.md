# Rapport de Diagnostic : Visibilité de l'onglet "À valider"

Après analyse de la base de données et de l'algorithme de workflow, voici pourquoi rien ne s'affiche pour le **Contrôleur de Gestion** :

## 1. État des Workflows
L'ordre de validation dans la table `WorkflowEtapes` est correct et conforme à vos attentes :
- **Navette Achat** : L'étape 5 requiert bien le rôle `"Contrôleur de Gestion"`.
- **Note de Frais** : L'étape 3 requiert bien le rôle `"Contrôleur de Gestion"`.

## 2. État des Demandes
Il existe actuellement des demandes bloquées à ces étapes :
- **Achat** : La demande #8 est à l'étape 5 (`EN_ATTENTE`).
- **Note de Frais** : Les demandes #6 et #7 sont à l'étape 3 (`EN_ATTENTE`).

## 3. La cause du problème
Le problème vient de la table `CollaborateurRoles`. Bien que le rôle existe dans la table `Roles` (ID 6), **aucun utilisateur n'est associé à ce rôle**.

### Résultats de l'analyse :
| Rôle | ID | Nombre d'utilisateurs assignés |
| :--- | :--- | :--- |
| **Contrôleur de Gestion** | 6 | **0** |
| **Directrice** | 7 | **0** |

C'est pour cette raison que même si Joseph RANAIVOSON ou Caroline VINCENT DE TAPOL se connectent, le système ne leur présente aucune demande à valider : légalement (selon la base de données), ils ne possèdent pas ces rôles.

## 4. Solution proposée
Il faut assigner les rôles aux bons matricules dans la table `CollaborateurRoles`. 

### Script de correction suggéré :
Vous pouvez exécuter ce script pour rétablir les accès :

```typescript
// scripts/fix-roles-assignment.ts
import { PrismaClient } from '../src/generated/prisma_v2';
const prisma = new PrismaClient();

async function main() {
  // 1. Assigner Joseph RANAIVOSON au rôle Contrôleur de Gestion (ID 6)
  await prisma.collaborateurRoles.upsert({
    where: { matricule_roleID: { matricule: 'PCRS 0018', roleID: 6 } },
    update: {},
    create: { matricule: 'PCRS 0018', roleID: 6 }
  });

  // 2. Assigner Caroline VINCENT DE TAPOL au rôle Directrice (ID 7)
  await prisma.collaborateurRoles.upsert({
    where: { matricule_roleID: { matricule: 'DPR', roleID: 7 } },
    update: {},
    create: { matricule: 'DPR', roleID: 7 }
  });

  console.log("Rôles assignés avec succès.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
```

Une fois ces rôles assignés, les demandes apparaîtront instantanément dans leur onglet "À valider".

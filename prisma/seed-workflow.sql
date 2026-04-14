-- Script SQL pour initialiser les étapes de workflow
-- À exécuter après la création de la base de données

-- ============================================
-- ============================================
-- NAVETTE ACHAT (7 étapes)
-- ============================================

-- Étape 1: Chef de Service
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Achat', 1, 'ChefService', 'Validation du Chef de Service')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 2: Assistante Logistique
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Achat', 2, 'AssistanteLogistique', 'Validation/Refus/Prendre dans le magasin')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 3: Chargée Achat
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Achat', 3, 'Chargée Achat', 'Remplissage (P.U, Fournisseur, Devis, Justification) et validation')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 4: Responsable Financier
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Achat', 4, 'Responsable Financier', 'Validation de la décision de la Chargée Achat')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 5: Contrôleur de Gestion
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Achat', 5, 'Contrôleur de Gestion', 'Remplissage et validation')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 6: Direction
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Achat', 6, 'Directrice', 'Validation finale')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 7: Chargée Achat (Retour pour édition Bon de Commande)
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Achat', 7, 'Chargée Achat', 'Validation finale et édition Bon de Commande')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- ============================================
-- NAVETTE PAIEMENT (4 étapes)
-- ============================================

-- Étape 1: Chef de Service
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Paiement', 1, 'ChefService', 'Validation du Chef de Service')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 2: Responsable Financier
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Paiement', 2, 'Responsable Financier', 'Validation')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 3: Contrôleur de Gestion
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Paiement', 3, 'Contrôleur de Gestion', 'Remplissage et validation')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 4: Direction
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('Paiement', 4, 'Directrice', 'Validation finale (avec Autorisation de Paiement)')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- ============================================
-- NAVETTE NOTE DE FRAIS (4 étapes)
-- ============================================

-- Étape 1: Chef de Service
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('NoteFrais', 1, 'ChefService', 'Validation du Chef de Service')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 2: Responsable Financier
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('NoteFrais', 2, 'Responsable Financier', 'Validation')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 3: Contrôleur de Gestion
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('NoteFrais', 3, 'Contrôleur de Gestion', 'Remplissage et validation')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 4: Direction
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('NoteFrais', 4, 'Directrice', 'Validation finale')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- ============================================
-- NAVETTE DRFMS (4 étapes)
-- ============================================

-- Étape 1: Chef de Service
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('DRFMS', 1, 'ChefService', 'Validation du Chef de Service')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 2: Responsable Financier
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('DRFMS', 2, 'Responsable Financier', 'Validation')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 3: Contrôleur de Gestion
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('DRFMS', 3, 'Contrôleur de Gestion', 'Remplissage et validation')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 4: Direction
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('DRFMS', 4, 'Directrice', 'Validation finale')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- ============================================
-- NAVETTE DRFME (4 étapes)
-- ============================================

-- Étape 1: Chef de Service
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('DRFME', 1, 'ChefService', 'Validation du Chef de Service')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 2: Responsable Financier
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('DRFME', 2, 'Responsable Financier', 'Validation')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 3: Contrôleur de Gestion
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('DRFME', 3, 'Contrôleur de Gestion', 'Remplissage et validation')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);

-- Étape 4: Direction
INSERT INTO WorkflowEtapes (TypeNavette, Etape, RoleRequis, Description)
VALUES ('DRFME', 4, 'Directrice', 'Validation finale')
ON DUPLICATE KEY UPDATE RoleRequis = VALUES(RoleRequis), Description = VALUES(Description);


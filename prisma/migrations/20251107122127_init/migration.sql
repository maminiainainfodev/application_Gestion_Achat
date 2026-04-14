-- CreateTable
CREATE TABLE `Service` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NomService` VARCHAR(191) NOT NULL,
    `Abreviation` VARCHAR(191) NULL,
    `ChefServiceMatricule` VARCHAR(191) NULL,

    UNIQUE INDEX `Service_NomService_key`(`NomService`),
    UNIQUE INDEX `Service_Abreviation_key`(`Abreviation`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fournisseur` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nom` VARCHAR(191) NULL,
    `Adresse` TEXT NULL,
    `NomCheque` VARCHAR(191) NULL,
    `NIF` VARCHAR(191) NULL,
    `CIN` VARCHAR(191) NULL,

    UNIQUE INDEX `Fournisseur_NIF_key`(`NIF`),
    UNIQUE INDEX `Fournisseur_CIN_key`(`CIN`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fonction` (
    `ID_Fonction` INTEGER NOT NULL AUTO_INCREMENT,
    `NomFonction` VARCHAR(191) NOT NULL,
    `Abreviation` VARCHAR(191) NULL,
    `ServiceID` INTEGER NULL,
    `ChefMatricule` VARCHAR(191) NULL,

    UNIQUE INDEX `Fonction_NomFonction_key`(`NomFonction`),
    UNIQUE INDEX `Fonction_Abreviation_key`(`Abreviation`),
    PRIMARY KEY (`ID_Fonction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Collaborateurs` (
    `Id_collaborateur` INTEGER NOT NULL AUTO_INCREMENT,
    `Matricule` VARCHAR(191) NOT NULL,
    `Nom` VARCHAR(191) NULL,
    `Prenom` VARCHAR(191) NULL,
    `PrenomUsuelle` VARCHAR(191) NULL,
    `Civilite` ENUM('Homme', 'Femme') NULL,
    `FonctionAbbrev` VARCHAR(191) NULL,
    `ServiceAbbrev` VARCHAR(191) NULL,
    `Telephone` VARCHAR(191) NULL,
    `MailPro` VARCHAR(191) NULL,
    `Photo` VARCHAR(191) NULL,

    UNIQUE INDEX `Collaborateurs_Matricule_key`(`Matricule`),
    PRIMARY KEY (`Id_collaborateur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComptesUtilisateurs` (
    `Matricule_collaborateur` VARCHAR(191) NOT NULL,
    `MotDePasse` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Matricule_collaborateur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NomRole` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Roles_NomRole_key`(`NomRole`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CollaborateurRoles` (
    `Matricule` VARCHAR(191) NOT NULL,
    `RoleID` INTEGER NOT NULL,

    INDEX `idx_collabrole_role`(`RoleID`),
    PRIMARY KEY (`Matricule`, `RoleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Budget` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `CodeBudgetaire` VARCHAR(191) NOT NULL,
    `MontantDisponible` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `ServiceID` INTEGER NULL,

    UNIQUE INDEX `Budget_CodeBudgetaire_key`(`CodeBudgetaire`),
    INDEX `idx_budget_service`(`ServiceID`),
    INDEX `idx_budget_code`(`CodeBudgetaire`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkflowEtapes` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `TypeNavette` ENUM('Achat', 'Paiement', 'NoteFrais', 'DRFMS', 'DRFME') NOT NULL,
    `Etape` INTEGER NOT NULL,
    `RoleRequis` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NULL,

    INDEX `idx_workflow_type_etape`(`TypeNavette`, `Etape`),
    UNIQUE INDEX `WorkflowEtapes_TypeNavette_Etape_key`(`TypeNavette`, `Etape`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Demandeur` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `AuteurMatricule` VARCHAR(191) NULL,
    `Type` ENUM('Achat', 'Paiement', 'NoteFrais', 'DRFMS', 'DRFME') NOT NULL,
    `EtapeActuelle` INTEGER NOT NULL DEFAULT 1,
    `Numero` INTEGER NULL,
    `Objet` VARCHAR(191) NULL,
    `Description` VARCHAR(191) NULL,
    `Motif` VARCHAR(191) NULL,
    `Quantite` INTEGER NULL,
    `FournisseurID` INTEGER NULL,
    `PU` DECIMAL(15, 2) NULL,
    `Montant` DECIMAL(15, 2) NULL,
    `Devis` VARCHAR(191) NULL,
    `PieceJointe` VARCHAR(191) NULL,
    `JustificationChoix` VARCHAR(191) NULL,
    `ImputationComptable` VARCHAR(191) NULL,
    `Activite` VARCHAR(191) NULL,
    `CodeTIGER` VARCHAR(191) NULL,
    `NumeroBonCommande` VARCHAR(191) NULL,
    `DateLivraison` DATE NULL,
    `VersQui` VARCHAR(191) NULL,
    `Statut` ENUM('En attente', 'Refusée', 'Validée', 'En magasin') NOT NULL DEFAULT 'En attente',
    `BudgetID` INTEGER NULL,
    `DateDepot` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DateFinalisation` DATETIME(3) NULL,

    INDEX `idx_demandeur_fournisseur`(`FournisseurID`),
    INDEX `idx_demandeur_auteur`(`AuteurMatricule`),
    INDEX `idx_demandeur_etape`(`EtapeActuelle`),
    INDEX `idx_demandeur_budget`(`BudgetID`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoriqueValidation` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `DemandeurID` INTEGER NOT NULL,
    `Etape` INTEGER NOT NULL,
    `ValideurMatricule` VARCHAR(191) NULL,
    `Statut` ENUM('Validée', 'Refusée') NOT NULL,
    `MotifRefus` VARCHAR(191) NULL,
    `DateValidation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idx_hist_demandeur_etape`(`DemandeurID`, `Etape`),
    INDEX `idx_hist_valideur_date`(`ValideurMatricule`, `DateValidation`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_ChefServiceMatricule_fkey` FOREIGN KEY (`ChefServiceMatricule`) REFERENCES `Collaborateurs`(`Matricule`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fonction` ADD CONSTRAINT `Fonction_ServiceID_fkey` FOREIGN KEY (`ServiceID`) REFERENCES `Service`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fonction` ADD CONSTRAINT `Fonction_ChefMatricule_fkey` FOREIGN KEY (`ChefMatricule`) REFERENCES `Collaborateurs`(`Matricule`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collaborateurs` ADD CONSTRAINT `Collaborateurs_FonctionAbbrev_fkey` FOREIGN KEY (`FonctionAbbrev`) REFERENCES `Fonction`(`Abreviation`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collaborateurs` ADD CONSTRAINT `Collaborateurs_ServiceAbbrev_fkey` FOREIGN KEY (`ServiceAbbrev`) REFERENCES `Service`(`Abreviation`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComptesUtilisateurs` ADD CONSTRAINT `ComptesUtilisateurs_Matricule_collaborateur_fkey` FOREIGN KEY (`Matricule_collaborateur`) REFERENCES `Collaborateurs`(`Matricule`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollaborateurRoles` ADD CONSTRAINT `CollaborateurRoles_Matricule_fkey` FOREIGN KEY (`Matricule`) REFERENCES `Collaborateurs`(`Matricule`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollaborateurRoles` ADD CONSTRAINT `CollaborateurRoles_RoleID_fkey` FOREIGN KEY (`RoleID`) REFERENCES `Roles`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Budget` ADD CONSTRAINT `Budget_ServiceID_fkey` FOREIGN KEY (`ServiceID`) REFERENCES `Service`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Demandeur` ADD CONSTRAINT `Demandeur_FournisseurID_fkey` FOREIGN KEY (`FournisseurID`) REFERENCES `Fournisseur`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Demandeur` ADD CONSTRAINT `Demandeur_AuteurMatricule_fkey` FOREIGN KEY (`AuteurMatricule`) REFERENCES `Collaborateurs`(`Matricule`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Demandeur` ADD CONSTRAINT `Demandeur_BudgetID_fkey` FOREIGN KEY (`BudgetID`) REFERENCES `Budget`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoriqueValidation` ADD CONSTRAINT `HistoriqueValidation_DemandeurID_fkey` FOREIGN KEY (`DemandeurID`) REFERENCES `Demandeur`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoriqueValidation` ADD CONSTRAINT `HistoriqueValidation_ValideurMatricule_fkey` FOREIGN KEY (`ValideurMatricule`) REFERENCES `Collaborateurs`(`Matricule`) ON DELETE SET NULL ON UPDATE CASCADE;

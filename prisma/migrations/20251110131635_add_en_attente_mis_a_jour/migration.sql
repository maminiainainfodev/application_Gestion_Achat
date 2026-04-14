-- AlterTable
ALTER TABLE `historiquevalidation` MODIFY `Statut` ENUM('Validée', 'Refusée', 'En attente', 'Mis à jour') NOT NULL;

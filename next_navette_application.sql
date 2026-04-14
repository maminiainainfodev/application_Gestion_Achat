-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 19 jan. 2026 à 07:46
-- Version du serveur : 8.0.44-0ubuntu0.24.04.2
-- Version de PHP : 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `next_navette_application`
--

-- --------------------------------------------------------

--
-- Structure de la table `budget`
--

CREATE TABLE `budget` (
  `ID` int NOT NULL,
  `CodeBudgetaire` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MontantDisponible` decimal(15,2) NOT NULL DEFAULT '0.00',
  `ServiceID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `collaborateurroles`
--

CREATE TABLE `collaborateurroles` (
  `Matricule` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RoleID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `collaborateurroles`
--

INSERT INTO `collaborateurroles` (`Matricule`, `RoleID`) VALUES
('PCRS 0012', 1),
('PCRS 0046', 1),
('PCRS 0061', 1),
('PCRS 0080', 1),
('PCRS 0106', 1),
('PCRS 0151', 1),
('PCRS 0004', 2),
('PCRS 0011', 2),
('PCRS 0046', 2),
('PCRS 0060', 2),
('PCRS 0073', 2),
('PCRS 0092', 2),
('PCRS 0151', 2),
('PCRS 0162', 2),
('PCRS 0038', 3),
('PCRS 0147', 4),
('PCRS 0004', 5),
('PCRS 0018', 7),
('DPR', 8),
('PCRS 2004', 8),
('PCRS 0150', 10),
('CA001', 11),
('RF001', 12),
('CG001', 13);

-- --------------------------------------------------------

--
-- Structure de la table `collaborateurs`
--

CREATE TABLE `collaborateurs` (
  `Id_collaborateur` int NOT NULL,
  `Matricule` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nom` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Prenom` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PrenomUsuelle` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Civilite` enum('Homme','Femme') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FonctionAbbrev` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ServiceAbbrev` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Telephone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MailPro` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Photo` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `collaborateurs`
--

INSERT INTO `collaborateurs` (`Id_collaborateur`, `Matricule`, `Nom`, `Prenom`, `PrenomUsuelle`, `Civilite`, `FonctionAbbrev`, `ServiceAbbrev`, `Telephone`, `MailPro`, `Photo`) VALUES
(1, 'PCRS 0004', 'RAKOTONIRINA', 'Hery Magnamby', 'Hery', 'Homme', 'RFin', 'AF', '0340857087', 'hery.ceres@promes.mg', '/uploads/4fabb843-7f85-4b13-bccf-f43119fe0823.jpeg'),
(2, 'PCRS 0011', 'RAMBOLAMANANA', 'Mamy Jacot', 'Jacot', NULL, 'RPAR', 'PAR', '0341921600', 'jacot.ceres@promes.mg', ''),
(3, 'PCRS 0012', 'ANDRIANAMBININA', 'Jules Prosper', 'Jules', NULL, 'RIR ADV', 'PAR', '0341999972', 'jules.ceres@promes.mg', ''),
(4, 'PCRS 0018', 'RANAIVOSON', 'Joseph', 'Joseph', NULL, 'CG', 'AF', '0348707288', 'joseph.ceres@promes.mg', ''),
(5, 'PCRS 0038', 'SOAMANDEFITRA', 'Annick Romualdine', 'Annick', NULL, 'AAL', 'AL', '0347289888', 'annick.ceres@promes.mg', ''),
(6, 'PCRS 0046', 'RAHERINIAINA', 'Jean Népomucène', 'Nepomucene', NULL, 'RAL', 'AL', '0342750973', 'nepomucene.ceres@promes.mg', ''),
(7, 'PCRS 0060', 'NOMENJANAHARY', 'Anic Patricia', 'Patricia', NULL, 'RPEX', 'PEX', '0349925330', 'patricia.ceres@promes.mg', ''),
(8, 'PCRS 0061', 'RAFANOMEZANA', 'Marie Estelle', 'Estelle', NULL, 'RDVP', 'PEDUC', '0340381797', 'estelle.ceres@promes.mg', ''),
(9, 'PCRS 0073', 'RAMANAMPAMONJY', 'Mariah', 'Mariah', NULL, 'RRHA', 'RH', '0342629900', 'mariah.ceres@promes.mg', ''),
(10, 'PCRS 0080', 'RANDRIANANANJATO', 'Manandraibe Mahandry', 'Mahandry', NULL, 'RIR ALK', 'PAR', '0348782320', 'mahandry.ceres@promes.mg', ''),
(11, 'PCRS 0092', 'FARANOROSOA', 'Arimboahangy', 'Fara', NULL, 'RPE', 'PE', '0345060102', 'fara.ceres@promes.mg', ''),
(12, 'PCRS 0106', 'RAZAFIMAHATRATRA', 'Jean Berthieu', 'Berthieu', NULL, 'RIR ISO', 'PAR', '0345915030', 'berthieu.ceres@promes.mg', ''),
(13, 'PCRS 0147', 'NJARAMANANA', 'Olivia', 'Olivia', NULL, 'ChA', 'AF', '0384524324', 'olivia.ceres@promes.mg', ''),
(14, 'PCRS 0151', 'RAZAFINJOELINA', 'Faliniaininony Gervais Hermann', 'Gervais', 'Homme', 'RIR ISO', 'PAR', '0385811904', 'gervais.ceres@promes.mg', '/uploads/e991ed35-73e7-46aa-82cc-11713b3f7c05.jpg'),
(15, 'PCRS 0162', 'BETSY VONONA', 'Rakotoniaina', 'Betsy', NULL, 'RPEDUC', 'PEDUC', '0381259155', 'betsy.ceres@promes.mg', ''),
(17, 'PCRS 2004', 'Marcel', 'Lorniot', 'Lorniot', 'Homme', 'DPR', 'PE', '034', 'lorniot@gmail.com', NULL),
(18, 'PCRS 0027', 'RAZAMANJATO', 'Zafimahaleo Jean Louis Eloi', 'Eloi', NULL, NULL, 'PAR', '384908569', 'gardien', ''),
(19, 'PCRS 0028', 'RAMAMPIANDRA�', 'Michel Evariste', 'Michel', NULL, NULL, 'PAR', '381760283', 'gardien', ''),
(20, 'PCRS 0029', 'RASOLONDRAIBE', 'Florent Evariste', 'Florent', NULL, NULL, 'PAR', '381760283', 'gardien', ''),
(21, 'PCRS 0030', 'ANDRIANAY', 'Samuel', 'Samuel', NULL, NULL, 'PAR', '381760283', 'gardien', ''),
(22, 'PCRS 0031', 'HERINOMENJANAHARY', 'Isidore', 'Isidore', NULL, NULL, 'PAR', '342095071', '31IsidoreAKI', ''),
(23, 'PCRS 0032', 'RAVELOZAFY', 'Alfred', 'Alfred', NULL, NULL, 'PAR', '384777840', 'gardien', ''),
(24, 'PCRS 0034', 'RANDRIANAIVO', 'Benja Arifetra', 'Fetra', NULL, NULL, 'PEX', '381952740', 'gardien', ''),
(26, 'PCRS 0037', 'ANJANJANAHARY', 'Vonjinirina Jo�line', 'Anja', NULL, NULL, 'PEX', '342095074', 'ANJ037', ''),
(32, 'PCRS 0047', 'HARIANDRIANAMBININA', 'Jean Fran�ois', 'Fran�ois', NULL, NULL, 'RH', '347074783', 'frcs47', ''),
(41, 'PCRS 0063', 'IALIARISOANDRIANINA�', 'Jeanne Clara', 'Clara', NULL, NULL, NULL, '341568436', 'Ialy63', ''),
(42, 'PCRS 0066', 'RASOLOMAMPIANDRA', 'Jean Pierre', 'Jean Pierre', NULL, NULL, 'PEX', '345000712', 'MdPierra', ''),
(43, 'PCRS 0068', 'RAZARASOAMANAHIRANA', 'Jeannot Michel', 'Jeannot Michel', NULL, NULL, 'AF', '346201979', 'JANo68', ''),
(45, 'PCRS 0071', 'RAZAFIMANDIMBY', 'Nomenjanahary', 'Mandimby', NULL, NULL, 'PAR', '342470255', 'ortence', ''),
(46, 'PCRS 0072', 'RAKOTOARIVELO', 'M�lanot Jor�s', 'Jor�s', NULL, 'RFOY', 'PEX', '344231178', 'jorga72', ''),
(48, 'PCRS 0075', 'MALALANIRINA�', 'Harivonjy Rosa', 'Rosa', NULL, NULL, 'RH', '345462708', 'MDP75ROSA', ''),
(49, 'PCRS 0079', 'RAZAFIMANAMPY', 'Nomenjanahary Marie Jos�a', 'Josea', NULL, NULL, 'PEX', '342617185', 'JOSIE79', ''),
(51, 'PCRS 0082', 'NARINDRANIAINA�', 'Marie Jacqueline', 'Jacqueline', NULL, NULL, NULL, '347839925', 'MJACQ82', ''),
(52, 'PCRS 0083', 'RANDRIANARISON', 'Olivier', 'Olivier Foyer', NULL, NULL, NULL, '349835067', 'Babanay', ''),
(53, 'PCRS 0084', 'RAKOTOARIJAONA', 'Rivodomoina Faravololona', 'Domoina', NULL, NULL, NULL, '341096332', 'DMN084', ''),
(54, 'PCRS 0086', 'FANOMEZANTSOA', 'Wilson Etienne', 'Wilson', NULL, NULL, NULL, '346650509', 'DaWilly', ''),
(55, 'PCRS 0088', 'HOBY VALISOA', 'Donatienne', 'Hoby', NULL, NULL, NULL, '349902716', 'HVD88PEX', ''),
(56, 'PCRS 0089', 'RAMANANDRAIBE', 'Nofitiana Elys�', 'Elyse', NULL, NULL, NULL, '342095061', 'DAZE89', ''),
(57, 'PCRS 0090', 'RAMAROLAHY', 'Andrianandrasana Jean Thierry', 'Thierry', NULL, NULL, NULL, '349866238', 'TEX90', ''),
(59, 'PCRS 0093', 'ANDRIAMARONIONY', 'Josaphat Henri', 'Josaphat', NULL, NULL, NULL, '380815345', 'gardien', ''),
(60, 'PCRS 0094', 'RAZAFINDRAINIKOTO', 'Dinandonjanahary', 'Dinando', NULL, NULL, NULL, '340177308', 'MPDCRS94', ''),
(61, 'PCRS 0097', 'RAFARALALAO', 'Th�r�se', 'Lalao Th�r�se', NULL, NULL, NULL, '345823957', 'LTH97', ''),
(62, 'PCRS 0098', 'RASAMISON', 'Mbolatiana Julia', 'Julia', NULL, NULL, NULL, '386783574', 'julA98', ''),
(63, 'PCRS 0100', 'RAKOTONIAINA', 'Jean Jacques', 'Jean Jacques', NULL, NULL, NULL, '380815345', 'gardien', ''),
(64, 'PCRS 0103', 'RAKOTOMALALA', 'Mandaaroniaina Edia Marie', 'Edia', NULL, NULL, NULL, '346217286', 'EDI103', ''),
(65, 'PCRS 0105', 'RAZANATSIMBA', 'Mamy Claude Aim�', 'Mamy', NULL, NULL, NULL, '341485151', 'brada', ''),
(67, 'PCRS 0109', 'HASINDRAIBE', 'Viviane Sarah', 'Sarah', NULL, NULL, NULL, '346239893', 'Sarah109PE', ''),
(68, 'PCRS 0110', 'RASOLONIAINA', 'Manampisoa', 'Manampisoa', NULL, NULL, NULL, '381117008', 'gardien', ''),
(69, 'PCRS 0111', 'RAZAFIMANARIVO FANOMEZANA', 'Herilanto', 'Herilanto', NULL, NULL, NULL, '345751299', 'lantoASSDP', ''),
(70, 'PCRS 0112', 'RAZAFINDRABODOARISOA', 'Volatiana Herizo', 'Volatiana', NULL, NULL, NULL, '348669774', 'VLT72', ''),
(71, 'PCRS 0116', 'ANDRIAMAMONJISOA�', 'Bruno Hermann', 'Hermann', NULL, NULL, NULL, '342780595', 'BHERMN116', ''),
(72, 'PCRS 0119', 'NAIVOJAONA', 'Hovazafy Maria', 'Maria', NULL, NULL, NULL, '340499497', 'MarIEF119', ''),
(73, 'PCRS 0120', 'ROJONIRINA', 'Eva Martine', 'Rojo', NULL, NULL, NULL, '346436659', 'EVA120', ''),
(74, 'PCRS 0121', 'RAKOTOARIMANGA', 'Hajandraibe Angelo', 'Angelo', NULL, NULL, NULL, '343309379', 'BilO121', ''),
(75, 'PCRS 0125', 'RASOARIMALALA', 'Micha�l Blandine', 'Michaellah', NULL, NULL, NULL, '342914556', 'BlandiPAR125', ''),
(76, 'PCRS 0128', 'RAZAFIMANDIMBY', 'Jean Olivier', 'Olivier IE', NULL, NULL, NULL, '342460837', 'OLIVE128', ''),
(77, 'PCRS 0129', 'RAZANAJAONA�', 'Fanomezantsoa Joseph', 'Joseph Gardien', NULL, NULL, NULL, '381952740', 'gardien', ''),
(78, 'PCRS 0130', 'RAHARIJAONA', 'Liantsoa Nancy', 'Nancy', NULL, NULL, NULL, '343318313', 'nancy', ''),
(79, 'PCRS 0131', 'RANDRIAMAHARAVO', 'Nirina Harivony Youssrah', 'Harivony', NULL, NULL, NULL, '348434971', 'HRVRmed', ''),
(80, 'PCRS 0134', 'RASOMBINIAINA LALAO', 'Ursule Marie Sylvie�', 'Sylvie', NULL, NULL, NULL, '382105311', 'MARSYL134', ''),
(81, 'PCRS 0136', 'RANDRIAMIHARISOA', 'Zafindrainibe Volafotsy', 'Lova', NULL, NULL, NULL, '384777840', 'gardien', ''),
(82, 'PCRS 0141', 'HERIMIAMPITA', 'Alpher Fenohery', 'Fenohery', NULL, NULL, NULL, '381811376', 'AlpheIE141', ''),
(83, 'PCRS 0142', 'RENY', 'Gladys Alvarnelle', 'Gladys', NULL, NULL, NULL, '342126716', 'GLADEie', ''),
(85, 'PCRS 0149', 'RATEFINANAHARY', 'Ambinintsoa', 'Ambinintsoa', NULL, NULL, NULL, '386392185', 'AMB149', ''),
(86, 'PCRS 0150', 'RATSIMBAZAFY', 'Tsiorinjanahary Janneto Maminiaina', 'Tsiory', NULL, 'RI', 'AL', '382145929', 'tsiory.ceres@promes.mg', ''),
(88, 'PCRS 0156', 'NOMENJANAHARY', 'Lalatiana Omega', 'Omega', NULL, NULL, NULL, '380677947', 'RespDPR', ''),
(89, 'PCRS 0157', 'ANDRIAMIADANTSOA', 'Fiononana Sarobidy', 'Sarobidy', NULL, NULL, NULL, '349226691', 'bidyRH', ''),
(90, 'PCRS 0158', 'ANDRIAMAMPIANINA', 'Mialy Tania', 'Tania', NULL, NULL, NULL, '385607638', 'RakRoots', ''),
(91, 'PCRS 0159', 'NANTENAINA', 'Larissa B�atrice', 'Larissa', NULL, NULL, NULL, '381328030', 'LaryIE159', ''),
(92, 'PCRS 0160', 'RASOLOFOMANDIMBY', 'Manalintsoa Sahaza', 'Sahaza', NULL, NULL, NULL, '385521134', 'SAHpar160', ''),
(93, 'PCRS 0161', 'RAMAROMANDIMBY', 'Roger', 'Roger', NULL, NULL, NULL, '380933748', 'roGIEG', ''),
(95, 'PCRS 0163', 'MAMITINA', 'Nantenaina Christian', 'Mamitina', NULL, NULL, NULL, '380815345', 'gardien', ''),
(96, 'PCRS 0164', 'HAINGONIAINA', 'Hortense Olivia', 'Haingo', NULL, NULL, NULL, '387123754', 'OLVadvPAR', ''),
(97, 'PCRS 0166', 'FIDIARILANTO', 'Tolojanahary Sandra', 'Sandra', NULL, NULL, NULL, '381952740', 'SAND23!*', ''),
(98, 'PCRS 0167', 'RANDRIAMANANTOAVINA�', 'Patty� Syla Clarck�', 'Patty�', NULL, NULL, NULL, '385644775', 'Pio167', ''),
(99, 'PCRS 0168', 'NY ZO FENO�', 'Itokiniaina Esp�rance', 'Esp�rance', NULL, NULL, NULL, '349697951', 'EspPE168', ''),
(101, 'DPR', 'VINCENT DE TAPOL', 'Caroline', 'Caroline', NULL, NULL, NULL, '', 'RespDPR', ''),
(102, 'PCRS0174', 'ANDRIAMANJATO', 'Heriniaina Jean Yves', 'Veve', NULL, NULL, NULL, '386737987', 'jardinier', ''),
(103, 'CA001', 'Test', 'Chargee Achat', NULL, NULL, NULL, NULL, NULL, 'CA001@test.com', NULL),
(104, 'RF001', 'Test', 'Resp Financier', NULL, NULL, NULL, NULL, NULL, 'RF001@test.com', NULL),
(105, 'CG001', 'Test', 'Controleur Gestion', NULL, NULL, NULL, NULL, NULL, 'CG001@test.com', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `comptesutilisateurs`
--

CREATE TABLE `comptesutilisateurs` (
  `Matricule_collaborateur` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MotDePasse` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `comptesutilisateurs`
--

INSERT INTO `comptesutilisateurs` (`Matricule_collaborateur`, `MotDePasse`) VALUES
('DPR', 'RespDPR'),
('PCRS 0004', 'RespCompt01'),
('PCRS 0011', 'Rer001'),
('PCRS 0012', 'rjul12'),
('PCRS 0018', 'JOSAF02'),
('PCRS 0027', 'gardien'),
('PCRS 0028', 'gardien'),
('PCRS 0029', 'gardien'),
('PCRS 0030', 'gardien'),
('PCRS 0031', '31IsidoreAKI'),
('PCRS 0032', 'gardien'),
('PCRS 0034', 'gardien'),
('PCRS 0037', 'ANJ037'),
('PCRS 0038', '77ESPRS'),
('PCRS 0046', 'REUST46'),
('PCRS 0047', 'frcs47'),
('PCRS 0060', 'ptrc60'),
('PCRS 0061', 'MELL61'),
('PCRS 0063', 'Ialy63'),
('PCRS 0066', 'MdPierra'),
('PCRS 0068', 'JANo68'),
('PCRS 0071', 'ortence'),
('PCRS 0072', 'jorga72'),
('PCRS 0073', 'LAMA73'),
('PCRS 0075', 'MDP75ROSA'),
('PCRS 0079', 'JOSIE79'),
('PCRS 0080', 'LaolaoMAH80'),
('PCRS 0082', 'MJACQ82'),
('PCRS 0083', 'Babanay'),
('PCRS 0084', 'DMN084'),
('PCRS 0086', 'DaWilly'),
('PCRS 0088', 'HVD88PEX'),
('PCRS 0089', 'DAZE89'),
('PCRS 0090', 'TEX90'),
('PCRS 0092', ''),
('PCRS 0093', 'gardien'),
('PCRS 0094', 'MPDCRS94'),
('PCRS 0097', 'LTH97'),
('PCRS 0098', 'julA98'),
('PCRS 0100', 'gardien'),
('PCRS 0103', 'EDI103'),
('PCRS 0105', 'brada'),
('PCRS 0106', 'raberta'),
('PCRS 0109', 'Sarah109PE'),
('PCRS 0110', 'gardien'),
('PCRS 0111', 'lantoASSDP'),
('PCRS 0112', 'VLT72'),
('PCRS 0116', 'BHERMN116'),
('PCRS 0119', 'MarIEF119'),
('PCRS 0120', 'EVA120'),
('PCRS 0121', 'BilO121'),
('PCRS 0125', 'BlandiPAR125'),
('PCRS 0128', 'OLIVE128'),
('PCRS 0129', 'gardien'),
('PCRS 0130', 'nancy'),
('PCRS 0131', 'HRVRmed'),
('PCRS 0134', 'MARSYL134'),
('PCRS 0136', 'gardien'),
('PCRS 0141', 'AlpheIE141'),
('PCRS 0142', 'GLADEie'),
('PCRS 0147', 'OLI147'),
('PCRS 0149', 'AMB149'),
('PCRS 0150', 'Mila anao1'),
('PCRS 0151', '1224HJ'),
('PCRS 0156', 'RespDPR'),
('PCRS 0157', 'bidyRH'),
('PCRS 0158', 'RakRoots'),
('PCRS 0159', 'LaryIE159'),
('PCRS 0160', 'SAHpar160'),
('PCRS 0161', 'roGIEG'),
('PCRS 0162', 'VSI0003'),
('PCRS 0163', 'gardien'),
('PCRS 0164', 'OLVadvPAR'),
('PCRS 0166', 'SAND23!*'),
('PCRS 0167', 'Pio167'),
('PCRS 0168', 'EspPE168'),
('PCRS 2004', 'lolo');

-- --------------------------------------------------------

--
-- Structure de la table `demandeur`
--

CREATE TABLE `demandeur` (
  `Id` int NOT NULL,
  `AuteurMatricule` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Type` enum('Achat','Paiement','NoteFrais','DRFMS','DRFME') COLLATE utf8mb4_unicode_ci NOT NULL,
  `EtapeActuelle` int NOT NULL DEFAULT '1',
  `Numero` int DEFAULT NULL,
  `Objet` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Motif` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Quantite` int DEFAULT NULL,
  `FournisseurID` int DEFAULT NULL,
  `PU` decimal(15,2) DEFAULT NULL,
  `Montant` decimal(15,2) DEFAULT NULL,
  `Devis` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PieceJointe` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `JustificationChoix` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ImputationComptable` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Activite` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodeTIGER` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NumeroBonCommande` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateLivraison` date DEFAULT NULL,
  `VersQui` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Statut` enum('En attente','Refusée','Validée','En magasin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'En attente',
  `BudgetID` int DEFAULT NULL,
  `DateDepot` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `DateFinalisation` datetime(3) DEFAULT NULL,
  `IsAPGenere` tinyint(1) NOT NULL DEFAULT '0',
  `IsBCGenere` tinyint(1) NOT NULL DEFAULT '0',
  `Reference` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `demandeur`
--

INSERT INTO `demandeur` (`Id`, `AuteurMatricule`, `Type`, `EtapeActuelle`, `Numero`, `Objet`, `Description`, `Motif`, `Quantite`, `FournisseurID`, `PU`, `Montant`, `Devis`, `PieceJointe`, `JustificationChoix`, `ImputationComptable`, `Activite`, `CodeTIGER`, `NumeroBonCommande`, `DateLivraison`, `VersQui`, `Statut`, `BudgetID`, `DateDepot`, `DateFinalisation`, `IsAPGenere`, `IsBCGenere`, `Reference`) VALUES
(9, 'PCRS 0038', 'Achat', 7, NULL, 'Bou', 'Bou', 'Bou', 3, 2, 200000.00, 600000.00, '1', NULL, 'Bou', 'NOno', 'nooo', 'nono', NULL, NULL, 'Chargée Achat', 'Validée', NULL, '2025-12-22 12:05:08.280', '2025-12-22 12:12:25.752', 0, 0, NULL),
(10, 'PCRS 0004', 'Achat', 6, NULL, 'hoho', 'hoho', 'hoho', 1, 1, 10000.00, 10000.00, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Directrice', 'En magasin', NULL, '2025-12-22 12:14:57.129', NULL, 0, 0, NULL),
(11, 'PCRS 0073', 'Achat', 1, NULL, 'koko', 'koko', 'koko', 3, 4, 10000.00, 30000.00, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'AssistanteLogistique', 'En attente', NULL, '2025-12-22 12:21:51.861', NULL, 0, 0, NULL),
(12, 'PCRS 0150', 'Achat', 3, NULL, 'test déploiement', 'test déploiement', 'test déploiement', 1, NULL, 10000000.00, 10000000.00, '4', NULL, 'test déploiement', 'test déploiement', 'test déploiement', 'test déploiement', NULL, NULL, 'Chargée Achat', 'En attente', NULL, '2026-01-17 08:24:54.685', NULL, 0, 0, 'NA-RAT-AL-2026-S12'),
(13, 'PCRS 0150', 'Achat', 3, NULL, 'Test Workflow Automated', 'Test Item', 'Verification', 1, NULL, 100000.00, 100000.00, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chargée Achat', 'En attente', NULL, '2026-01-17 08:38:01.040', NULL, 0, 0, 'NA-RAT-AL-2026-S13'),
(14, 'PCRS 0150', 'Achat', 4, NULL, 'Test Workflow Automated JS', 'Test Item JS', 'Verification', 1, NULL, 100000.00, 100000.00, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Responsable Financier', 'En attente', NULL, '2026-01-17 08:39:27.209', NULL, 0, 0, 'NA-RAT-AL-2026-S14'),
(15, 'PCRS 0150', 'Achat', 7, NULL, 'Test Workflow Automated JS', 'Test Item JS', 'Verification', 1, NULL, 100000.00, 100000.00, '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chargée Achat', 'Validée', NULL, '2026-01-17 08:40:03.113', '2026-01-17 08:40:21.753', 0, 0, 'NA-RAT-AL-2026-S15');

-- --------------------------------------------------------

--
-- Structure de la table `fonction`
--

CREATE TABLE `fonction` (
  `ID_Fonction` int NOT NULL,
  `NomFonction` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Abreviation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ServiceID` int DEFAULT NULL,
  `ChefMatricule` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `fonction`
--

INSERT INTO `fonction` (`ID_Fonction`, `NomFonction`, `Abreviation`, `ServiceID`, `ChefMatricule`) VALUES
(1, 'Adjointe du bureaux d\'Orientation et d\'Employabili', 'ABOE', 3, NULL),
(2, 'Agent de Maintenance', 'AM', 1, NULL),
(3, 'Assistant Administratif des Ressources Humaines', 'AARH', 4, NULL),
(5, 'Assistant Responsable de l\'Internat d\'Excellence G', 'AssRIN G', 6, NULL),
(6, 'Assistante Administrative et logistique', 'AAL', 1, NULL),
(7, 'Assistante du Développement Personnel', 'ADP', 3, NULL),
(8, 'Assistante en Développement des Ressources Humaine', 'ADRH', 4, NULL),
(9, 'Assistante Responsable de l\'Internat d\'Excellence ', 'AssRIN F', 6, NULL),
(10, 'Chargé Comptable', 'CCPT', 2, NULL),
(11, 'Chargé des Achats', 'ChA', 2, NULL),
(12, 'Chargé Technique', 'CHT', 1, NULL),
(13, 'Chargée MEAL et Assistante de Direction', 'CMAD', 4, NULL),
(14, 'Chauffeur', 'CHF', 1, NULL),
(15, 'Conseillé Pédagogique en Science', 'CPS', 7, NULL),
(16, 'Conseillé pédagogique langue', 'CPL', 3, NULL),
(17, 'Contrôleur de Gestion', 'CG', 2, NULL),
(18, 'Coordinateur des Foyers d\'Excellence', 'RFOY', 6, NULL),
(19, 'Coordinatrice SUP1.0', 'CoorSUP', 6, NULL),
(20, 'Directrice de programme', 'DPR', 2, NULL),
(21, 'Formateur et professeur de Mathématique', 'Prof Math', 7, NULL),
(22, 'Formateur et Professeur de Sport', 'FPS', 7, NULL),
(23, 'Formatrice et Professeur d\'Anglais', 'FPA', 7, NULL),
(24, 'Formatrice et Professeur de Francais', 'FPF', 7, NULL),
(25, 'Formatrice et Professeur de Malagasy', 'FPM', 7, NULL),
(26, 'Formatrice REGAS/GRC', 'REGAS/GRC', 7, NULL),
(27, 'Responsable Administratif et Logistique', 'RAL', 1, NULL),
(28, 'Responsable de l\'Internat d\'Excellence fille', 'RIN F IE', 6, NULL),
(29, 'Responsable de l\'Internat d\'Excellence Garçon', 'RIN G IE', 6, NULL),
(30, 'Responsable de l\'Internat Réussite Fille ADV', 'RIN F ADV', 5, NULL),
(31, 'Responsable de l\'Internat Réussite Fille AKI', 'RIN F AKI', 5, NULL),
(32, 'Responsable de l\'Internat Réussite Fille ALK', 'RIN F ALK', 5, NULL),
(33, 'Responsable de l\'Internat Réussite Fille ISO', 'RIN F ISO', 5, NULL),
(34, 'Responsable de l\'Internat Réussite Fille NDT', 'RIN F NDT', 5, NULL),
(35, 'Responsable de l\'Internat Réussite Garçon ADV', 'RIN G ADV', 5, NULL),
(36, 'Responsable de l\'Internat Réussite Garçon AKI', 'RIN G AKI', 5, NULL),
(37, 'Responsable de l\'Internat Réussite Garçon ALK', 'RIN G ALK', 5, NULL),
(38, 'Responsable de l\'Internat Réussite Garçon ISO', 'RIN G ISO', 5, NULL),
(39, 'Responsable de l\'Internat Réussite Garçon NDT', 'RIN G NDT', 5, NULL),
(40, 'Responsable du Bureaux d\'Orientation', 'RBOE', 3, NULL),
(41, 'Responsable du Développement Personnel', 'RDVP', 3, NULL),
(42, 'Responsable et Educatrice Référente SUP', 'RSUP', 6, NULL),
(43, 'Responsable Financier', 'RFin', 2, NULL),
(44, 'Responsable Informatique', 'RI', 1, 'PCRS 0046'),
(45, 'Responsable Internat Réussite ADV', 'RIR ADV', 5, NULL),
(46, 'Responsable Internat Réussite AKI', 'RIR AKI', 5, NULL),
(47, 'Responsable Internat Réussite ALK', 'RIR ALK', 5, NULL),
(48, 'Responsable Internat Réussite ISO', 'RIR ISO', 5, NULL),
(49, 'Responsable Internat Réussite NDT', 'RIR NDT', 5, NULL),
(50, 'Responsable Médiaithèque', 'RM', 7, NULL),
(51, 'Responsable Médiathèque et Chargée de Communicatio', 'RMED', 7, NULL),
(52, 'Responsable Parcours Excellence', 'RPEX', 6, NULL),
(53, 'Responsable Parcours Réussite', 'RPAR', 5, NULL),
(54, 'Responsable Pôle Education', 'RPEDUC', 3, NULL),
(55, 'Responsable Pôle Enseignement', 'RPE', 7, NULL),
(56, 'Responsable Ressources Humaines et Administratives', 'RRHA', 4, NULL),
(57, 'Stagiaire AF', 'STG AF', 2, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

CREATE TABLE `fournisseur` (
  `ID` int NOT NULL,
  `Nom` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Adresse` text COLLATE utf8mb4_unicode_ci,
  `NomCheque` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NIF` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CIN` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`ID`, `Nom`, `Adresse`, `NomCheque`, `NIF`, `CIN`) VALUES
(1, 'Hello', 'ambony', 'Okay', 'Hello', 'Hello'),
(2, 'Coucou', 'Coucou', 'Coucou', 'Coucou', 'Coucou'),
(3, 'LUI', 'Mety ', 'Soa ', 'Amizay', '09089989879'),
(4, 'Encore', 'Encore', 'Encore', 'Encore', 'Encore'),
(5, 'Ndao', 'Ndao', 'Ndao', 'hohohohoh', '5656565');

-- --------------------------------------------------------

--
-- Structure de la table `historiquevalidation`
--

CREATE TABLE `historiquevalidation` (
  `ID` int NOT NULL,
  `DemandeurID` int NOT NULL,
  `Etape` int NOT NULL,
  `ValideurMatricule` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Statut` enum('Validée','Refusée','En attente','Mis à jour') COLLATE utf8mb4_unicode_ci NOT NULL,
  `MotifRefus` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateValidation` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ID_Navette` int DEFAULT NULL,
  `Reference_Navette` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `historiquevalidation`
--

INSERT INTO `historiquevalidation` (`ID`, `DemandeurID`, `Etape`, `ValideurMatricule`, `Statut`, `MotifRefus`, `DateValidation`, `ID_Navette`, `Reference_Navette`) VALUES
(51, 9, 1, 'PCRS 0038', 'En attente', NULL, '2025-12-22 12:05:08.296', NULL, NULL),
(52, 9, 1, NULL, 'Validée', NULL, '2025-12-22 12:05:50.053', NULL, NULL),
(53, 9, 2, 'PCRS 0038', 'Validée', NULL, '2025-12-22 12:06:36.932', NULL, NULL),
(54, 9, 3, 'PCRS 0147', 'Validée', NULL, '2025-12-22 12:07:03.759', NULL, NULL),
(55, 9, 4, 'PCRS 0004', 'Validée', NULL, '2025-12-22 12:07:29.908', NULL, NULL),
(56, 9, 5, 'PCRS 0018', 'Mis à jour', NULL, '2025-12-22 12:08:19.896', NULL, NULL),
(57, 9, 5, 'PCRS 0018', 'Validée', NULL, '2025-12-22 12:08:21.234', NULL, NULL),
(58, 9, 6, 'PCRS 2004', 'Validée', NULL, '2025-12-22 12:09:35.691', NULL, NULL),
(59, 9, 7, 'PCRS 0147', 'Validée', NULL, '2025-12-22 12:12:25.751', NULL, NULL),
(60, 10, 1, 'PCRS 0004', 'En attente', NULL, '2025-12-22 12:14:57.142', NULL, NULL),
(61, 10, 1, 'PCRS 0004', 'Validée', NULL, '2025-12-22 12:17:45.812', NULL, NULL),
(62, 10, 2, 'PCRS 0038', 'Validée', 'Prise dans le magasin - Passage direct à la Direction', '2025-12-22 12:18:51.555', NULL, NULL),
(63, 11, 1, 'PCRS 0073', 'En attente', NULL, '2025-12-22 12:21:51.866', NULL, NULL),
(64, 12, 1, 'PCRS 0150', 'En attente', NULL, '2026-01-17 08:24:54.716', 12, 'NA-RAT-AL-2026-S12'),
(65, 13, 1, 'PCRS 0150', 'En attente', NULL, '2026-01-17 08:38:01.126', 13, 'NA-RAT-AL-2026-S13'),
(66, 13, 1, 'PCRS 0046', 'Validée', NULL, '2026-01-17 08:38:24.964', 13, 'NA-RAT-AL-2026-S13'),
(67, 13, 2, 'PCRS 0038', 'Validée', NULL, '2026-01-17 08:38:26.959', 13, 'NA-RAT-AL-2026-S13'),
(68, 14, 1, 'PCRS 0150', 'En attente', NULL, '2026-01-17 08:39:27.240', 14, 'NA-RAT-AL-2026-S14'),
(69, 14, 1, 'PCRS 0046', 'Validée', NULL, '2026-01-17 08:39:29.973', 14, 'NA-RAT-AL-2026-S14'),
(70, 14, 2, 'PCRS 0038', 'Validée', NULL, '2026-01-17 08:39:32.777', 14, 'NA-RAT-AL-2026-S14'),
(71, 14, 3, 'CA001', 'Validée', NULL, '2026-01-17 08:39:34.777', 14, 'NA-RAT-AL-2026-S14'),
(72, 15, 1, 'PCRS 0150', 'En attente', NULL, '2026-01-17 08:40:03.129', 15, 'NA-RAT-AL-2026-S15'),
(73, 15, 1, 'PCRS 0046', 'Validée', NULL, '2026-01-17 08:40:05.290', 15, 'NA-RAT-AL-2026-S15'),
(74, 15, 2, 'PCRS 0038', 'Validée', NULL, '2026-01-17 08:40:07.227', 15, 'NA-RAT-AL-2026-S15'),
(75, 15, 3, 'CA001', 'Validée', NULL, '2026-01-17 08:40:09.307', 15, 'NA-RAT-AL-2026-S15'),
(76, 15, 4, 'RF001', 'Validée', NULL, '2026-01-17 08:40:11.336', 15, 'NA-RAT-AL-2026-S15'),
(77, 15, 5, 'CG001', 'Validée', NULL, '2026-01-17 08:40:13.311', 15, 'NA-RAT-AL-2026-S15'),
(78, 15, 6, 'DPR', 'Validée', NULL, '2026-01-17 08:40:19.275', 15, 'NA-RAT-AL-2026-S15'),
(79, 15, 7, 'CA001', 'Validée', NULL, '2026-01-17 08:40:21.748', 15, 'NA-RAT-AL-2026-S15'),
(80, 12, 1, 'PCRS 0046', 'Validée', NULL, '2026-01-17 08:43:08.739', 12, 'NA-RAT-AL-2026-S12'),
(81, 12, 2, 'PCRS 0038', 'Validée', NULL, '2026-01-17 08:46:15.465', 12, 'NA-RAT-AL-2026-S12');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `ID` int NOT NULL,
  `NomRole` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`ID`, `NomRole`) VALUES
(9, 'Acheteur'),
(10, 'Administrateur'),
(3, 'AssistanteLogistique'),
(4, 'Chargée Achat'),
(11, 'ChargeeAchat'),
(2, 'ChefService'),
(7, 'Contrôleur de Gestion'),
(13, 'ControleurGestion'),
(1, 'Demandeur'),
(8, 'Directrice'),
(5, 'Responsable Financier'),
(12, 'ResponsableFinancier');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `ID` int NOT NULL,
  `NomService` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Abreviation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ChefServiceMatricule` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`ID`, `NomService`, `Abreviation`, `ChefServiceMatricule`) VALUES
(1, 'Administration et Logistique', 'AL', 'PCRS 0046'),
(2, 'Administration et Finance', 'AF', 'PCRS 0004'),
(3, 'Pôle Éducation', 'PEDUC', 'PCRS 0162'),
(4, 'Ressources Humaines', 'RH', 'PCRS 0073'),
(5, 'Parcours Réussite', 'PAR', 'PCRS 0011'),
(6, 'Parcours Excellence', 'PEX', 'PCRS 0060'),
(7, 'Pôle Enseignement', 'PE', 'PCRS 0092');

-- --------------------------------------------------------

--
-- Structure de la table `workflowetapes`
--

CREATE TABLE `workflowetapes` (
  `ID` int NOT NULL,
  `TypeNavette` enum('Achat','Paiement','NoteFrais','DRFMS','DRFME') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Etape` int NOT NULL,
  `RoleRequis` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `workflowetapes`
--

INSERT INTO `workflowetapes` (`ID`, `TypeNavette`, `Etape`, `RoleRequis`, `Description`) VALUES
(1, 'Achat', 1, 'ChefService', 'Validation du Chef de Service'),
(2, 'Achat', 2, 'AssistanteLogistique', 'Validation/Refus/Prendre dans le magasin'),
(3, 'Achat', 3, 'Chargée Achat', 'Remplissage (P.U, Fournisseur, Devis, Justification) et validation'),
(4, 'Achat', 4, 'Responsable Financier', 'Validation de la décision de la Chargée Achat'),
(5, 'Achat', 5, 'Contrôleur de Gestion', 'Remplissage et validation'),
(6, 'Achat', 6, 'Directrice', 'Validation finale'),
(7, 'Achat', 7, 'Chargée Achat', 'Validation finale et édition Bon de Commande'),
(8, 'Paiement', 1, 'ChefService', 'Validation du Chef de Service'),
(9, 'Paiement', 2, 'Responsable Financier', 'Validation'),
(10, 'Paiement', 3, 'Contrôleur de Gestion', 'Remplissage et validation'),
(11, 'Paiement', 4, 'Directrice', 'Validation finale (avec Autorisation de Paiement)'),
(12, 'NoteFrais', 1, 'ChefService', 'Validation du Chef de Service'),
(13, 'NoteFrais', 2, 'Responsable Financier', 'Validation'),
(14, 'NoteFrais', 3, 'Contrôleur de Gestion', 'Remplissage et validation'),
(15, 'NoteFrais', 4, 'Directrice', 'Validation finale'),
(16, 'DRFMS', 1, 'ChefService', 'Validation du Chef de Service'),
(17, 'DRFMS', 2, 'Responsable Financier', 'Validation'),
(18, 'DRFMS', 3, 'Contrôleur de Gestion', 'Remplissage et validation'),
(19, 'DRFMS', 4, 'Directrice', 'Validation finale'),
(20, 'DRFME', 1, 'ChefService', 'Validation du Chef de Service'),
(21, 'DRFME', 2, 'Responsable Financier', 'Validation'),
(22, 'DRFME', 3, 'Contrôleur de Gestion', 'Remplissage et validation'),
(23, 'DRFME', 4, 'Directrice', 'Validation finale');

-- --------------------------------------------------------

--
-- Structure de la table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('3eb338e8-2e42-48d0-b4a7-0994dbc29258', 'd1c5575d0bff8a55b6ca72a65b00738f2499d77639c2a5db1eff0df187f962d8', '2025-12-19 05:37:32.338', '20251107122127_init', NULL, NULL, '2025-12-19 05:37:29.482', 1),
('cbadf9ec-3a20-4fb9-a598-21886dcca9dc', '38dfa9895584a7150b26be50da3eccae512e8a22b747fde7be7bb041bdf8ef19', '2025-12-19 05:37:32.366', '20251110131635_add_en_attente_mis_a_jour', NULL, NULL, '2025-12-19 05:37:32.342', 1),
('9344d49b-7560-4e2a-8a6e-65fa1e962fd5', '53468f9115194ba9e9366fd923711d4ce274060a7e104c2b0942cbfe8ba303bc', '2025-12-19 05:37:37.000', '20251219053736_init', NULL, NULL, '2025-12-19 05:37:36.787', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `budget`
--
ALTER TABLE `budget`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `budget_CodeBudgetaire_key` (`CodeBudgetaire`),
  ADD KEY `idx_budget_service` (`ServiceID`),
  ADD KEY `idx_budget_code` (`CodeBudgetaire`);

--
-- Index pour la table `collaborateurroles`
--
ALTER TABLE `collaborateurroles`
  ADD PRIMARY KEY (`Matricule`,`RoleID`),
  ADD KEY `idx_collabrole_role` (`RoleID`);

--
-- Index pour la table `collaborateurs`
--
ALTER TABLE `collaborateurs`
  ADD PRIMARY KEY (`Id_collaborateur`),
  ADD UNIQUE KEY `collaborateurs_Matricule_key` (`Matricule`),
  ADD KEY `collaborateurs_FonctionAbbrev_fkey` (`FonctionAbbrev`),
  ADD KEY `collaborateurs_ServiceAbbrev_fkey` (`ServiceAbbrev`);

--
-- Index pour la table `comptesutilisateurs`
--
ALTER TABLE `comptesutilisateurs`
  ADD PRIMARY KEY (`Matricule_collaborateur`);

--
-- Index pour la table `demandeur`
--
ALTER TABLE `demandeur`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `idx_demandeur_fournisseur` (`FournisseurID`),
  ADD KEY `idx_demandeur_auteur` (`AuteurMatricule`),
  ADD KEY `idx_demandeur_etape` (`EtapeActuelle`),
  ADD KEY `idx_demandeur_budget` (`BudgetID`);

--
-- Index pour la table `fonction`
--
ALTER TABLE `fonction`
  ADD PRIMARY KEY (`ID_Fonction`),
  ADD UNIQUE KEY `fonction_NomFonction_key` (`NomFonction`),
  ADD UNIQUE KEY `fonction_Abreviation_key` (`Abreviation`),
  ADD KEY `Fonction_ServiceID_fkey` (`ServiceID`),
  ADD KEY `Fonction_ChefMatricule_fkey` (`ChefMatricule`);

--
-- Index pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `fournisseur_NIF_key` (`NIF`),
  ADD UNIQUE KEY `fournisseur_CIN_key` (`CIN`);

--
-- Index pour la table `historiquevalidation`
--
ALTER TABLE `historiquevalidation`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `idx_hist_demandeur_etape` (`DemandeurID`,`Etape`),
  ADD KEY `idx_hist_valideur_date` (`ValideurMatricule`,`DateValidation`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `roles_NomRole_key` (`NomRole`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `service_NomService_key` (`NomService`),
  ADD UNIQUE KEY `service_Abreviation_key` (`Abreviation`),
  ADD KEY `Service_ChefServiceMatricule_fkey` (`ChefServiceMatricule`);

--
-- Index pour la table `workflowetapes`
--
ALTER TABLE `workflowetapes`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `workflowetapes_TypeNavette_Etape_key` (`TypeNavette`,`Etape`),
  ADD KEY `idx_workflow_type_etape` (`TypeNavette`,`Etape`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `budget`
--
ALTER TABLE `budget`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `collaborateurs`
--
ALTER TABLE `collaborateurs`
  MODIFY `Id_collaborateur` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT pour la table `demandeur`
--
ALTER TABLE `demandeur`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `fonction`
--
ALTER TABLE `fonction`
  MODIFY `ID_Fonction` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `historiquevalidation`
--
ALTER TABLE `historiquevalidation`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `workflowetapes`
--
ALTER TABLE `workflowetapes`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `budget`
--
ALTER TABLE `budget`
  ADD CONSTRAINT `budget_ServiceID_fkey` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `collaborateurroles`
--
ALTER TABLE `collaborateurroles`
  ADD CONSTRAINT `collaborateurroles_Matricule_fkey` FOREIGN KEY (`Matricule`) REFERENCES `collaborateurs` (`Matricule`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `collaborateurroles_RoleID_fkey` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `collaborateurs`
--
ALTER TABLE `collaborateurs`
  ADD CONSTRAINT `collaborateurs_FonctionAbbrev_fkey` FOREIGN KEY (`FonctionAbbrev`) REFERENCES `fonction` (`Abreviation`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `collaborateurs_ServiceAbbrev_fkey` FOREIGN KEY (`ServiceAbbrev`) REFERENCES `service` (`Abreviation`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `comptesutilisateurs`
--
ALTER TABLE `comptesutilisateurs`
  ADD CONSTRAINT `comptesutilisateurs_Matricule_collaborateur_fkey` FOREIGN KEY (`Matricule_collaborateur`) REFERENCES `collaborateurs` (`Matricule`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `demandeur`
--
ALTER TABLE `demandeur`
  ADD CONSTRAINT `demandeur_AuteurMatricule_fkey` FOREIGN KEY (`AuteurMatricule`) REFERENCES `collaborateurs` (`Matricule`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `demandeur_BudgetID_fkey` FOREIGN KEY (`BudgetID`) REFERENCES `budget` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `demandeur_FournisseurID_fkey` FOREIGN KEY (`FournisseurID`) REFERENCES `fournisseur` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `fonction`
--
ALTER TABLE `fonction`
  ADD CONSTRAINT `fonction_ChefMatricule_fkey` FOREIGN KEY (`ChefMatricule`) REFERENCES `collaborateurs` (`Matricule`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fonction_ServiceID_fkey` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `historiquevalidation`
--
ALTER TABLE `historiquevalidation`
  ADD CONSTRAINT `historiquevalidation_DemandeurID_fkey` FOREIGN KEY (`DemandeurID`) REFERENCES `demandeur` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historiquevalidation_ValideurMatricule_fkey` FOREIGN KEY (`ValideurMatricule`) REFERENCES `collaborateurs` (`Matricule`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ChefServiceMatricule_fkey` FOREIGN KEY (`ChefServiceMatricule`) REFERENCES `collaborateurs` (`Matricule`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

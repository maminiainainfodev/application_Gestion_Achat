SELECT * FROM WorkflowEtapes;
SELECT id, type, etapeActuelle, statut, versQui FROM Demandeur WHERE statut IN ('En attente', 'En magasin');
SELECT cr.Matricule, r.NomRole 
FROM CollaborateurRoles cr 
JOIN Roles r ON cr.RoleID = r.ID 
WHERE r.NomRole LIKE '%Contrôleur%';

import prisma from "@/lib/prisma";
import { role } from "@/lib/data";
import { Suspense } from "react";
import CollaborateurRolesListClient from "./CollaborateurRolesListClient";

export const dynamic = 'force-dynamic';

async function getAllCollaborateurRoles() {
    try {
        const relations = await prisma.collaborateurRoles.findMany({
            include: {
                collaborateur: {
                    select: {
                        nom: true,
                        prenom: true,
                        matricule: true,
                    },
                },
                role: {
                    select: {
                        nomRole: true,
                        id: true,
                    },
                },
            },
            orderBy: [
                { matricule: 'asc' },
                { roleID: 'asc' },
            ],
        });

        return relations.map(item => ({
            Matricule: item.matricule,
            RoleID: item.roleID,
            NomCollaborateur: `${item.collaborateur.prenom || ''} ${item.collaborateur.nom || ''}`.trim() || item.matricule,
            NomRole: item.role.nomRole,
        }));
    } catch (error) {
        console.error('Erreur lors de la récupération des relations Collaborateur-Rôle:', error);
        return [];
    }
}

const CollaborateurRolesListPage = async () => {
    const data = await getAllCollaborateurRoles();

    return (
        <Suspense fallback={<div className="p-4 text-center">Chargement...</div>}>
            <CollaborateurRolesListClient initialData={data} total={data.length} role={role} />
        </Suspense>
    );
};

export default CollaborateurRolesListPage;
"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

// USE LAZY LOADING

const CollaboratorForm = dynamic(() => import("./forms/CollaboratorForm"), {
  loading: () => <h1>Loading...</h1>,
});
const FonctionForm = dynamic(() => import("./forms/fonctionForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ServiceForm = dynamic(() => import("./forms/serviceForm"), {
  loading: () => <h1>Loading...</h1>,
});
const FournisseurForm = dynamic(() => import("./forms/fournisseurForm"), {
  loading: () => <h1>Loading...</h1>,
});
// CORRECTION: Importe budgetForm
const BudgetForm = dynamic(() => import("./forms/budgetForm"), {
  loading: () => <h1>Loading...</h1>,
});
const CollaborateurRolesForm = dynamic(() => import("./forms/CollaborateurRolesForm"), {
  loading: () => <h1>Loading...</h1>,
});
const PasswordForm = dynamic(() => import("./forms/passwordForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  // Le nom de la clé correspond au nom de la table
  "Collaborateurs": (type, data) => <CollaboratorForm type={type} data={data} />,
  "fonction": (type, data) => <FonctionForm type={type} data={data} />,
  "service": (type, data) => <ServiceForm type={type} data={data} />,
  "fournisseur": (type, data) => <FournisseurForm type={type} data={data} />,
  "budget": (type, data) => <BudgetForm type={type} data={data} />,
  "CollaborateurRoles": (type, data) => <CollaborateurRolesForm type={type} data={data} />,
  "motdepasse": (type, data) => <PasswordForm type={type} data={data} />,
  // Si "demandeur" a un formulaire, il doit être défini ici, par exemple :
  // "demandeur": (type, data) => <DemandeurForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
  | "Collaborateurs"
  | "fonction"
  | "service"
  | "fournisseur"
  | "budget"
  | "CollaborateurRoles"
  | "demandeur"
  | "motdepasse";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const colorClass =
    type === "create"
      ? "bg-amber-100 text-amber-700 border border-amber-200"
      : type === "update"
        ? "bg-blue-100 text-blue-700 border border-blue-200"
        : "bg-rose-100 text-rose-700 border border-rose-200";

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const Form = () => {
    // CORRECTION: Utilisation directe de 'table' comme clé de recherche
    // (cela fonctionne car les clés de l'objet 'forms' ont été mises à jour pour correspondre aux noms de la table).
    const formKey = table as keyof typeof forms;

    if (type === "delete") {
      const handleDelete = async () => {
        try {
          let endpoint: string;

          if (table === "Collaborateurs") {
            const collaboratorId = typeof id === "number" ? id : data?.Id;
            if (!collaboratorId) {
              toast.error("ID manquant pour la suppression");
              return;
            }
            endpoint = `/api/collaborateurs/id/${collaboratorId}`;
          } else if (table === "CollaborateurRoles") {
            // Pour CollaborateurRoles, utiliser la clé composite
            const matricule = data?.Matricule;
            const roleID = data?.RoleID;
            if (!matricule || !roleID) {
              toast.error("Matricule ou RoleID manquant pour la suppression");
              return;
            }
            endpoint = `/api/CollaborateurRoles/${matricule}/${roleID}`;
          } else {
            // Pour les autres tables, utiliser l'ID
            if (!id) {
              toast.error("ID manquant pour la suppression");
              return;
            }
            // Mapper les noms de tables aux noms de dossiers API
            const apiPathMap: { [key: string]: string } = {
              "service": "services",
              "fonction": "fonctions",
              "fournisseur": "fournisseur",
              "budget": "budget",
              "demandeur": "demandeur",
            };
            const apiPath = apiPathMap[table.toLowerCase()] || table.toLowerCase();
            endpoint = `/api/${apiPath}/${id}`;
          }

          console.log("Tentative de suppression:", endpoint);

          const response = await fetch(endpoint, {
            method: "DELETE",
          });

          // Vérifier le content-type avant de parser JSON
          const contentType = response.headers.get("content-type");
          let result: any;

          if (contentType && contentType.includes("application/json")) {
            try {
              const text = await response.text();
              if (text) {
                result = JSON.parse(text);
              } else {
                result = {};
              }
            } catch (jsonError) {
              console.error("Erreur lors du parsing JSON:", jsonError);
              toast.error("Erreur: La réponse du serveur n'est pas au format JSON valide");
              return;
            }
          } else {
            // Si la réponse n'est pas JSON (probablement HTML d'erreur)
            const text = await response.text();
            console.error("Réponse HTML reçue au lieu de JSON:", text.substring(0, 200));

            if (!response.ok) {
              toast.error(`Erreur ${response.status}: ${response.statusText || "Une erreur est survenue lors de la suppression"}`);
            } else {
              toast.success("Supprimé avec succès!");
            }
            return;
          }

          if (!response.ok) {
            console.error("Erreur de suppression:", result);
            toast.error(result.error || "Une erreur est survenue lors de la suppression");
            return;
          }

          toast.success("Supprimé avec succès!");
        } catch (error: any) {
          console.error("Erreur lors de la suppression:", error);
          toast.error(error.message || "Une erreur est survenue lors de la suppression");
        }
      };

      return (
        <div className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            Toutes les données seront perdues. Êtes-vous sûr de vouloir supprimer ce {table}?
          </span>
          <button
            onClick={handleDelete}
            className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center hover:bg-red-800"
          >
            Supprimer
          </button>
        </div>
      );
    }

    if (type === "create" || type === "update") {
      if (forms[formKey]) {
        return forms[formKey](type, data);
      } else {
        // Ce message s'affichera si "demandeur" n'a pas été défini dans l'objet 'forms'
        return <h1>Formulaire pour {table} non trouvé!</h1>;
      }
    }

    return "Action non reconnue!";
  };

  const modalContent = open && mounted ? (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn" style={{ margin: 0 }}>
      <div className="bg-white p-4 rounded-md relative w-full max-w-3xl max-h-[90vh] overflow-auto shadow-2xl animate-scaleIn">
        <Form />
        <div
          className="absolute top-4 right-4 cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-colors"
          onClick={() => setOpen(false)}
        >
          <Image src="/close.png" alt="" width={14} height={14} />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full shadow-sm hover:shadow ${colorClass}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
};

export default FormModal;
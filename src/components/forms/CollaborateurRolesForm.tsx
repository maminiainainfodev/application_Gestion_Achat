"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import InputField from "../InputField";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Types pour les données des listes déroulantes
type Collaborateur = {
  matricule: string;
  nom: string | null;
  prenom: string | null;
  prenomUsuelle: string | null;
};

type Role = {
  id: number;
  nomRole: string;
};

const schema = z.object({
  Matricule: z
    .string()
    .min(1, { message: "Le matricule du collaborateur est requis." })
    .max(20, { message: "Le matricule ne doit pas dépasser 20 caractères." }),
  RoleID: z
    .number({ invalid_type_error: "L'ID du rôle doit être un nombre." })
    .min(1, { message: "L'ID du rôle est requis." }),
  NomCollaborateur: z
    .string()
    .optional(),
  NomRole: z
    .string()
    .optional(),
});

type CollaborateurRolesInputs = z.infer<typeof schema>;

const CollaborateurRolesForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: CollaborateurRolesInputs;
}) => {
  const router = useRouter();

  // Store original values for update identification
  // We assume 'data' is stable for the duration of the edit form's life or reflects the entry being edited
  const originalMatriculeStr = data?.Matricule;
  const originalRoleIDNum = data?.RoleID;

  // États pour les listes déroulantes
  const [collaborateurs, setCollaborateurs] = useState<Collaborateur[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données initiales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, rolesRes] = await Promise.all([
          fetch("/api/collaborateurs"),
          fetch("/api/roles")
        ]);

        if (!usersRes.ok) throw new Error("Erreur chargement collaborateurs");
        if (!rolesRes.ok) throw new Error("Erreur chargement rôles");

        const usersData: Collaborateur[] = await usersRes.json();
        const rolesData: Role[] = await rolesRes.json();

        setCollaborateurs(usersData);
        setRoles(rolesData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CollaborateurRolesInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      Matricule: data?.Matricule || "",
      RoleID: data?.RoleID || undefined,
      NomCollaborateur: data?.NomCollaborateur || "",
      NomRole: data?.NomRole || "",
    }
  });

  // Observer les changements sur le matricule sélectionné
  const selectedMatricule = watch("Matricule");
  useEffect(() => {
    if (selectedMatricule) {
      const collaborateur = collaborateurs.find(c => c.matricule === selectedMatricule);
      if (collaborateur) {
        const nomComplet = `${collaborateur.prenom || ''} ${collaborateur.nom || ''}`.trim();
        setValue("NomCollaborateur", nomComplet);
      }
    } else {
      setValue("NomCollaborateur", "");
    }
  }, [selectedMatricule, collaborateurs, setValue]);

  // Observer les changements sur le rôle sélectionné
  const selectedRoleId = watch("RoleID");
  useEffect(() => {
    if (selectedRoleId) {
      const role = roles.find(r => r.id === Number(selectedRoleId));
      if (role) {
        setValue("NomRole", role.nomRole);
      }
    } else {
      setValue("NomRole", "");
    }
  }, [selectedRoleId, roles, setValue]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const finalData = {
        Matricule: formData.Matricule,
        RoleID: Number(formData.RoleID),
      };

      let response;
      if (type === "create") {
        response = await fetch("/api/CollaborateurRoles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        });
      } else {
        // Update mode
        // Ensure we have the original identifiers to delete/update the correct record
        if (!originalMatriculeStr || !originalRoleIDNum) {
          throw new Error("Identifiants d'origine manquants pour la modification");
        }

        // Construct the URL using the ORIGINAL keys
        response = await fetch(`/api/CollaborateurRoles/${originalMatriculeStr}/${originalRoleIDNum}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();

        // Check for specific duplicate error
        if (response.status === 400 && errorData.error && errorData.error.includes("existe déjà")) {
          throw new Error("Ce collaborateur possède déjà ce rôle !");
        }

        throw new Error(errorData.error || "Erreur lors de l'opération");
      }

      toast.success(type === "create" ? "Rôle attribué avec succès !" : "Attribution modifiée avec succès !");
      // Close modal logic would be handled by parent


    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Attribuer un rôle au collaborateur" : "Modifier l'association collaborateur-rôle"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Association Rôle et Collaborateur
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matricule du Collaborateur *
          </label>
          <select
            {...register("Matricule")}
            className={`w-full p-2 border rounded-md ${errors?.Matricule ? 'border-red-500' : 'border-gray-300'}`}
            disabled={isLoading || type === "update"} // Usually PK shouldn't change on update, but logic depends on "update" implementation
          >
            <option value="">Sélectionner un collaborateur</option>
            {collaborateurs.map((collaborateur) => (
              <option key={collaborateur.matricule} value={collaborateur.matricule}>
                {collaborateur.matricule} - {collaborateur.prenom} {collaborateur.nom}
              </option>
            ))}
          </select>
          {errors?.Matricule && (
            <p className="mt-1 text-sm text-red-600">{errors.Matricule.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rôle *
          </label>
          <select
            {...register("RoleID", { valueAsNumber: true })}
            className={`w-full p-2 border rounded-md ${errors?.RoleID ? 'border-red-500' : 'border-gray-300'}`}
            disabled={isLoading}
          >
            <option value="">Sélectionner un rôle</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.nomRole}
              </option>
            ))}
          </select>
          {errors?.RoleID && (
            <p className="mt-1 text-sm text-red-600">{errors.RoleID.message}</p>
          )}
        </div>
        <InputField
          label="Nom du Collaborateur"
          name="NomCollaborateur"
          defaultValue={data?.NomCollaborateur}
          register={register}
          error={errors?.NomCollaborateur}
          inputProps={{
            disabled: true,
            readOnly: true,
            // hidden: true // Keeping it visible based on screenshot preference, remove if needed
          }}
        />
        <InputField
          label="Nom du Rôle"
          name="NomRole"
          defaultValue={data?.NomRole}
          register={register}
          error={errors?.NomRole}
          inputProps={{
            disabled: true,
            readOnly: true,
          }}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 transition-colors">
        {type === "create" ? "Attribuer le Rôle" : "Mettre à jour l'Association"}
      </button>
    </form>
  );
};

export default CollaborateurRolesForm;
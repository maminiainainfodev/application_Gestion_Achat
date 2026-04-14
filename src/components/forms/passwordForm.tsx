"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import InputField from "../InputField";
import SelectField from "../SelectField";

type CollaborateurOption = {
  matricule: string;
  nom: string | null;
  prenom: string | null;
  prenomUsuelle: string | null;
};

const schema = z.object({
  Matricule: z
    .string({
      required_error: "Le matricule est requis",
    })
    .min(1, { message: "Le matricule est requis" }),
  MotDePasse: z
    .string({
      required_error: "Le mot de passe est requis",
    })
    .min(4, { message: "Le mot de passe doit contenir au moins 4 caractères" }),
});

type PasswordFormInputs = z.infer<typeof schema>;

const PasswordForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: { Matricule?: string; MotDePasse?: string };
}) => {
  const [collaborateurs, setCollaborateurs] = useState<CollaborateurOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/collaborateurs")
      .then((res) => res.json())
      .then((payload) => {
        setCollaborateurs(payload || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des collaborateurs:", error);
        setLoading(false);
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      Matricule: data?.Matricule || "",
      MotDePasse: data?.MotDePasse || "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        Matricule: data.Matricule || "",
        MotDePasse: data.MotDePasse || "",
      });
    }
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const endpoint =
        type === "create"
          ? "/api/motdepasse"
          : `/api/motdepasse/${data?.Matricule}`;
      const method = type === "create" ? "POST" : "PUT";
      const bodyPayload =
        type === "create"
          ? {
            Matricule: formData.Matricule,
            MotDePasse: formData.MotDePasse,
          }
          : {
            MotDePasse: formData.MotDePasse,
          };

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyPayload),
      });

      let result: any = {};
      try {
        result = await response.json();
      } catch (error) {
        // ignore if no json
      }

      if (!response.ok) {
        toast.error(result?.error || "Une erreur est survenue");
        return;
      }

      toast.success(
        type === "create"
          ? "Compte utilisateur créé avec succès!"
          : "Mot de passe mis à jour!"
      );

    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      toast.error("Une erreur est survenue lors de la soumission");
    }
  });

  const collaboratorOptions = collaborateurs.map((collab) => {
    const nomComplet = `${collab.prenom || ""} ${collab.nom || ""}`.trim();
    const displayName =
      collab.prenomUsuelle ||
      nomComplet ||
      collab.matricule;

    return {
      value: collab.matricule,
      label: `${displayName} (${collab.matricule})`,
    };
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "Créer un compte utilisateur"
          : "Mettre à jour le mot de passe"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Informations du compte
      </span>

      <div className="flex justify-between flex-wrap gap-4 w-full">
        {loading ? (
          <div className="flex flex-col gap-2 w-full md:w-1/3">
            <label className="text-xs text-gray-500">Collaborateur</label>
            <div className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
              Chargement...
            </div>
          </div>
        ) : (
          <SelectField
            label="Collaborateur"
            name="Matricule"
            register={register}
            error={errors?.Matricule}
            options={collaboratorOptions}
            defaultValue={data?.Matricule || ""}
            placeholder="Sélectionner un collaborateur"
            inputProps={{ disabled: type === "update" }}
          />
        )}

        <InputField
          label="Mot de passe"
          name="MotDePasse"
          register={register}
          error={errors?.MotDePasse}
          type="text"
          inputProps={{ placeholder: "Mot de passe en clair" }}
        />
      </div>

      <button
        className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Enregistrement..."
          : type === "create"
            ? "Créer le compte"
            : "Mettre à jour"}
      </button>
    </form>
  );
};

export default PasswordForm;



"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import InputField from "../InputField";
import Image from "next/image";
import toast from "react-hot-toast";

const schema = z.object({
  ID: z.number().optional(),
  Nom: z
    .string()
    .min(3, { message: "Le nom du fournisseur doit contenir au moins 3 caractères." }),
  Adresse: z
    .string()
    .min(1, { message: "L'adresse est requise." }),
  NomCheque: z
    .string()
    .min(3, { message: "Le nom sur le chèque est requis." }),
  NIF: z
    .string()
    .min(5, { message: "Le NIF (Numéro d'Identification Fiscale) est requis." }),
  CIN: z
    .string()
    .min(5, { message: "Le CIN (Carte d'Identité Nationale) est requis." }),
});

type FournisseurInputs = z.infer<typeof schema>;
type FournisseurModalData = Partial<FournisseurInputs> & {
  ID_Fournisseur?: number;
};

const FournisseurForm = ({
  type,
  data,
  onSuccess,
}: {
  type: "create" | "update";
  data?: FournisseurModalData;
  onSuccess?: (newFournisseur: any) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FournisseurInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      ID: data?.ID_Fournisseur ?? data?.ID,
      Nom: data?.Nom || "",
      Adresse: data?.Adresse || "",
      NomCheque: data?.NomCheque || "",
      NIF: data?.NIF || "",
      CIN: data?.CIN || "",
    }
  });

  // Mettre à jour les valeurs du formulaire quand data change
  useEffect(() => {
    if (data) {
      reset({
        ID: data.ID_Fournisseur ?? data.ID,
        Nom: data.Nom || "",
        Adresse: data.Adresse || "",
        NomCheque: data.NomCheque || "",
        NIF: data.NIF || "",
        CIN: data.CIN || "",
      });
    }
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const submitData = {
        Nom: formData.Nom || null,
        Adresse: formData.Adresse || null,
        NomCheque: formData.NomCheque || null,
        NIF: formData.NIF || null,
        CIN: formData.CIN || null,
      };

      const response = type === "create"
        ? await fetch("/api/fournisseur", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        })
        : await fetch(`/api/fournisseur/${data?.ID_Fournisseur ?? data?.ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Une erreur est survenue");
        return;
      }

      toast.success(type === "create"
        ? "Fournisseur créé avec succès!"
        : "Fournisseur mis à jour avec succès!");

      if (onSuccess) {
        onSuccess(result?.data || result);
      }

    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue lors de la soumission");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Créer un nouveau fournisseur" : "Modifier le fournisseur"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Informations du Fournisseur
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nom du Fournisseur"
          name="Nom"
          register={register}
          error={errors?.Nom}
        />
        <InputField
          label="Adresse"
          name="Adresse"
          register={register}
          error={errors?.Adresse}
        />
        <InputField
          label="Nom sur le Chèque"
          name="NomCheque"
          register={register}
          error={errors?.NomCheque}
        />
        <InputField
          label="NIF (Identification Fiscale)"
          name="NIF"
          register={register}
          error={errors?.NIF}
        />
        <InputField
          label="CIN (Carte d'Identité)"
          name="CIN"
          register={register}
          error={errors?.CIN}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Créer le Fournisseur" : "Mettre à jour le Fournisseur"}
      </button>
    </form>
  );
};

export default FournisseurForm;
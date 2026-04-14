"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Image from "next/image";
import toast from "react-hot-toast";

type Collaborateur = {
  matricule: string;
  nom: string | null;
  prenom: string | null;
  prenomUsuelle: string | null;
};

const schema = z.object({
  ID: z.number().optional(),
  NomService: z
    .string()
    .min(3, { message: "Le nom du service doit contenir au moins 3 caractères!" }),
  Abreviation: z
    .string()
    .max(10, { message: "L'abréviation ne doit pas dépasser 10 caractères!" })
    .nullable(),
  ChefServiceMatricule: z
    .string()
    .optional()
    .nullable(),
});

type ServiceInputs = z.infer<typeof schema>;

const ServiceForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: ServiceInputs;
}) => {
  const [collaborateurs, setCollaborateurs] = useState<Collaborateur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/collaborateurs")
      .then((res) => res.json())
      .then((data) => {
        setCollaborateurs(data);
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
    formState: { errors },
  } = useForm<ServiceInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      ID: data?.ID,
      NomService: data?.NomService || "",
      Abreviation: data?.Abreviation || null,
      ChefServiceMatricule: data?.ChefServiceMatricule || null,
    }
  });

  // Mettre à jour les valeurs du formulaire quand data change
  useEffect(() => {
    if (data) {
      reset({
        ID: data.ID,
        NomService: data.NomService || "",
        Abreviation: data.Abreviation || null,
        ChefServiceMatricule: data.ChefServiceMatricule || null,
      });
    }
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const submitData = {
        NomService: formData.NomService,
        Abreviation: formData.Abreviation || null,
        ChefServiceMatricule: formData.ChefServiceMatricule || null,
      };

      const response = type === "create"
        ? await fetch("/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        })
        : await fetch(`/api/services/${data?.ID}`, {
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
        ? "Service créé avec succès!"
        : "Service mis à jour avec succès!");

    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue lors de la soumission");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Créer un nouveau service" : "Modifier le service"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Informations du Service
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nom du Service"
          name="NomService"
          register={register}
          error={errors?.NomService}
        />
        <InputField
          label="Abréviation (Optionnel)"
          name="Abreviation"
          register={register}
          error={errors?.Abreviation}
        />
        {loading ? (
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Chef de Service</label>
            <div className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
              Chargement...
            </div>
          </div>
        ) : (
          <SelectField
            key={`chef-${data?.ChefServiceMatricule || 'new'}`}
            label="Chef de Service"
            name="ChefServiceMatricule"
            register={register}
            error={errors?.ChefServiceMatricule}
            defaultValue={data?.ChefServiceMatricule || ""}
            options={collaborateurs.map((collab) => {
              const nomComplet = `${collab.prenom || ''} ${collab.nom || ''}`.trim() || collab.matricule;
              return {
                value: collab.matricule,
                label: `${nomComplet} (${collab.matricule})`,
              };
            })}
            placeholder="Sélectionner un chef de service (optionnel)"
          />
        )}
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Créer le Service" : "Mettre à jour le Service"}
      </button>
    </form>
  );
};

export default ServiceForm;
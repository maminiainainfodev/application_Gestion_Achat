"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Image from "next/image";
import toast from "react-hot-toast";

type Service = {
  id: number;
  nomService: string;
  abreviation: string | null;
  chefServiceMatricule: string | null;
};

const schema = z.object({
  ID_Fonction: z.number().optional(),
  NomFonction: z
    .string()
    .min(3, { message: "Le nom de la fonction doit contenir au moins 3 caractères!" }),
  Abreviation: z
    .string()
    .max(10, { message: "L'abréviation ne doit pas dépasser 10 caractères!" })
    .optional(),
  ServiceID: z.union([
    z.number(),
    z.string().transform((val) => (val === "" ? undefined : parseInt(val, 10))),
  ]).optional(),
  ChefMatricule: z
    .string()
    .optional(),
});

type FonctionInputs = z.infer<typeof schema>;

const FonctionForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: FonctionInputs;
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des services:", error);
        setLoading(false);
      });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FonctionInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      ID_Fonction: data?.ID_Fonction,
      NomFonction: data?.NomFonction || "",
      Abreviation: data?.Abreviation || "",
      ServiceID: data?.ServiceID || undefined,
      ChefMatricule: data?.ChefMatricule || "",
    }
  });

  // Mettre à jour les valeurs du formulaire quand data change
  useEffect(() => {
    if (data) {
      reset({
        ID_Fonction: data.ID_Fonction,
        NomFonction: data.NomFonction || "",
        Abreviation: data.Abreviation || "",
        ServiceID: data.ServiceID || undefined,
        ChefMatricule: data.ChefMatricule || "",
      });
    }
  }, [data, reset]);

  const selectedServiceID = watch("ServiceID");

  // Écouter les changements du ServiceID et mettre à jour automatiquement le ChefMatricule
  useEffect(() => {
    if (selectedServiceID) {
      const serviceId = typeof selectedServiceID === 'string'
        ? parseInt(selectedServiceID, 10)
        : selectedServiceID;

      const selectedService = services.find(s => s.id === serviceId);
      if (selectedService && selectedService.chefServiceMatricule) {
        setValue("ChefMatricule", selectedService.chefServiceMatricule);
      } else {
        setValue("ChefMatricule", "");
      }
    } else {
      setValue("ChefMatricule", "");
    }
  }, [selectedServiceID, services, setValue]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const submitData = {
        NomFonction: formData.NomFonction,
        Abreviation: formData.Abreviation || null,
        ServiceID: formData.ServiceID ? parseInt(formData.ServiceID.toString(), 10) : null,
        ChefMatricule: formData.ChefMatricule || null,
      };

      const response = type === "create"
        ? await fetch("/api/fonctions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        })
        : await fetch(`/api/fonctions/${data?.ID_Fonction}`, {
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
        ? "Fonction créée avec succès!"
        : "Fonction mise à jour avec succès!");

    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue lors de la soumission");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Créer une nouvelle fonction" : "Modifier la fonction"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Informations Générales
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nom de la Fonction"
          name="NomFonction"
          register={register}
          error={errors?.NomFonction}
        />
        <InputField
          label="Abréviation"
          name="Abreviation"
          register={register}
          error={errors?.Abreviation}
        />
        {loading ? (
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Service</label>
            <div className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
              Chargement...
            </div>
          </div>
        ) : (
          <SelectField
            key={`service-${data?.ServiceID || 'new'}`}
            label="Service"
            name="ServiceID"
            register={register}
            error={errors?.ServiceID}
            defaultValue={data?.ServiceID}
            options={services.map((service) => ({
              value: service.id,
              label: `${service.nomService}${service.abreviation ? ` (${service.abreviation})` : ''}`,
            }))}
            placeholder="Sélectionner un service (optionnel)"
          />
        )}
        <InputField
          label="Matricule du Chef"
          name="ChefMatricule"
          register={register}
          error={errors?.ChefMatricule}
          inputProps={{ readOnly: true }}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Créer la Fonction" : "Mettre à jour la Fonction"}
      </button>
    </form>
  );
};

export default FonctionForm;
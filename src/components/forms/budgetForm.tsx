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
  CodeBudgetaire: z
    .string()
    .min(1, { message: "Le code budgétaire est requis." })
    .max(50, { message: "Le code budgétaire ne doit pas dépasser 50 caractères." }),
  MontantDisponible: z
    .number({ invalid_type_error: "Le montant disponible doit être un nombre." })
    .min(0, { message: "Le montant disponible ne peut pas être négatif." }),
  ServiceID: z
    .number({ invalid_type_error: "L'ID du Service doit être un nombre." })
    .nullable(),
});

type BudgetInputs = z.infer<typeof schema>;

const BudgetForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: BudgetInputs;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      ID: data?.ID,
      CodeBudgetaire: data?.CodeBudgetaire || "",
      MontantDisponible: data?.MontantDisponible || 0,
      ServiceID: data?.ServiceID || null,
    }
  });

  // Mettre à jour les valeurs du formulaire quand data change
  useEffect(() => {
    if (data) {
      reset({
        ID: data.ID,
        CodeBudgetaire: data.CodeBudgetaire || "",
        MontantDisponible: data.MontantDisponible || 0,
        ServiceID: data.ServiceID || null,
      });
    }
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const submitData = {
        CodeBudgetaire: formData.CodeBudgetaire,
        MontantDisponible: parseFloat(formData.MontantDisponible.toString()),
        ServiceID: formData.ServiceID !== null ? parseInt(formData.ServiceID.toString(), 10) : null,
      };

      const response = type === "create"
        ? await fetch("/api/budget", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        })
        : await fetch(`/api/budget/${data?.ID}`, {
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
        ? "Budget créé avec succès!"
        : "Budget mis à jour avec succès!");

    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue lors de la soumission");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Créer un nouveau budget" : "Modifier le budget"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Informations Budgétaires
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Code Budgétaire"
          name="CodeBudgetaire"
          register={register}
          error={errors?.CodeBudgetaire}
        />
        <InputField
          label="Montant Disponible (DZD)"
          name="MontantDisponible"
          register={register}
          error={errors?.MontantDisponible}
          type="number"
          inputProps={{ step: "0.01" }}
        />
        <InputField
          label="ID du Service (Optionnel)"
          name="ServiceID"
          register={register}
          error={errors?.ServiceID}
          type="number"
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Créer le Budget" : "Mettre à jour le Budget"}
      </button>
    </form>
  );
};

export default BudgetForm;
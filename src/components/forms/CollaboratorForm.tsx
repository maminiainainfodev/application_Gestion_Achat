"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type FonctionData = {
  id: number;
  nomFonction: string;
  abreviation: string | null;
  serviceId: number | null;
  service: {
    id: number;
    nomService: string;
    abreviation: string | null;
  } | null;
};

type Collaborator = {
  Matricule: string;
  Nom: string;
  Prenom: string;
  PrenomUsuelle: string;
  Civilite: "Homme" | "Femme";
  Fonction: string;
  Service: string;
  Telephone: string;
  MailPro: string;
  PhotoURL: string;
  Id_collaborateur?: number;
  Id?: number;
};

const collaboratorSchema = z.object({
  Matricule: z
    .string()
    .length(8, { message: "Le Matricule doit contenir exactement 8 caractères (format PCRS0000)." })
    .regex(/^PCRS\d{4}$/, {
      message: "Le Matricule doit commencer par 'PCRS' et être suivi de 4 chiffres (ex: PCRS0001)."
    }),
  Nom: z.string().min(1, { message: "Le Nom est requis." }),
  Prenom: z.string().min(1, { message: "Le Prénom est requis." }),
  PrenomUsuelle: z.string().optional(),
  Civilite: z.enum(["Homme", "Femme"], { message: "La Civilité est requise." }),
  Fonction: z.string().min(1, { message: "La Fonction est requise." }),
  Service: z.string().optional(),
  MailPro: z
    .union([
      z.string().email({ message: "Adresse email professionnelle invalide." }),
      z.string().length(0),
      z.undefined(),
    ])
    .optional(),
  PhotoFile: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file || file === "") return true; // Optionnel
        if (file instanceof File) {
          // Vérifier le type de fichier
          const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
          return validTypes.includes(file.type);
        }
        return true;
      },
      {
        message: "Le fichier doit être une image (JPEG, PNG, GIF ou WebP)",
      }
    ),
  Telephone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length === 0 || /^03[234789]\d{7}$/.test(val.replace(/\s/g, "")),
      {
        message: "Le numéro doit commencer par 032, 033, 034, 037, 038 ou 039 et contenir 10 chiffres.",
      }
    ),
});

type CollaboratorInputs = z.infer<typeof collaboratorSchema>;

const sanitizeMatricule = (value: string) =>
  (value || "").toUpperCase().replace(/\s/g, "").slice(0, 8);

const formatMatriculeDisplay = (value: string) => {
  const cleaned = sanitizeMatricule(value);
  if (cleaned.length <= 4) return cleaned;
  return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
};

const uploadProfilePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!response.ok || !data.success || !data.data?.url) {
    throw new Error(data.message || "Impossible d'uploader la photo");
  }
  return data.data.url as string;
};

const CollaboratorForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Partial<Collaborator>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CollaboratorInputs>({
    resolver: zodResolver(collaboratorSchema),
    defaultValues: {
      ...data,
      Service: data?.Service || "",
    },
    mode: "onSubmit",
  });

  const [phoneNumber, setPhoneNumber] = useState(data?.Telephone || "");
  const isUpdate = type === "update";
  const collaboratorId = data?.Id ?? data?.Id_collaborateur;
  const [matriculeDisplay, setMatriculeDisplay] = useState(
    formatMatriculeDisplay(data?.Matricule || "")
  );
  const [fonctions, setFonctions] = useState<FonctionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(data?.PhotoURL || null);

  const selectedFonction = watch("Fonction");
  const serviceValue = watch("Service");
  const fonctionField = register("Fonction");
  const photoFile = watch("PhotoFile");

  const formatPhoneNumber = (value: string) => {
    let cleaned = value.replace(/\D/g, "");

    cleaned = cleaned.substring(0, 10);

    let formatted = "";

    if (cleaned.length >= 1) {
      formatted += cleaned.substring(0, 3);
    }
    if (cleaned.length > 3) {
      formatted += " " + cleaned.substring(3, 5);
    }
    if (cleaned.length > 5) {
      formatted += " " + cleaned.substring(5, 8);
    }
    if (cleaned.length > 8) {
      formatted += " " + cleaned.substring(8, 10);
    }

    return formatted.trim();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cleanedValue = rawValue.replace(/\D/g, "");

    if (cleanedValue.length <= 10) {
      const formatted = formatPhoneNumber(rawValue);
      setPhoneNumber(formatted);

      // Met à jour la valeur interne pour la soumission.
      setValue("Telephone", cleanedValue, { shouldDirty: true });
    }
    // NE PAS appeler trigger("Telephone") ici
  };

  const formatMatricule = (value: string) => {
    let cleaned = value.toUpperCase().replace(/\s/g, '');

    if (!cleaned.startsWith('PCRS')) {
      cleaned = 'PCRS';
    }
    cleaned = cleaned.substring(0, 8);

    let masked = cleaned;
    if (cleaned.length > 4) {
      masked = cleaned.substring(0, 4) + ' ' + cleaned.substring(4);
    }

    return { masked, cleaned };
  }

  useEffect(() => {
    register("Matricule");
    register("PhotoFile");
  }, [register]);

  const handleMatriculeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUpdate) return;
    const cleaned = sanitizeMatricule(e.target.value);
    setMatriculeDisplay(formatMatriculeDisplay(cleaned));
    setValue("Matricule", cleaned, { shouldDirty: true });
  };

  // Fetch fonctions from API
  useEffect(() => {
    const fetchFonctions = async () => {
      try {
        const response = await fetch("/api/fonctions");
        if (response.ok) {
          const fonctionsData = await response.json();
          setFonctions(fonctionsData);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des fonctions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFonctions();
  }, []);

  useEffect(() => {
    const defaultMatricule = sanitizeMatricule(data?.Matricule || "");
    setMatriculeDisplay(formatMatriculeDisplay(defaultMatricule));
    setValue("Matricule", defaultMatricule, { shouldDirty: false });
  }, [data?.Matricule, setValue]);

  // Pré-remplir les champs en mode mise à jour
  useEffect(() => {
    if (type === "update") {
      if (data?.Fonction) {
        setValue("Fonction", data.Fonction, { shouldDirty: false });
      }
      if (data?.Service) {
        setValue("Service", data.Service, { shouldDirty: false });
      }
    }
  }, [type, data?.Fonction, data?.Service, setValue]);

  // Synchroniser la fonction/service avec les données récupérées
  useEffect(() => {
    if (!isUpdate || !data?.Fonction || fonctions.length === 0) return;
    const fonction = fonctions.find((f: FonctionData) => f.nomFonction === data.Fonction);
    if (!fonction) return;
    if (selectedFonction !== fonction.nomFonction) {
      setValue("Fonction", fonction.nomFonction, { shouldValidate: true });
    }
    if (fonction.service) {
      if (serviceValue !== fonction.service.nomService) {
        setValue("Service", fonction.service.nomService, { shouldValidate: true });
      }
    }
  }, [fonctions, type, data?.Fonction, selectedFonction, serviceValue, setValue]);

  // Update service when fonction changes
  useEffect(() => {
    if (selectedFonction && fonctions.length > 0) {
      const selectedFonctionData = fonctions.find(
        (f: FonctionData) => f.nomFonction === selectedFonction
      );
      if (selectedFonctionData?.service) {
        setValue("Service", selectedFonctionData.service.nomService, { shouldValidate: true });
      } else {
        setValue("Service", "", { shouldValidate: true });
      }
    }
  }, [selectedFonction, fonctions, setValue]);

  const extractFirstFile = (value: any): File | null => {
    if (!value) return null;
    if (value instanceof File) return value;
    if (value instanceof FileList) return value.length > 0 ? value[0] : null;
    if (Array.isArray(value)) {
      const candidate = value[0];
      if (candidate instanceof File) return candidate;
      if (candidate?.file instanceof File) return candidate.file;
    }
    return null;
  };

  useEffect(() => {
    const file = extractFirstFile(photoFile);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPhotoPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPhotoPreview(data?.PhotoURL || null);
  }, [photoFile, data?.PhotoURL]);

  const handlePhotoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("PhotoFile", file, { shouldDirty: true });
  };


  const onSubmit = handleSubmit(async (formData) => {
    try {
      const sanitizedMatricule = sanitizeMatricule(formData.Matricule || data?.Matricule || "");

      if (!sanitizedMatricule) {
        toast.error("Le matricule est invalide.");
        return;
      }

      if (type === "create" && sanitizedMatricule) {
        try {
          const checkResponse = await fetch(`/api/collaborateurs/${sanitizedMatricule}`);
          if (checkResponse.ok) {
            toast.error("Un collaborateur avec ce matricule existe déjà.");
            return;
          }
        } catch (checkError) {
          // Si l'endpoint renvoie 404, on continue simplement
        }
      }

      // Préparer les données à envoyer
      const submitData: any = {
        Matricule: sanitizedMatricule,
        Nom: formData.Nom,
        Prenom: formData.Prenom,
        PrenomUsuelle: formData.PrenomUsuelle || "",
        Civilite: formData.Civilite,
        Fonction: formData.Fonction,
        Service: formData.Service || "",
        Telephone: formData.Telephone || "",
        MailPro: formData.MailPro || "",
      };

      // Gérer l'upload de l'image si présente
      if (formData.PhotoFile && formData.PhotoFile instanceof File) {
        try {
          submitData.Photo = await uploadProfilePhoto(formData.PhotoFile);
        } catch (error: any) {
          toast.error(error.message || "Upload de la photo impossible");
          return;
        }
      }

      const updateMatricule = sanitizeMatricule(data?.Matricule || sanitizedMatricule);

      const response = type === "create"
        ? await fetch("/api/collaborateurs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        })
        : collaboratorId
          ? await fetch(`/api/collaborateurs/id/${collaboratorId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
          })
          : await fetch(`/api/collaborateurs/${updateMatricule}`, {
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
        ? "Collaborateur créé avec succès!"
        : "Collaborateur mis à jour avec succès!");

    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue lors de la soumission");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Créer un nouveau collaborateur" : "Modifier le collaborateur"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Informations d Identification
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Matricule</label>
          <input
            type="text"
            className={`ring-[1.5px] p-2 rounded-md text-sm w-full uppercase ${!isUpdate && errors.Matricule ? "ring-red-400" : "ring-gray-300"
              } ${isUpdate ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
            placeholder="PCRS 0000"
            value={matriculeDisplay}
            onChange={handleMatriculeChange}
            readOnly={isUpdate}
            maxLength={9}
          />
          {!isUpdate && errors.Matricule?.message && (
            <p className="text-xs text-red-400">
              {errors.Matricule.message.toString()}
            </p>
          )}
        </div>

        <InputField
          label="Email Professionnel (optionnel)"
          name="MailPro"
          defaultValue={data?.MailPro}
          register={register}
          error={errors.MailPro}
          type="email"
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Informations Professionnelles
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-[32%]">
          <label className="text-xs text-gray-500">Fonction</label>
          {(() => {
            const fonctionField = register("Fonction");
            return (
              <select
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                disabled={loading}
                value={selectedFonction || ""}
                onChange={(e) => {
                  fonctionField.onChange(e);
                }}
                onBlur={fonctionField.onBlur}
                name={fonctionField.name}
                ref={fonctionField.ref}
              >
                <option value="">{loading ? "Chargement..." : "Sélectionner une fonction"}</option>
                {fonctions.map((f: FonctionData) => (
                  <option key={f.id} value={f.nomFonction}>
                    {f.nomFonction}
                  </option>
                ))}
              </select>
            );
          })()}
          {errors.Fonction?.message && (
            <p className="text-xs text-red-400">
              {errors.Fonction.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-[32%]">
          <label className="text-xs text-gray-500">Service</label>
          <input
            type="text"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100"
            value={watch("Service") || ""}
            readOnly
            {...register("Service")}
          />
          {errors.Service?.message && (
            <p className="text-xs text-red-400">
              {errors.Service.message.toString()}
            </p>
          )}
        </div>
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Informations Personnelles
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nom"
          name="Nom"
          defaultValue={data?.Nom}
          register={register}
          error={errors.Nom}
        />
        <InputField
          label="Prénom"
          name="Prenom"
          defaultValue={data?.Prenom}
          register={register}
          error={errors.Prenom}
        />
        <InputField
          label="Prénom Usuel"
          name="PrenomUsuelle"
          defaultValue={data?.PrenomUsuelle}
          register={register}
          error={errors.PrenomUsuelle}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Téléphone (optionnel)</label>
          <input
            type="tel"
            className={`ring-[1.5px] p-2 rounded-md text-sm w-full ${errors.Telephone ? "ring-red-400" : "ring-gray-300"
              }`}
            placeholder="034 00 000 00"
            value={phoneNumber}
            onChange={handlePhoneChange}
            // onBlur est retiré ou laissé vide
            maxLength={14}
          />
          {errors.Telephone?.message && (
            <p className="text-xs text-red-400">
              {errors.Telephone.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Civilité</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("Civilite")}
          >
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
          {errors.Civilite?.message && (
            <p className="text-xs text-red-400">
              {errors.Civilite.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="PhotoFile"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Charger une photo (optionnel)</span>
          </label>
          <input
            type="file"
            id="PhotoFile"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            className="hidden"
            onChange={(e) => {
              handlePhotoInputChange(e);
              e.target.value = "";
            }}
          />
          <div className="mt-2 flex items-center gap-3">
            <div className="w-20 h-20 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Aperçu"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/avatar.png";
                  }}
                />
              ) : (
                <Image src="/avatar.png" alt="Avatar" width={40} height={40} />
              )}
            </div>
            <span className="text-xs text-gray-500">
              {photoPreview ? "Aperçu de la photo" : "Aucune photo sélectionnée"}
            </span>
          </div>
          {errors.PhotoFile?.message && (
            <p className="text-xs text-red-400">
              {errors.PhotoFile.message.toString()}
            </p>
          )}
        </div>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Créer" : "Mettre à jour"}
      </button>
    </form>
  );
};

export default CollaboratorForm;
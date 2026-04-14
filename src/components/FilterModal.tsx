"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseUrl: string;
}

type FilterType = "civilite" | "responsabilite" | "role" | null;

type Service = {
  id: number;
  nomService: string;
  abreviation: string | null;
};

type Fonction = {
  id: number;
  nomFonction: string;
  abreviation: string | null;
};

type WorkflowRole = {
  id: number;
  nomRole: string;
};

const FilterModal = ({ isOpen, onClose, baseUrl }: FilterModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilterType = searchParams.get("filterType") as FilterType;
  const initialFilterValue = searchParams.get("filterValue") || "";

  const [filterType, setFilterType] = useState<FilterType>(initialFilterType);
  const [filterValue, setFilterValue] = useState<string>(
    initialFilterValue
  );
  const [services, setServices] = useState<Service[]>([]);
  const [fonctions, setFonctions] = useState<Fonction[]>([]);
  const [roles, setRoles] = useState<WorkflowRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);

  // Update state when modal opens or searchParams change
  useEffect(() => {
    if (isOpen) {
      const currentFilterType = searchParams.get("filterType") as FilterType;
      const currentFilterValue = searchParams.get("filterValue") || "";
      setFilterType(currentFilterType);
      setFilterValue(currentFilterValue);
    }
  }, [isOpen, searchParams]);

  useEffect(() => {
    if (!isOpen) return;

    if (filterType === "responsabilite" && services.length === 0 && fonctions.length === 0) {
      setLoading(true);
      Promise.all([
        fetch("/api/services").then(res => res.json()),
        fetch("/api/fonctions").then(res => res.json())
      ]).then(([servicesData, fonctionsData]) => {
        setServices(servicesData);
        setFonctions(fonctionsData.map((f: any) => ({ id: f.id, nomFonction: f.nomFonction, abreviation: f.abreviation })));
        setLoading(false);
      })
        .catch(error => {
          console.error("Erreur lors du chargement:", error);
          setLoading(false);
        });
    }

    if (filterType === "role" && roles.length === 0) {
      setRolesLoading(true);
      fetch("/api/roles")
        .then(res => res.json())
        .then((rolesData) => {
          setRoles(rolesData);
          setRolesLoading(false);
        })
        .catch(error => {
          console.error("Erreur lors du chargement des rôles:", error);
          setRolesLoading(false);
        });
    }
  }, [filterType, fonctions.length, isOpen, roles.length, services.length]);

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (filterType && filterValue) {
      params.set("filterType", filterType);
      params.set("filterValue", filterValue);
      params.delete("page"); // Reset to page 1 when filtering
    } else {
      params.delete("filterType");
      params.delete("filterValue");
    }

    router.push(`${baseUrl}?${params.toString()}`);
    onClose();
  };

  const handleClearFilter = () => {
    setFilterType(null);
    setFilterValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filterType");
    params.delete("filterValue");
    params.delete("page");
    router.push(`${baseUrl}?${params.toString()}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl shadow-2xl relative w-[90%] md:w-[520px] animate-scaleIn">
        <div className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
          <Image src="/close.png" alt="Fermer" width={14} height={14} />
        </div>

        <h2 className="text-xl font-semibold mb-4">Filtrer les collaborateurs</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Type de filtre</label>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setFilterType("civilite");
                  setFilterValue("");
                }}
                className={`px-4 py-2 rounded-md text-sm ${filterType === "civilite"
                    ? "bg-lamaSky text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Civilité
              </button>
              <button
                onClick={() => {
                  setFilterType("responsabilite");
                  setFilterValue("");
                }}
                className={`px-4 py-2 rounded-md text-sm ${filterType === "responsabilite"
                    ? "bg-lamaSky text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Responsabilité
              </button>
              <button
                onClick={() => {
                  setFilterType("role");
                  setFilterValue("");
                }}
                className={`px-4 py-2 rounded-md text-sm ${filterType === "role"
                    ? "bg-lamaSky text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Rôle workflow
              </button>
            </div>
          </div>

          {filterType === "civilite" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Civilité</label>
              <select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
              >
                <option value="">Toutes les civilités</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
          )}

          {filterType === "responsabilite" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Type de responsabilité</label>
              <select
                value={filterValue.startsWith("service:") || filterValue.startsWith("fonction:") ? filterValue.split(":")[0] : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setFilterValue(e.target.value + ":");
                  } else {
                    setFilterValue("");
                  }
                }}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
              >
                <option value="">Sélectionner un type</option>
                <option value="service">Service</option>
                <option value="fonction">Fonction</option>
              </select>
            </div>
          )}

          {filterType === "responsabilite" && filterValue.startsWith("service:") && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Service</label>
              {loading ? (
                <div className="text-sm text-gray-500">Chargement...</div>
              ) : (
                <select
                  value={filterValue.replace("service:", "")}
                  onChange={(e) => setFilterValue("service:" + e.target.value)}
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
                >
                  <option value="">Tous les services</option>
                  {services.map(service => (
                    <option key={service.id} value={service.nomService}>
                      {service.nomService}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {filterType === "responsabilite" && filterValue.startsWith("fonction:") && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Fonction</label>
              {loading ? (
                <div className="text-sm text-gray-500">Chargement...</div>
              ) : (
                <select
                  value={filterValue.replace("fonction:", "")}
                  onChange={(e) => setFilterValue("fonction:" + e.target.value)}
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
                >
                  <option value="">Toutes les fonctions</option>
                  {fonctions.map(fonction => (
                    <option key={fonction.id} value={fonction.nomFonction}>
                      {fonction.nomFonction}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {filterType === "role" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Rôle dans le workflow</label>
              {rolesLoading ? (
                <div className="text-sm text-gray-500">Chargement des rôles...</div>
              ) : (
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
                >
                  <option value="">Tous les rôles</option>
                  {roles.map((workflowRole) => (
                    <option key={workflowRole.id} value={String(workflowRole.id)}>
                      {workflowRole.nomRole}
                    </option>
                  ))}
                </select>
              )}
              <p className="text-xs text-gray-500">
                Identifiez rapidement les valideurs, approbateurs ou simples demandeurs.
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-end mt-4">
            <button
              onClick={handleClearFilter}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Effacer
            </button>
            <button
              onClick={handleApplyFilter}
              className="px-4 py-2 bg-lamaSky text-white rounded-md hover:bg-blue-600"
            >
              Appliquer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;


export const NAVETTE_FILTER_TYPES = [
  "Achat",
  "Paiement",
  "NoteFrais",
  "DRFMS",
  "DRFME",
] as const;

export type NavetteFilterType = (typeof NAVETTE_FILTER_TYPES)[number];

export type NavetteLayout = "standard" | "nonStandard";

type NavetteMeta = {
  label: string;
  layout: NavetteLayout;
  code: string;
};

const NAVETTE_META: Record<NavetteFilterType, NavetteMeta> = {
  Achat: {
    label: "Navette Achat (NAV-ACH)",
    layout: "standard",
    code: "NAV-ACH",
  },
  Paiement: {
    label: "Navette Paiement (NP)",
    layout: "standard",
    code: "NP",
  },
  NoteFrais: {
    label: "Note de Frais (NDF)",
    layout: "standard",
    code: "NDF",
  },
  DRFMS: {
    label: "DRFMS",
    layout: "nonStandard",
    code: "DRFMS",
  },
  DRFME: {
    label: "DRFME",
    layout: "nonStandard",
    code: "DRFME",
  },
};

const API_TYPE_LOOKUP: Record<string, NavetteFilterType> = {
  ACHAT: "Achat",
  "NAV-ACH": "Achat",
  ACHA: "Achat",
  A: "Achat",
  PAIEMENT: "Paiement",
  "NAV-PAI": "Paiement",
  NP: "Paiement",
  NOTE_FRAIS: "NoteFrais",
  NOTEFRAIS: "NoteFrais",
  NDF: "NoteFrais",
  DRFMS: "DRFMS",
  DRFME: "DRFME",
};

export function resolveNavetteFilterType(
  value?: string | null
): NavetteFilterType {
  if (!value) return "Achat";
  const normalized = value.toUpperCase().replace(/[^A-Z_-]/g, "");
  return API_TYPE_LOOKUP[normalized] ?? "Achat";
}

export function getNavetteLayout(type: NavetteFilterType): NavetteLayout {
  return NAVETTE_META[type].layout;
}

export function getNavetteLabel(type: NavetteFilterType | "Tout"): string {
  if (type === "Tout") return "Tous les types";
  return NAVETTE_META[type].label;
}

export function getNavetteCode(type: NavetteFilterType): string {
  return NAVETTE_META[type].code;
}


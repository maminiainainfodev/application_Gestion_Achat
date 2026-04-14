export const formatAriary = (
  amount: number | null | undefined,
  options?: { withSuffix?: boolean; minimumFractionDigits?: number; maximumFractionDigits?: number }
) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "-";
  }

  const {
    withSuffix = true,
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options || {};

  const formatted = amount.toLocaleString("fr-MG", {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return withSuffix ? `${formatted} Ar` : formatted;
};



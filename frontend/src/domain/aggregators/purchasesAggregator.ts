import { GeneralPurchase } from "../entities/GeneralPurchase";

export const purchasesAggregator = (
  mappedServicePurchases: GeneralPurchase[],
  mappedProductPurchases: GeneralPurchase[]
) => {
  const aggregatedPurchases = mappedServicePurchases.concat(
    mappedProductPurchases
  );

  aggregatedPurchases.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return aggregatedPurchases;
};

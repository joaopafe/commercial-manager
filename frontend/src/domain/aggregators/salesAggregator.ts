import { GeneralSale } from "../entities/GeneralSale";

export const salesAggregator = (
  mappedServiceSales: GeneralSale[],
  mappedProductSales: GeneralSale[]
) => {
  const aggregatedSales = mappedServiceSales.concat(mappedProductSales);

  aggregatedSales.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return aggregatedSales;
};

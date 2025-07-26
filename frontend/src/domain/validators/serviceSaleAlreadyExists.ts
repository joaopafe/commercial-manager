import { ServiceSale } from "../entities/ServiceSale";

export const serviceSaleAlreadyExists = (
  serviceSaleCode: number,
  serviceSales: ServiceSale[]
) => {
  const serviceSaleAlreadyExists =
    serviceSales.filter((serviceSale) => {
      return serviceSale.id === serviceSaleCode;
    }).length === 1;

  return serviceSaleAlreadyExists;
};

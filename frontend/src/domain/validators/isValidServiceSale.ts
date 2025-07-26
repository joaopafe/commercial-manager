import { AddServiceSaleParams } from "../useCases/CreateServiceSale";

export const isValidServiceSale = (serviceSale: AddServiceSaleParams) => {
  const isValidServiceSale =
    serviceSale.name.length >= 3 &&
    serviceSale.clientId >= 1 &&
    serviceSale.value >= 0;

  return isValidServiceSale;
};

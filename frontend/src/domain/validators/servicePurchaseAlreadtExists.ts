import { ServicePurchase } from "../entities/ServicePurchase";

export const servicePurchaseAlreadyExists = (
  servicePurchaseCode: number,
  servicePurchases: ServicePurchase[]
) => {
  const servicePurchaseAlreadyExists =
    servicePurchases.filter((servicePurchase) => {
      return servicePurchase.id === servicePurchaseCode;
    }).length === 1;

  return servicePurchaseAlreadyExists;
};

import { AddServicePurchaseParams } from "../useCases/CreateServicePurchase";

export const isValidServicePurchase = (
  servicePurchase: AddServicePurchaseParams
) => {
  const isValidServicePurchase =
    servicePurchase.name.length >= 3 &&
    servicePurchase.supplierId >= 1 &&
    servicePurchase.value >= 0;

  return isValidServicePurchase;
};

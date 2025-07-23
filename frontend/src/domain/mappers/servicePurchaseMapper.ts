import { ServicePurchase } from "../entities/ServicePurchase";
import { Supplier } from "../entities/Supplier";
import { GeneralPurchase } from "../entities/GeneralPurchase";

export const servicePurchaseMapper = (
  servicePurchases: ServicePurchase[],
  suppliers: Supplier[]
): GeneralPurchase[] => {
  const mappedServicePurchases = servicePurchases.map((servicePurchase) => {
    const supplier = suppliers.find((supplier) => {
      return supplier.code === servicePurchase.supplierId;
    });

    return {
      supplierName: supplier ? supplier.name : "",
      name: servicePurchase.name,
      value: servicePurchase.value,
      date: servicePurchase.date,
    };
  });

  return mappedServicePurchases;
};

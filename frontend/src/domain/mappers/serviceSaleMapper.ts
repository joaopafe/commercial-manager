import { ServiceSale } from "../entities/ServiceSale";
import { Customer } from "../entities/Customer";
import { GeneralSale } from "../entities/GeneralSale";

export const serviceSaleMapper = (
  serviceSales: ServiceSale[],
  customers: Customer[]
): GeneralSale[] => {
  const mappedServiceSales = serviceSales.map((serviceSale) => {
    const customer = customers.find((customer) => {
      return customer.code === serviceSale.clientId;
    });

    return {
      clientName: customer ? customer.name : "",
      name: serviceSale.name,
      value: serviceSale.value,
      date: serviceSale.date,
    };
  });

  return mappedServiceSales;
};

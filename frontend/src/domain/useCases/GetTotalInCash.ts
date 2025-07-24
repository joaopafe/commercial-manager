import { GeneralSale } from "../entities/GeneralSale";
import { GeneralPurchase } from "../entities/GeneralPurchase";

export class GetTotalInCash {
  async exec(allSales: GeneralSale[], allPurchases: GeneralPurchase[]) {
    let totalSales = 0;
    for (const sale of allSales) totalSales += sale.value;

    let totalPurchases = 0;
    for (const purchase of allPurchases) totalPurchases += purchase.value;

    const totalInCash = totalSales - totalPurchases;

    return totalInCash;
  }
}

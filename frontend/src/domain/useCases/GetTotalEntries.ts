import { GeneralSale } from "../entities/GeneralSale";

export class GetTotalEntries {
  exec(allSales: GeneralSale[]) {
    let totalEntries = 0;

    for (const sale of allSales) {
      totalEntries += sale.value;
    }

    return totalEntries;
  }
}

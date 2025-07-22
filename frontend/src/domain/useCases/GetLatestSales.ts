import { GeneralSale } from "../entities/GeneralSale";

export class GetLatestSales {
  exec(allSales: GeneralSale[]) {
    if (allSales.length > 5) {
      const latestSales: GeneralSale[] = [];

      for (let i = 0; i <= 4; i++) {
        latestSales.push(allSales[i]);
      }

      return latestSales;
    }

    const latestSales: GeneralSale[] = [];

    for (const sale of allSales) latestSales.push(sale);

    return latestSales;
  }
}

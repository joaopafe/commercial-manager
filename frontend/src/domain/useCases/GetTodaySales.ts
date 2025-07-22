import { TodaySales } from "../entities/TodaySales";
import { GeneralSale } from "../entities/GeneralSale";

export class GetTodaySales {
  constructor() {}

  exec(allSales: GeneralSale[]): TodaySales {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysFilteredSales = allSales.filter((sale) => {
      const saleDate = new Date(sale.date);
      saleDate.setHours(0, 0, 0, 0);
      return saleDate.getTime() === today.getTime();
    });

    let todaySales = 0;

    for (let i = 0; i < todaysFilteredSales.length; i++) {
      todaySales += todaysFilteredSales[i].value;
    }

    return todaySales;
  }
}

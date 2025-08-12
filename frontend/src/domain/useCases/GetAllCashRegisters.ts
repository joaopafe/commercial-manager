import { CashRegister } from "../entities/CashRegister";
import { GeneralPurchase } from "../entities/GeneralPurchase";
import { GeneralSale } from "../entities/GeneralSale";

export class GetAllCashRegisters {
  exec(
    allPurchases: GeneralPurchase[],
    allSales: GeneralSale[]
  ): CashRegister[] {
    const allPurchasesRegisters: CashRegister[] = allPurchases.map(
      (purchase) => {
        return {
          date: purchase.date,
          description: purchase.name,
          type: "Saída",
          value: purchase.value,
        };
      }
    );

    const allSalesRegisters: CashRegister[] = allSales.map((sale) => {
      return {
        date: sale.date,
        description: sale.name,
        type: "Entrada",
        value: sale.value,
      };
    });

    const allCashRegisters = allPurchasesRegisters.concat(allSalesRegisters);

    const orderedPurchases = allCashRegisters.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    return orderedPurchases;
  }
}

import { GeneralPurchase } from "../entities/GeneralPurchase";

export class GetTotalOutputs {
  exec(allPurchases: GeneralPurchase[]) {
    let totalOutputs = 0;

    for (const purchase of allPurchases) {
      totalOutputs += purchase.value;
    }

    return totalOutputs;
  }
}

import { StockGroup } from "../entities/StockGroup";

import { StockRepository } from "../repositories/StockRepository";

import { pieceAlreadyExists } from "../validators/pieceAlreadyExists";

export class InsertStock {
  constructor(private stockRepository: StockRepository) {}

  async exec(
    pieceCode: number,
    quantity: number
  ): Promise<StockGroup[] | Error> {
    const stockGroups = await this.stockRepository.list();

    if (stockGroups != null) {
      const allParts = stockGroups.flatMap((group) => group.partsStock);

      const pieceExists = pieceAlreadyExists(pieceCode, allParts);

      if (pieceExists) {
        const isValidInsertion = quantity >= 1 && Number.isInteger(quantity);

        if (isValidInsertion) {
          const editedStockGroups = this.stockRepository.insertStock(
            pieceCode,
            quantity
          );

          if (!(editedStockGroups instanceof Error)) {
            return editedStockGroups;
          }

          return Error("It was not possible to insert stock");
        }

        return Error("The quantity is invalid for insertion");
      }

      return Error("The part is invalid for insertion");
    }

    return Error("It was not possible to insert stock");
  }
}

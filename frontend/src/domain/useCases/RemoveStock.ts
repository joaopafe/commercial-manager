import { StockGroup } from "../entities/StockGroup";

import { StockRepository } from "../repositories/StockRepository";

import { pieceAlreadyExists } from "../validators/pieceAlreadyExists";

export class RemoveStock {
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
        const editedPiece = allParts.find((piece) => piece.code === pieceCode);

        if (editedPiece) {
          const isValidRemotion =
            quantity <= editedPiece?.quantity && Number.isInteger(quantity);

          if (isValidRemotion) {
            const editedStockGroups = this.stockRepository.removeStock(
              pieceCode,
              quantity
            );

            if (!(editedStockGroups instanceof Error)) {
              return editedStockGroups;
            }

            return Error("It was not possible to remove stock");
          }

          return Error("The quantity is invalid for remotion");
        }
      }

      return Error("The part is invalid for remotion");
    }

    return Error("It was not possible to remove stock");
  }
}

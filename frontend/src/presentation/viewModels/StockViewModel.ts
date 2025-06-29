import { GetStockGroup } from "../../domain/useCases/GetStockGroup";
import { InsertStock } from "../../domain/useCases/InsertStock";
import { RemoveStock } from "../../domain/useCases/RemoveStock";

import { StockGroup } from "../../domain/entities/StockGroup";

export interface StockState {
  partsStockCategories: StockGroup[] | null;

  isSearching: boolean;
  isInsertingStock: boolean;
  isRemovingStock: boolean;

  isPartsStockCategoriesNotFound: boolean;
  isErrorInStockInsertion: boolean;
  isErrorInStockRemotion: boolean;

  pieceCode: number;
  insertionField: number;
  remotionField: number;
  totalQuantity: number;

  insertionAllowed: boolean;
  remotionAllowed: boolean;

  showEntryStockModal: boolean;
  showOutputStockModal: boolean;

  errorMessage: string | null;
}

export type StockStateListener = (state: StockState) => void;

export class StockViewModel {
  constructor(
    private getStockGroupUseCase: GetStockGroup,
    private insertStockUseCase: InsertStock,
    private removeStockUseCase: RemoveStock
  ) {}

  private _state: StockState = {
    partsStockCategories: null,

    isSearching: false,
    isInsertingStock: false,
    isRemovingStock: false,

    isPartsStockCategoriesNotFound: false,
    isErrorInStockInsertion: false,
    isErrorInStockRemotion: false,

    pieceCode: 1,
    insertionField: 0,
    remotionField: 0,
    totalQuantity: 0,

    insertionAllowed: false,
    remotionAllowed: false,

    showEntryStockModal: false,
    showOutputStockModal: false,

    errorMessage: null,
  };

  get state(): StockState {
    return this._state;
  }

  stateListener: StockStateListener | null = null;

  private updateState(newState: StockState) {
    this._state = newState;

    this.stateListener?.(this._state);
  }

  async getStock() {
    this.updateState({
      ...this._state,
      isSearching: true,
    });

    const partsStockCategories = await this.getStockGroupUseCase.exec();

    if (partsStockCategories === null) {
      this.updateState({
        ...this._state,
        partsStockCategories: null,
        isSearching: false,
        isPartsStockCategoriesNotFound: true,
      });
    }

    if (partsStockCategories) {
      this.updateState({
        ...this._state,
        partsStockCategories,
        isSearching: false,
        isPartsStockCategoriesNotFound: false,
      });
    }
  }

  async insertStock(pieceCode: number, quantity: number) {
    this.updateState({
      ...this._state,
      isInsertingStock: true,
      isErrorInStockInsertion: false,
    });

    const stockInsertion = await this.insertStockUseCase.exec(
      pieceCode,
      quantity
    );

    if (stockInsertion instanceof Error) {
      this.updateState({
        ...this._state,
        isInsertingStock: false,
        isErrorInStockInsertion: true,
        errorMessage: stockInsertion.message,
      });
    }

    if (!(stockInsertion instanceof Error)) {
      this.updateState({
        ...this._state,
        isInsertingStock: false,
        isErrorInStockInsertion: false,
        errorMessage: null,
      });

      this.closeModal();

      await this.getStock();
    }
  }

  async remotionStock(pieceCode: number, quantity: number) {
    this.updateState({
      ...this._state,
      isRemovingStock: true,
      isErrorInStockRemotion: false,
    });

    const stockRemotion = await this.removeStockUseCase.exec(
      pieceCode,
      quantity
    );

    if (stockRemotion instanceof Error) {
      this.updateState({
        ...this._state,
        isRemovingStock: false,
        isErrorInStockRemotion: true,
        errorMessage: stockRemotion.message,
      });
    }

    if (!(stockRemotion instanceof Error)) {
      this.updateState({
        ...this._state,
        isRemovingStock: false,
        isErrorInStockRemotion: false,
        errorMessage: null,
      });

      this.closeModal();

      await this.getStock();
    }
  }

  changePieceCode(pieceCode: number) {
    this.updateState({
      ...this._state,
      pieceCode,
    });
  }

  changeTotalQuantity(totalQuantity: number) {
    this.updateState({
      ...this._state,
      totalQuantity,
    });
  }

  changeInsertionField(insertion: number) {
    const insertionField = insertion >= 0 ? Math.floor(insertion) : 0;

    this.updateState({
      ...this._state,
      insertionField,
    });

    this.allowInsertion(insertionField);
  }

  changeRemotionField(remotionQuantity: number, totalQuantity: number) {
    let remotionField =
      remotionQuantity >= 0 ? Math.floor(remotionQuantity) : 0;

    remotionField =
      remotionField > totalQuantity ? totalQuantity : remotionField;

    this.updateState({
      ...this._state,
      remotionField,
    });

    this.allowRemotion(remotionField, totalQuantity);
  }

  allowInsertion(insertionField: number) {
    const allowInsertion =
      insertionField >= 1 && Number.isInteger(insertionField);

    this.updateState({
      ...this._state,
      insertionAllowed: allowInsertion,
    });
  }

  allowRemotion(remotionQuantity: number, totalQuantity: number) {
    const allowRemotion =
      remotionQuantity >= 1 &&
      Number.isInteger(remotionQuantity) &&
      remotionQuantity <= totalQuantity;

    this.updateState({
      ...this._state,
      remotionAllowed: allowRemotion,
    });
  }

  openModal(isEntryStockModal: boolean) {
    if (isEntryStockModal) {
      this.updateState({
        ...this._state,
        insertionField: 0,
        insertionAllowed: false,
        showEntryStockModal: true,
        showOutputStockModal: false,
      });
    }

    if (!isEntryStockModal) {
      this.updateState({
        ...this._state,
        remotionField: 0,
        remotionAllowed: false,
        showEntryStockModal: false,
        showOutputStockModal: true,
      });
    }
  }

  closeModal() {
    this.updateState({
      ...this._state,
      showEntryStockModal: false,
      showOutputStockModal: false,
    });
  }
}

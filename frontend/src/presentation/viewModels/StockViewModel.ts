import { GetStockGroup } from "../../domain/useCases/GetStockGroup";
import { InsertStock } from "../../domain/useCases/InsertStock";

import { StockGroup } from "../../domain/entities/StockGroup";

export interface StockState {
  partsStockCategories: StockGroup[] | null;

  isSearching: boolean;
  isInsertingStock: boolean;

  isPartsStockCategoriesNotFound: boolean;
  isErrorInStockInsertion: boolean;

  pieceCode: number;
  insertionField: number;

  insertionAllowed: boolean;

  showEntryStockModal: boolean;
  showOutputStockModal: boolean;

  errorMessage: string | null;
}

export type StockStateListener = (state: StockState) => void;

export class StockViewModel {
  constructor(
    private getStockGroupUseCase: GetStockGroup,
    private insertStockUseCase: InsertStock
  ) {}

  private _state: StockState = {
    partsStockCategories: null,

    isSearching: false,
    isInsertingStock: false,

    isPartsStockCategoriesNotFound: false,
    isErrorInStockInsertion: false,

    pieceCode: 1,
    insertionField: 0,

    insertionAllowed: false,

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

  changePieceCode(pieceCode: number) {
    console.log("chamou a porra da alteração de código de peça");

    console.log("A merda do código informado:", pieceCode);

    this.updateState({
      ...this._state,
      pieceCode,
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

  allowInsertion(insertionField: number) {
    const allowInsertion =
      insertionField >= 1 && Number.isInteger(insertionField);

    this.updateState({
      ...this._state,
      insertionAllowed: allowInsertion,
    });
  }

  openModal(isEntryStockModal: boolean) {
    if (isEntryStockModal) {
      this.updateState({
        ...this._state,
        showEntryStockModal: true,
        showOutputStockModal: false,
      });
    }

    if (!isEntryStockModal) {
      this.updateState({
        ...this._state,
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

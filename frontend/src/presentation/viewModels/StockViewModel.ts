import { GetStockGroup } from "../../domain/useCases/GetStockGroup";

import { StockGroup } from "../../domain/entities/StockGroup";

export interface StockState {
  partsStockCategories: StockGroup[] | null;
  isSearching: boolean;
  isPartsStockCategoriesNotFound: boolean;
  showEntryStockModal: boolean;
  showOutputStockModal: boolean;
}

export type StockStateListener = (state: StockState) => void;

export class StockViewModel {
  constructor(private getStockGroupUseCase: GetStockGroup) {}

  private _state: StockState = {
    partsStockCategories: null,
    isSearching: false,
    isPartsStockCategoriesNotFound: false,
    showEntryStockModal: false,
    showOutputStockModal: false,
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

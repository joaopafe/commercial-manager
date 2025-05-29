import { SaleRepository } from "../../domain/data/SaleRepository";
import { TodaySalesRepository } from "../../domain/data/TodaySalesRepository";
import { TotalInCashRepository } from "../../domain/data/TotalInCashRepository";

export interface Sale {
  clientName: string;
  value: number;
  date: string;
}

export interface HomeViewState {
  todaySales: number | null;
  totalInCash: number | null;
  latestSales: Sale[] | null;
  isSearching: boolean;
  isSalesNotFound: boolean;
  isTotalInCashNotFound: boolean;
  isLatestSalesNotFound: boolean;
}

export type HomeViewStateListener = (state: HomeViewState) => void;

export class HomeViewModel {
  constructor(
    private todaySalesRepository: TodaySalesRepository,
    private totalInCashRepository: TotalInCashRepository,
    private saleRepository: SaleRepository
  ) {}

  private _state: HomeViewState = {
    todaySales: null,
    totalInCash: null,
    latestSales: null,
    isSearching: false,
    isSalesNotFound: false,
    isTotalInCashNotFound: false,
    isLatestSalesNotFound: false,
  };

  get state(): HomeViewState {
    return this._state;
  }

  stateListener: HomeViewStateListener | null = null;

  private updateState(newState: HomeViewState) {
    this._state = newState;

    this.stateListener?.(this._state);
  }

  async getTodaySales() {
    this.updateState({
      ...this._state,
      isSearching: true,
    });

    const todaySales = await this.todaySalesRepository.getTodaySales();

    if (todaySales === null) {
      this.updateState({
        ...this._state,
        isSearching: false,
        isSalesNotFound: true,
        todaySales: null,
      });
    }

    if (todaySales) {
      this.updateState({
        ...this._state,
        isSearching: false,
        isSalesNotFound: false,
        todaySales,
      });
    }
  }

  async getTotalInCash() {
    this.updateState({
      ...this._state,
      isSearching: true,
      isTotalInCashNotFound: false,
      totalInCash: null,
    });

    const totalInCash = await this.totalInCashRepository.getTotalInCash();

    if (totalInCash === null) {
      this.updateState({
        ...this._state,
        isSearching: false,
        isTotalInCashNotFound: true,
        totalInCash: null,
      });
    }

    if (totalInCash) {
      this.updateState({
        ...this._state,
        isSearching: false,
        isTotalInCashNotFound: false,
        totalInCash,
      });
    }
  }

  async getLatestSales() {
    this.updateState({
      ...this._state,
      isSearching: true,
      isLatestSalesNotFound: false,
      latestSales: null,
    });

    const latestSales = await this.saleRepository.listLatest();

    if (latestSales === null || latestSales.length === 0) {
      this.updateState({
        ...this._state,
        isSearching: false,
        isLatestSalesNotFound: true,
        latestSales: null,
      });
    }

    if (latestSales && latestSales.length > 0) {
      const latestSalesFormatted: Sale[] = latestSales.map((sale) => {
        return {
          clientName: sale.clientName,
          value: sale.value,
          date: sale.date.toLocaleDateString(),
        };
      });

      this.updateState({
        ...this._state,
        isSearching: false,
        isLatestSalesNotFound: false,
        latestSales: latestSalesFormatted,
      });
    }
  }
}

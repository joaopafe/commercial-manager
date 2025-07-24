import { GetTotalInCash } from "../../domain/useCases/GetTotalInCash";
import { GetAllSales } from "../../domain/useCases/GetAllSales";
import { GetTodaySales } from "../../domain/useCases/GetTodaySales";
import { GetLatestSales } from "../../domain/useCases/GetLatestSales";
import { GetAllPurchases } from "../../domain/useCases/GetAllPurchases";

import { TodaySales } from "../../domain/entities/TodaySales";
import { TotalInCash } from "../../domain/entities/TotalInCash";
import { GeneralSale } from "../../domain/entities/GeneralSale";
export interface HomeViewState {
  todaySales: TodaySales | null;
  totalInCash: TotalInCash | null;
  latestSales: GeneralSale[] | null;

  isSearchingTodaySales: boolean;
  isSearchingTotalInCash: boolean;
  isSearchingLatestSales: boolean;

  isTodaySalesNotFound: boolean;
  isTotalInCashNotFound: boolean;
  isLatestSalesNotFound: boolean;
}

export type HomeViewStateListener = (state: HomeViewState) => void;

export class HomeViewModel {
  constructor(
    private getTotalInCashUseCase: GetTotalInCash,
    private getAllSalesUseCase: GetAllSales,
    private getTodaySalesUseCase: GetTodaySales,
    private getLatestSalesUseCase: GetLatestSales,
    private getAllPurchasesUseCase: GetAllPurchases
  ) {}

  private _state: HomeViewState = {
    todaySales: null,
    latestSales: null,
    totalInCash: null,

    isSearchingTodaySales: false,
    isSearchingLatestSales: false,
    isSearchingTotalInCash: false,

    isTodaySalesNotFound: false,
    isLatestSalesNotFound: false,
    isTotalInCashNotFound: false,
  };

  get state(): HomeViewState {
    return this._state;
  }

  stateListener: HomeViewStateListener | null = null;

  private updateState(newState: HomeViewState) {
    this._state = newState;

    this.stateListener?.(this._state);
  }

  async getAllInformations() {
    this.updateState({
      ...this._state,
      isSearchingTodaySales: true,
      isSearchingLatestSales: true,
      isSearchingTotalInCash: true,
      isTodaySalesNotFound: false,
      isLatestSalesNotFound: false,
      isTotalInCashNotFound: false,
    });

    const allSales = await this.getAllSalesUseCase.exec();

    if (allSales instanceof Error) {
      this.updateState({
        ...this._state,
        isSearchingTodaySales: false,
        isSearchingLatestSales: false,
        isSearchingTotalInCash: false,
        isTodaySalesNotFound: true,
        isLatestSalesNotFound: true,
        isTotalInCashNotFound: true,
      });
    }

    if (!(allSales instanceof Error)) {
      const todaySales = this.getTodaySalesUseCase.exec(allSales);
      const latestSales = this.getLatestSalesUseCase.exec(allSales);

      const purchases = await this.getAllPurchasesUseCase.exec();

      if (purchases instanceof Error) {
        this.updateState({
          ...this._state,
          isSearchingTotalInCash: false,
          isTotalInCashNotFound: true,
        });
      }

      if (!(purchases instanceof Error)) {
        const totalInCash = await this.getTotalInCashUseCase.exec(
          allSales,
          purchases
        );

        this.updateState({
          ...this._state,
          todaySales,
          latestSales,
          totalInCash,
          isSearchingTodaySales: false,
          isSearchingTotalInCash: false,
          isSearchingLatestSales: false,
          isTodaySalesNotFound: false,
          isLatestSalesNotFound: false,
          isTotalInCashNotFound: false,
        });
      }
    }
  }
}

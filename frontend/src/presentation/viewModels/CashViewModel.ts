import { GetAllCashRegisters } from "../../domain/useCases/GetAllCashRegisters";
import { GetAllPurchases } from "../../domain/useCases/GetAllPurchases";
import { GetAllSales } from "../../domain/useCases/GetAllSales";
import { GetTotalOutputs } from "../../domain/useCases/GetTotalOutputs";
import { GetTotalEntries } from "../../domain/useCases/GetTotalEntries";
import { GetTotalInCash } from "../../domain/useCases/GetTotalInCash";

import { CashRegister } from "../../domain/entities/CashRegister";
import { GeneralPurchase } from "../../domain/entities/GeneralPurchase";
import { GeneralSale } from "../../domain/entities/GeneralSale";
import { TotalInCash } from "../../domain/entities/TotalInCash";

import { delay } from "../../shared/utils/delay";

export interface CashViewState {
  allRegisters: CashRegister[] | null;
  allPurchases: GeneralPurchase[] | null;
  allSales: GeneralSale[] | null;
  totalOutputs: number | null;
  totalEntries: number | null;
  totalInCash: TotalInCash | null;

  isSearchingAllRegisters: boolean;
  isSearchingAllPurchases: boolean;
  isSearchingAllSales: boolean;
  isSearchingTotalOutputs: boolean;
  isSearchingTotalEntries: boolean;
  isSearchingTotalInCash: boolean;

  isAllRegistersNotFound: boolean;
  isAllPurchasesNotFound: boolean;
  isAllSalesNotFound: boolean;
  isTotalOutputsNotFound: boolean;
  isTotalEntriesNotFound: boolean;
  isTotalInCashNotFound: boolean;

  showToast: boolean;
  toastStatus: "success" | "error";
  message: string;
}

export type CashViewStateListener = (state: CashViewState) => void;

export class CashViewModel {
  constructor(
    private getAllCashRegistersUseCase: GetAllCashRegisters,
    private getAllPurchasesUseCase: GetAllPurchases,
    private getAllSalesUseCase: GetAllSales,
    private getTotalOutputsUseCase: GetTotalOutputs,
    private getTotalEntriesUseCase: GetTotalEntries,
    private getTotalInCashUseCase: GetTotalInCash
  ) {}

  private _state: CashViewState = {
    allRegisters: null,
    allPurchases: null,
    allSales: null,
    totalOutputs: null,
    totalEntries: null,
    totalInCash: null,

    isSearchingAllRegisters: false,
    isSearchingAllPurchases: false,
    isSearchingAllSales: false,
    isSearchingTotalOutputs: false,
    isSearchingTotalEntries: false,
    isSearchingTotalInCash: false,

    isAllRegistersNotFound: false,
    isAllPurchasesNotFound: false,
    isAllSalesNotFound: false,
    isTotalOutputsNotFound: false,
    isTotalEntriesNotFound: false,
    isTotalInCashNotFound: false,

    showToast: false,
    toastStatus: "success",
    message: "",
  };

  get state(): CashViewState {
    return this._state;
  }

  stateListener: CashViewStateListener | null = null;

  private updateState(newState: CashViewState) {
    this._state = newState;

    this.stateListener?.(this._state);
  }

  async getAllInformations() {
    this.updateState({
      ...this._state,
      isSearchingAllRegisters: true,
      isSearchingAllPurchases: true,
      isSearchingAllSales: true,
      isSearchingTotalOutputs: true,
      isSearchingTotalEntries: true,
      isSearchingTotalInCash: true,
      isAllRegistersNotFound: false,
      isAllPurchasesNotFound: false,
      isAllSalesNotFound: false,
      isTotalOutputsNotFound: false,
      isTotalEntriesNotFound: false,
      isTotalInCashNotFound: false,
    });

    const allSales = await this.getAllSalesUseCase.exec();
    const allPurchases = await this.getAllPurchasesUseCase.exec();

    if (allSales instanceof Error || allPurchases instanceof Error) {
      this.updateState({
        ...this._state,
        isSearchingAllRegisters: false,
        isSearchingAllPurchases: false,
        isSearchingAllSales: false,
        isSearchingTotalOutputs: false,
        isSearchingTotalEntries: false,
        isSearchingTotalInCash: false,
        isAllRegistersNotFound: true,
        isAllPurchasesNotFound: true,
        isAllSalesNotFound: true,
        isTotalOutputsNotFound: true,
        isTotalEntriesNotFound: true,
        isTotalInCashNotFound: true,
        message: "It was not possible to get the informations",
      });

      await this.showToast(this._state.message, "error");
    }

    if (!(allSales instanceof Error) && !(allPurchases instanceof Error)) {
      const allRegisters = this.getAllCashRegistersUseCase.exec(
        allPurchases,
        allSales
      );
      const totalOutputs = this.getTotalOutputsUseCase.exec(allPurchases);
      const totalEntries = this.getTotalEntriesUseCase.exec(allSales);
      const totalInCash = await this.getTotalInCashUseCase.exec(
        allSales,
        allPurchases
      );

      this.updateState({
        ...this._state,
        allRegisters,
        allPurchases,
        allSales,
        totalOutputs,
        totalEntries,
        totalInCash,
        isSearchingAllRegisters: false,
        isSearchingAllPurchases: false,
        isSearchingAllSales: false,
        isSearchingTotalOutputs: false,
        isSearchingTotalEntries: false,
        isSearchingTotalInCash: false,
        isAllRegistersNotFound: false,
        isAllPurchasesNotFound: false,
        isAllSalesNotFound: false,
        isTotalOutputsNotFound: false,
        isTotalEntriesNotFound: false,
        isTotalInCashNotFound: false,
      });
    }
  }

  async showToast(message: string, status: "success" | "error") {
    this.updateState({
      ...this._state,
      showToast: true,
      toastStatus: status,
      message,
    });

    await delay(2_000);

    this.updateState({
      ...this._state,
      showToast: false,
    });
  }
}

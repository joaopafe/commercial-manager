import { GetServiceSales } from "../../domain/useCases/GetServiceSales";
import { GetCustomers } from "../../domain/useCases/GetCustomers";

import { ServiceSale } from "../../domain/entities/ServiceSale";
import { Customer } from "../../domain/entities/Customer";

import { delay } from "../../shared/utils/delay";

export interface ServiceSalesState {
  serviceSales: ServiceSale[] | null;
  customers: Customer[] | null;

  isSearchingServiceSales: boolean;
  isSearchingCustomers: boolean;

  isServiceSalesNotFound: boolean;
  isCustomersNotFound: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;

  // Implements the field states
  customerField: string;
  customerCode: number;

  // Implement the allowedCreateSale

  showToast: boolean;
  toastStatus: "success" | "error";
  message: string;
}

export type ServiceSalesStateListener = (state: ServiceSalesState) => void;

export class ServiceSalesViewModel {
  constructor(
    private getServiceSalesUseCase: GetServiceSales,
    private getCustomersUseCase: GetCustomers
  ) {}

  private _state: ServiceSalesState = {
    serviceSales: null,
    customers: null,

    isSearchingServiceSales: false,
    isSearchingCustomers: false,

    isServiceSalesNotFound: false,
    isCustomersNotFound: false,

    showCreateModal: false,
    showEditModal: false,

    customerField: "",
    customerCode: 1,

    showToast: false,
    toastStatus: "success",
    message: "",
  };

  get state(): ServiceSalesState {
    return this._state;
  }

  stateListener: ServiceSalesStateListener | null = null;

  private updateState(newState: ServiceSalesState) {
    this._state = newState;
    this.stateListener?.(this._state);
  }

  async getServiceSales() {
    this.updateState({
      ...this._state,
      isSearchingServiceSales: true,
      isServiceSalesNotFound: false,
    });

    const serviceSales = await this.getServiceSalesUseCase.exec();

    if (serviceSales === null) {
      this.updateState({
        ...this._state,
        isSearchingServiceSales: false,
        isServiceSalesNotFound: true,
      });
    }

    if (serviceSales) {
      this.updateState({
        ...this._state,
        serviceSales,
        isSearchingServiceSales: false,
        isServiceSalesNotFound: false,
      });
    }
  }

  async getCustomers() {
    this.updateState({
      ...this._state,
      isSearchingCustomers: true,
      isCustomersNotFound: false,
    });

    const customers = await this.getCustomersUseCase.exec();

    if (customers === null) {
      this.updateState({
        ...this._state,
        isSearchingCustomers: false,
        isCustomersNotFound: true,
      });

      await this.showToast("It was not possible to get the customers", "error");
    }

    if (customers) {
      this.updateState({
        ...this._state,
        customers,
        isSearchingCustomers: false,
        isCustomersNotFound: false,
      });
    }
  }

  changeCustomerField(customer: string) {
    this.updateState({
      ...this._state,
      customerField: customer,
    });
  }

  changeCustomerCode(customer: number) {
    this.updateState({
      ...this._state,
      customerCode: customer,
    });
  }

  openModal(isCreateModal: boolean) {
    if (isCreateModal) {
      this.updateState({
        ...this._state,
        showCreateModal: true,
        showEditModal: false,
      });
    }

    if (!isCreateModal) {
      this.updateState({
        ...this._state,
        showCreateModal: false,
        showEditModal: true,
      });
    }
  }

  closeModal() {
    this.updateState({
      ...this._state,
      showCreateModal: false,
      showEditModal: false,
    });
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

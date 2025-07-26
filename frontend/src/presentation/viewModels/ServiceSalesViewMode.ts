import { GetServiceSales } from "../../domain/useCases/GetServiceSales";
import { GetCustomers } from "../../domain/useCases/GetCustomers";
import { CreateServiceSale } from "../../domain/useCases/CreateServiceSale";
import { EditServiceSale } from "../../domain/useCases/EditServiceSale";

import { ServiceSale } from "../../domain/entities/ServiceSale";
import { AddServiceSaleParams } from "../../domain/useCases/CreateServiceSale";
import { Customer } from "../../domain/entities/Customer";

import { delay } from "../../shared/utils/delay";

export interface ServiceSalesState {
  serviceSales: ServiceSale[] | null;
  customers: Customer[] | null;

  isSearchingServiceSales: boolean;
  isSearchingCustomers: boolean;
  isCreatingServiceSale: boolean;
  isEditingServiceSale: boolean;

  isServiceSalesNotFound: boolean;
  isCustomersNotFound: boolean;
  isErrorInServiceSaleRegistration: boolean;
  isErrorInServiceSaleEdition: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;

  serviceSaleCode: number;
  customerField: string;
  customerCode: number;
  descriptionField: string;
  valueField: number;
  dateField: string;

  allowedToCreateServiceSale: boolean;

  showToast: boolean;
  toastStatus: "success" | "error";
  message: string;
}

export type ServiceSalesStateListener = (state: ServiceSalesState) => void;

export class ServiceSalesViewModel {
  constructor(
    private getServiceSalesUseCase: GetServiceSales,
    private getCustomersUseCase: GetCustomers,
    private createServiceSaleUseCase: CreateServiceSale,
    private editServiceSaleUseCase: EditServiceSale
  ) {}

  private _state: ServiceSalesState = {
    serviceSales: null,
    customers: null,

    isSearchingServiceSales: false,
    isSearchingCustomers: false,
    isCreatingServiceSale: false,
    isEditingServiceSale: false,

    isServiceSalesNotFound: false,
    isCustomersNotFound: false,
    isErrorInServiceSaleRegistration: false,
    isErrorInServiceSaleEdition: false,

    showCreateModal: false,
    showEditModal: false,

    serviceSaleCode: 1,
    customerField: "",
    customerCode: 1,
    descriptionField: "",
    valueField: 0,
    dateField: "",

    allowedToCreateServiceSale: false,

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

  async createServiceSale(serviceSale: AddServiceSaleParams) {
    this.updateState({
      ...this._state,
      isCreatingServiceSale: true,
      isErrorInServiceSaleRegistration: false,
    });

    const registeredServiceSale = await this.createServiceSaleUseCase.exec(
      serviceSale
    );

    if (registeredServiceSale instanceof Error) {
      this.updateState({
        ...this._state,
        isCreatingServiceSale: false,
        isErrorInServiceSaleRegistration: true,
        message: registeredServiceSale.message,
      });

      await this.showToast(registeredServiceSale.message, "error");
    }

    if (!(registeredServiceSale instanceof Error)) {
      this.updateState({
        ...this._state,
        isCreatingServiceSale: false,
        isErrorInServiceSaleRegistration: false,
        message: "",
      });

      this.closeModal();

      await this.getServiceSales();

      await this.showToast("Service sale successfully create", "success");
    }
  }

  async editServiceSale(serviceSale: ServiceSale) {
    this.updateState({
      ...this._state,
      isEditingServiceSale: true,
      isErrorInServiceSaleEdition: false,
    });

    const editedServiceSale = await this.editServiceSaleUseCase.exec(
      serviceSale
    );

    if (editedServiceSale instanceof Error) {
      this.updateState({
        ...this._state,
        isEditingServiceSale: false,
        isErrorInServiceSaleEdition: true,
        message: editedServiceSale.message,
      });

      await this.showToast(this._state.message, "error");
    }

    if (!(editedServiceSale instanceof Error)) {
      this.updateState({
        ...this._state,
        isEditingServiceSale: false,
        isErrorInServiceSaleEdition: false,
        message: "Service sale successfully edited",
      });

      this.closeModal();

      await this.getServiceSales();

      await this.showToast(this._state.message, "success");
    }
  }

  changeServiceSaleCode(serviceSaleCode: number) {
    this.updateState({
      ...this._state,
      serviceSaleCode,
    });
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

  changeDescriptionField(description: string) {
    this.updateState({
      ...this._state,
      descriptionField: description,
    });

    const serviceSaleFields = {
      description: this._state.descriptionField,
      value: this._state.valueField,
      date: this._state.dateField,
    };

    this.allowServiceSaleCreation(serviceSaleFields);
  }

  changeValueField(value: number) {
    if (value >= 0) {
      this.updateState({
        ...this._state,
        valueField: value,
      });

      const serviceSaleFields = {
        description: this._state.descriptionField,
        value: this._state.valueField,
        date: this._state.dateField,
      };

      this.allowServiceSaleCreation(serviceSaleFields);
    }
  }

  changeDateField(date: string) {
    const formattedDate = new Date(date);

    const dateField = !isNaN(formattedDate.getTime()) ? date : "";

    this.updateState({
      ...this._state,
      dateField,
    });

    const serviceSaleFields = {
      description: this._state.descriptionField,
      value: this._state.valueField,
      date: this._state.dateField,
    };

    this.allowServiceSaleCreation(serviceSaleFields);
  }

  allowServiceSaleCreation(serviceSaleFields: {
    description: string;
    value: number;
    date: string;
  }) {
    const isValidDate = !isNaN(new Date(serviceSaleFields.date).getTime());

    const allowServiceSaleCreation =
      serviceSaleFields.description.length >= 3 &&
      serviceSaleFields.value >= 0 &&
      isValidDate;

    this.updateState({
      ...this._state,
      allowedToCreateServiceSale: allowServiceSaleCreation,
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

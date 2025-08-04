import { GetServicePurchases } from "../../domain/useCases/GetServicePurchases";
import { GetSuppliers } from "../../domain/useCases/GetSuppliers";
import { CreateServicePurchase } from "../../domain/useCases/CreateServicePurchase";
import { EditServicePurchase } from "../../domain/useCases/EditServicePurchase";
import { RemoveServicePurchase } from "../../domain/useCases/RemoveServicePurchase";

import { ServicePurchase } from "../../domain/entities/ServicePurchase";
import { Supplier } from "../../domain/entities/Supplier";
import { AddServicePurchaseParams } from "../../domain/useCases/CreateServicePurchase";

import { delay } from "../../shared/utils/delay";

export interface ServicePurchasesState {
  servicePurchases: ServicePurchase[] | null;
  suppliers: Supplier[] | null;

  isSearchingServicePurchases: boolean;
  isSearchingSuppliers: boolean;
  isCreatingServicePurchase: boolean;
  isEditingServicePurchase: boolean;
  isRemovingServicePurchase: boolean;

  isServicePurchasesNotFound: boolean;
  isSuppliersNotFound: boolean;
  isErrorInServicePurchaseRegistration: boolean;
  isErrorInServicePurchaseEdition: boolean;
  isErrorInServicePurchaseRemotion: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;

  servicePurchaseCode: number;
  supplierField: string;
  supplierCode: number;
  descriptionField: string;
  valueField: number;
  dateField: string;

  allowedToCreateServicePurchase: boolean;

  showToast: boolean;
  toastStatus: "success" | "error";
  message: string;
}

export type ServicePurchasesStateListener = (
  state: ServicePurchasesState
) => void;

export class ServicePurchasesViewModel {
  constructor(
    private getServicePurchasesUseCase: GetServicePurchases,
    private getSuppliersUseCase: GetSuppliers,
    private createServicePurchaseUseCase: CreateServicePurchase,
    private editServicePurchaseUseCase: EditServicePurchase,
    private removeServicePurchaseUseCase: RemoveServicePurchase
  ) {}

  private _state: ServicePurchasesState = {
    servicePurchases: null,
    suppliers: null,

    isSearchingServicePurchases: false,
    isSearchingSuppliers: false,
    isCreatingServicePurchase: false,
    isEditingServicePurchase: false,
    isRemovingServicePurchase: false,

    isServicePurchasesNotFound: false,
    isSuppliersNotFound: false,
    isErrorInServicePurchaseRegistration: false,
    isErrorInServicePurchaseEdition: false,
    isErrorInServicePurchaseRemotion: false,

    showCreateModal: false,
    showEditModal: false,

    servicePurchaseCode: 1,
    supplierField: "",
    supplierCode: 1,
    descriptionField: "",
    valueField: 0,
    dateField: "",

    allowedToCreateServicePurchase: false,

    showToast: false,
    toastStatus: "success",
    message: "",
  };

  get state(): ServicePurchasesState {
    return this._state;
  }

  stateListener: ServicePurchasesStateListener | null = null;

  private updateState(newState: ServicePurchasesState) {
    this._state = newState;
    this.stateListener?.(this._state);
  }

  async getServicePurchases() {
    this.updateState({
      ...this._state,
      isSearchingServicePurchases: true,
      isServicePurchasesNotFound: false,
    });

    const servicePurchases = await this.getServicePurchasesUseCase.exec();

    if (servicePurchases === null) {
      this.updateState({
        ...this._state,
        isSearchingServicePurchases: false,
        isServicePurchasesNotFound: true,
      });
    }

    if (servicePurchases) {
      this.updateState({
        ...this._state,
        servicePurchases,
        isSearchingServicePurchases: false,
        isServicePurchasesNotFound: false,
      });
    }
  }

  async getSuppliers() {
    this.updateState({
      ...this._state,
      isSearchingSuppliers: true,
      isSuppliersNotFound: false,
    });

    const suppliers = await this.getSuppliersUseCase.exec();

    if (suppliers === null) {
      this.updateState({
        ...this._state,
        isSearchingSuppliers: false,
        isSuppliersNotFound: true,
      });

      await this.showToast("It was not possible to get the suppliers", "error");
    }

    if (suppliers) {
      this.updateState({
        ...this._state,
        suppliers,
        isSearchingSuppliers: false,
        isSuppliersNotFound: false,
      });
    }
  }

  async createServicePurchase(servicePurchase: AddServicePurchaseParams) {
    this.updateState({
      ...this._state,
      isCreatingServicePurchase: true,
      isErrorInServicePurchaseRegistration: false,
    });

    const registeredServicePurchase =
      await this.createServicePurchaseUseCase.exec(servicePurchase);

    if (registeredServicePurchase instanceof Error) {
      this.updateState({
        ...this._state,
        isCreatingServicePurchase: false,
        isErrorInServicePurchaseRegistration: true,
        message: registeredServicePurchase.message,
      });

      await this.showToast(this._state.message, "error");
    }

    if (!(registeredServicePurchase instanceof Error)) {
      this.updateState({
        ...this._state,
        isCreatingServicePurchase: false,
        isErrorInServicePurchaseRegistration: false,
        message: "Service purchase successfully created",
      });

      this.closeModal();

      await this.getServicePurchases();

      await this.showToast(this._state.message, "success");
    }
  }

  async editServicePurchase(servicePurchase: ServicePurchase) {
    this.updateState({
      ...this._state,
      isEditingServicePurchase: true,
      isErrorInServicePurchaseEdition: false,
    });

    const editedServicePurchase = await this.editServicePurchaseUseCase.exec(
      servicePurchase
    );

    if (editedServicePurchase instanceof Error) {
      this.updateState({
        ...this._state,
        isEditingServicePurchase: false,
        isErrorInServicePurchaseEdition: true,
        message: editedServicePurchase.message,
      });

      await this.showToast(this._state.message, "error");
    }

    if (!(editedServicePurchase instanceof Error)) {
      this.updateState({
        ...this._state,
        isEditingServicePurchase: false,
        isErrorInServicePurchaseEdition: false,
        message: "Service purchase successfully edited",
      });

      this.closeModal();

      await this.getServicePurchases();

      await this.showToast(this._state.message, "success");
    }
  }

  async removeServicePurchase(servicePurchaseCode: number) {
    this.updateState({
      ...this._state,
      isRemovingServicePurchase: true,
      isErrorInServicePurchaseRemotion: false,
    });

    const removedServicePurchase = await this.removeServicePurchaseUseCase.exec(
      servicePurchaseCode
    );

    if (removedServicePurchase instanceof Error) {
      this.updateState({
        ...this._state,
        isRemovingServicePurchase: false,
        isErrorInServicePurchaseRemotion: true,
        message: removedServicePurchase.message,
      });

      await this.showToast(this._state.message, "error");
    }

    if (!(removedServicePurchase instanceof Error)) {
      this.updateState({
        ...this._state,
        isRemovingServicePurchase: false,
        isErrorInServicePurchaseRemotion: false,
        message: "Service purchase successfully deleted",
      });

      await this.getServicePurchases();

      await this.showToast(this._state.message, "success");
    }
  }

  changeServicePurchaseCode(servicePurchaseCode: number) {
    this.updateState({
      ...this._state,
      servicePurchaseCode,
    });
  }

  changeSupplierField(supplier: string) {
    this.updateState({
      ...this._state,
      supplierField: supplier,
    });
  }

  changeSupplierCode(supplier: number) {
    this.updateState({
      ...this._state,
      supplierCode: supplier,
    });
  }

  changeDescriptionField(description: string) {
    this.updateState({
      ...this._state,
      descriptionField: description,
    });

    const servicePurchaseFields = {
      description: this._state.descriptionField,
      value: this._state.valueField,
      date: this._state.dateField,
    };

    this.allowServicePurchaseCreation(servicePurchaseFields);
  }

  changeValueField(value: number) {
    if (value >= 0) {
      this.updateState({
        ...this._state,
        valueField: value,
      });

      const servicePurchaseFields = {
        description: this._state.descriptionField,
        value: this._state.valueField,
        date: this._state.dateField,
      };

      this.allowServicePurchaseCreation(servicePurchaseFields);
    }
  }

  changeDateField(date: string) {
    const formattedDate = new Date(date);

    const dateField = !isNaN(formattedDate.getTime()) ? date : "";

    this.updateState({
      ...this._state,
      dateField,
    });

    const servicePurchaseFields = {
      description: this._state.descriptionField,
      value: this._state.valueField,
      date: this._state.dateField,
    };

    this.allowServicePurchaseCreation(servicePurchaseFields);
  }

  allowServicePurchaseCreation(servicePurchaseFields: {
    description: string;
    value: number;
    date: string;
  }) {
    const isValidDate = !isNaN(new Date(servicePurchaseFields.date).getTime());

    const allowServicePurchaseCreation =
      servicePurchaseFields.description.length >= 3 &&
      servicePurchaseFields.value >= 0 &&
      isValidDate;

    this.updateState({
      ...this._state,
      allowedToCreateServicePurchase: allowServicePurchaseCreation,
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

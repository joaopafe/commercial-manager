import { GetSuppliers } from "../../domain/useCases/GetSuppliers";
import { CreateSupplier } from "../../domain/useCases/CreateSupplier";
import { EditSupplier } from "../../domain/useCases/EditSupplier";
import { RemoveSupplier } from "../../domain/useCases/RemoveSupplier";

import { Supplier } from "../../domain/entities/Supplier";
import { AddSupplierParams } from "../../domain/useCases/CreateSupplier";

import { delay } from "../../shared/utils/delay";

export interface SuppliersManagerState {
  suppliers: Supplier[] | null;

  isSearching: boolean;
  isCreatingSupplier: boolean;
  isEditingSupplier: boolean;
  isRemovingSupplier: boolean;

  isSuppliersNotFound: boolean;
  isErrorInSupplierRegistration: boolean;
  isErrorInSupplierEdition: boolean;
  isErrorInSupplierRemoval: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;

  supplierCode: number;
  cnpjField: string;
  nameField: string;
  phoneField: string;

  allowedToCreateSupplier: boolean;

  showToast: boolean;
  toastStatus: "success" | "error";
  message: string;
}

export type SuppliersManagerStateListener = (
  state: SuppliersManagerState
) => void;

export class SuppliersManagerViewModel {
  constructor(
    private getSuppliersUseCase: GetSuppliers,
    private createSupplierUseCase: CreateSupplier,
    private editSupplierUseCase: EditSupplier,
    private removeSupplierUseCase: RemoveSupplier
  ) {}

  private _state: SuppliersManagerState = {
    suppliers: null,

    isSearching: false,
    isCreatingSupplier: false,
    isEditingSupplier: false,
    isRemovingSupplier: false,

    isSuppliersNotFound: false,
    isErrorInSupplierRegistration: false,
    isErrorInSupplierEdition: false,
    isErrorInSupplierRemoval: false,

    showCreateModal: false,
    showEditModal: false,

    supplierCode: 1,
    cnpjField: "",
    nameField: "",
    phoneField: "",

    allowedToCreateSupplier: false,

    showToast: false,
    toastStatus: "success",
    message: "",
  };

  get state(): SuppliersManagerState {
    return this._state;
  }

  stateListener: SuppliersManagerStateListener | null = null;

  private updateState(newState: SuppliersManagerState) {
    this._state = newState;

    this.stateListener?.(this._state);
  }

  async getSuppliers() {
    this.updateState({
      ...this._state,
      isSearching: true,
      isSuppliersNotFound: false,
    });

    const suppliers = await this.getSuppliersUseCase.exec();

    if (suppliers === null) {
      this.updateState({
        ...this._state,
        suppliers: null,
        isSearching: false,
        isSuppliersNotFound: true,
      });
    }

    if (suppliers) {
      this.updateState({
        ...this._state,
        suppliers,
        isSearching: false,
        isSuppliersNotFound: false,
      });
    }
  }

  async createSupplier(supplier: AddSupplierParams) {
    this.updateState({
      ...this._state,
      isCreatingSupplier: true,
      isErrorInSupplierRegistration: false,
    });

    const registeredSupplier = await this.createSupplierUseCase.exec(supplier);

    if (registeredSupplier instanceof Error) {
      this.updateState({
        ...this._state,
        isCreatingSupplier: false,
        isErrorInSupplierRegistration: true,
        message: registeredSupplier.message,
      });

      await this.showToast(registeredSupplier.message, "error");
    }

    if (!(registeredSupplier instanceof Error)) {
      this.updateState({
        ...this._state,
        isCreatingSupplier: false,
        isErrorInSupplierRegistration: false,
        message: "",
      });

      this.closeModal();

      await this.getSuppliers();

      await this.showToast("Supplier successfully created", "success");
    }
  }

  async editSupplier(supplier: Supplier) {
    this.updateState({
      ...this._state,
      isEditingSupplier: true,
      isErrorInSupplierEdition: false,
    });

    const editedSupplier = await this.editSupplierUseCase.exec(supplier);

    if (editedSupplier instanceof Error) {
      this.updateState({
        ...this._state,
        isEditingSupplier: false,
        isErrorInSupplierEdition: true,
        message: editedSupplier.message,
      });

      await this.showToast(editedSupplier.message, "error");
    }

    if (!(editedSupplier instanceof Error)) {
      this.updateState({
        ...this._state,
        isEditingSupplier: false,
        isErrorInSupplierEdition: false,
        message: "",
      });

      this.closeModal();

      await this.getSuppliers();

      await this.showToast("Supplier successfully edited", "success");
    }
  }

  async removeSupplier(supplierCode: number) {
    this.updateState({
      ...this._state,
      isRemovingSupplier: true,
      isErrorInSupplierRemoval: false,
    });

    const removedSupplier = await this.removeSupplierUseCase.exec(supplierCode);

    if (removedSupplier instanceof Error) {
      this.updateState({
        ...this._state,
        isRemovingSupplier: false,
        isErrorInSupplierRemoval: true,
        message: removedSupplier.message,
      });

      await this.showToast(removedSupplier.message, "error");
    }

    if (!(removedSupplier instanceof Error)) {
      this.updateState({
        ...this._state,
        isRemovingSupplier: false,
        isErrorInSupplierRemoval: false,
        message: "",
      });

      await this.getSuppliers();

      await this.showToast("Supplier successfully deleted", "success");
    }
  }

  changeSupplierCNPJ(supplierCNPJ: string) {
    const supplierCNPJField = supplierCNPJ.replace(/[^0-9\/.\-]/g, "");

    this.updateState({
      ...this._state,
      cnpjField: supplierCNPJField,
    });

    const supplierFields = {
      cnpj: this._state.cnpjField,
      name: this._state.nameField,
      phone: this._state.phoneField,
    };

    this.allowSupplierCreation(supplierFields);
  }

  changeSupplierName(supplierName: string) {
    const supplierNameField = supplierName.trim();

    this.updateState({
      ...this._state,
      nameField: supplierNameField,
    });

    const supplierFields = {
      cnpj: this._state.cnpjField,
      name: this._state.nameField,
      phone: this._state.phoneField,
    };

    this.allowSupplierCreation(supplierFields);
  }

  changeSupplierPhone(supplierPhone: string) {
    const supplierPhoneField = supplierPhone.replace(/[^0-9()\-\s]/g, "");

    this.updateState({
      ...this._state,
      phoneField: supplierPhoneField,
    });

    const supplierFields = {
      cnpj: this._state.cnpjField,
      name: this._state.nameField,
      phone: this._state.phoneField,
    };

    this.allowSupplierCreation(supplierFields);
  }

  changeSupplierCode(supplierCode: number) {
    this.updateState({
      ...this._state,
      supplierCode,
    });
  }

  allowSupplierCreation(supplierFields: {
    cnpj: string;
    name: string;
    phone: string;
  }) {
    const allowSupplierCreation =
      supplierFields.cnpj.length >= 14 &&
      supplierFields.name.length >= 2 &&
      supplierFields.phone.length >= 10;

    this.updateState({
      ...this._state,
      allowedToCreateSupplier: allowSupplierCreation,
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

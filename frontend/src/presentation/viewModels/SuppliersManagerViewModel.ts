import { GetSuppliers } from "../../domain/useCases/GetSuppliers";

import { Supplier } from "../../domain/entities/Supplier";

export interface SuppliersManagerState {
  suppliers: Supplier[] | null;

  isSearching: boolean;

  isSuppliersNotFound: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;

  supplierCode: number;
  cnpjField: string;
  nameField: string;
  phoneField: string;

  allowedToCreateSupplier: boolean;

  errorMessage: string | null;
}

export type SuppliersManagerStateListener = (
  state: SuppliersManagerState
) => void;

export class SuppliersManagerViewModel {
  constructor(private getSuppliersUseCase: GetSuppliers) {}

  private _state: SuppliersManagerState = {
    suppliers: null,

    isSearching: false,

    isSuppliersNotFound: false,

    showCreateModal: false,
    showEditModal: false,

    supplierCode: 1,
    cnpjField: "",
    nameField: "",
    phoneField: "",

    allowedToCreateSupplier: false,

    errorMessage: null,
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
}

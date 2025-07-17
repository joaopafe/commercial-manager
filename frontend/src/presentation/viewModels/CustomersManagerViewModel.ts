import { GetCustomers } from "../../domain/useCases/GetCustomers";

import { Customer } from "../../domain/entities/Customer";

import { delay } from "../../shared/utils/delay";

export interface CustomersManagerState {
  customers: Customer[] | null;

  isSearching: boolean;

  isCustomersNotFound: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;
}

export type CustomersManagerStateListener = (
  state: CustomersManagerState
) => void;

export class CustomersManagerViewModel {
  constructor(private getCustomersUseCase: GetCustomers) {}

  private _state: CustomersManagerState = {
    customers: null,

    isSearching: false,

    isCustomersNotFound: false,

    showCreateModal: false,
    showEditModal: false,
  };

  get state(): CustomersManagerState {
    return this._state;
  }

  stateListener: CustomersManagerStateListener | null = null;

  private updateState(newState: CustomersManagerState) {
    (this._state = newState), this.stateListener?.(this._state);
  }

  async getCustomers() {
    this.updateState({
      ...this._state,
      isSearching: true,
      isCustomersNotFound: false,
    });

    const customers = await this.getCustomersUseCase.exec();

    if (customers === null) {
      this.updateState({
        ...this._state,
        customers: null,
        isSearching: false,
        isCustomersNotFound: true,
      });
    }

    if (customers) {
      this.updateState({
        ...this._state,
        customers,
        isSearching: false,
        isCustomersNotFound: false,
      });
    }
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
}

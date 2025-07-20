import { GetCustomers } from "../../domain/useCases/GetCustomers";
import { CreateCustomer } from "../../domain/useCases/CreateCustomer";
import { EditCustomer } from "../../domain/useCases/EditCustomer";

import { Customer } from "../../domain/entities/Customer";
import { AddCustomerParams } from "../../domain/useCases/CreateCustomer";

import { delay } from "../../shared/utils/delay";

export interface CustomersManagerState {
  customers: Customer[] | null;

  isSearching: boolean;
  isCreatingCustomer: boolean;
  isEditingCustomer: boolean;

  isCustomersNotFound: boolean;
  isErrorInCustomerRegistration: boolean;
  isErrorInCustomerEdition: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;

  customerCode: number;
  cpfField: string;
  nameField: string;
  emailField: string;
  phoneField: string;

  allowedToCreateCustomer: boolean;

  showToast: boolean;
  toastStatus: "success" | "error";
  message: string;
}

export type CustomersManagerStateListener = (
  state: CustomersManagerState
) => void;

export class CustomersManagerViewModel {
  constructor(
    private getCustomersUseCase: GetCustomers,
    private createCustomerUseCase: CreateCustomer,
    private editCustomerUseCase: EditCustomer
  ) {}

  private _state: CustomersManagerState = {
    customers: null,

    isSearching: false,
    isCreatingCustomer: false,
    isEditingCustomer: false,

    isCustomersNotFound: false,
    isErrorInCustomerRegistration: false,
    isErrorInCustomerEdition: false,

    showCreateModal: false,
    showEditModal: false,

    customerCode: 1,
    cpfField: "",
    nameField: "",
    emailField: "",
    phoneField: "",

    allowedToCreateCustomer: false,

    showToast: false,
    toastStatus: "success",
    message: "",
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

  async createCustomer(customer: AddCustomerParams) {
    this.updateState({
      ...this._state,
      isCreatingCustomer: true,
      isErrorInCustomerRegistration: false,
    });

    const registeredCustomer = await this.createCustomerUseCase.exec(customer);

    if (registeredCustomer instanceof Error) {
      this.updateState({
        ...this._state,
        isCreatingCustomer: false,
        isErrorInCustomerRegistration: true,
        message: registeredCustomer.message,
      });

      await this.showToast(registeredCustomer.message, "error");
    }

    if (!(registeredCustomer instanceof Error)) {
      this.updateState({
        ...this._state,
        isCreatingCustomer: false,
        isErrorInCustomerRegistration: false,
        message: "",
      });

      this.closeModal();

      await this.getCustomers();

      await this.showToast("Customer successfully created", "success");
    }
  }

  async editCustomer(customer: Customer) {
    this.updateState({
      ...this._state,
      isEditingCustomer: true,
      isErrorInCustomerEdition: false,
    });

    const editedCustomer = await this.editCustomerUseCase.exec(customer);

    if (editedCustomer instanceof Error) {
      this.updateState({
        ...this._state,
        isEditingCustomer: false,
        isErrorInCustomerEdition: true,
        message: editedCustomer.message,
      });

      await this.showToast(editedCustomer.message, "error");
    }

    if (!(editedCustomer instanceof Error)) {
      this.updateState({
        ...this._state,
        isEditingCustomer: false,
        isErrorInCustomerEdition: false,
        message: "",
      });

      this.closeModal();

      await this.getCustomers();

      await this.showToast("Customer successfully edited", "success");
    }
  }

  changeCustomerCPF(customerCPF: string) {
    const customerCPFField = customerCPF.replace(/[^0-9.-]/g, "");

    this.updateState({
      ...this._state,
      cpfField: customerCPFField,
    });

    const customerFields = {
      cpf: this._state.cpfField,
      name: this._state.nameField,
      email: this._state.emailField,
      phone: this._state.phoneField,
    };

    this.allowCustomerCreation(customerFields);
  }

  changeCustomerName(customerName: string) {
    const customerNameField = customerName.replace(/[^\p{L}\s]/gu, "");

    this.updateState({
      ...this._state,
      nameField: customerNameField,
    });

    const customerFields = {
      cpf: this._state.cpfField,
      name: this._state.nameField,
      email: this._state.emailField,
      phone: this._state.phoneField,
    };

    this.allowCustomerCreation(customerFields);
  }

  changeCustomerEmail(customerEmail: string) {
    const customerNameField = customerEmail.trim();

    this.updateState({
      ...this._state,
      emailField: customerNameField,
    });

    const customerFields = {
      cpf: this._state.cpfField,
      name: this._state.nameField,
      email: this._state.emailField,
      phone: this._state.phoneField,
    };

    this.allowCustomerCreation(customerFields);
  }

  changeCustomerPhone(customerPhone: string) {
    const customerPhoneField = customerPhone.replace(/[^0-9()\-\s]/g, "");

    this.updateState({
      ...this._state,
      phoneField: customerPhoneField,
    });

    const customerFields = {
      cpf: this._state.cpfField,
      name: this._state.nameField,
      email: this._state.emailField,
      phone: this._state.phoneField,
    };

    this.allowCustomerCreation(customerFields);
  }

  changeCustomerCode(customerCode: number) {
    this.updateState({
      ...this._state,
      customerCode,
    });
  }

  allowCustomerCreation(customerFields: {
    cpf: string;
    name: string;
    email: string;
    phone: string;
  }) {
    const allowCustomerCreation =
      customerFields.cpf.length >= 11 &&
      customerFields.name.length >= 3 &&
      customerFields.email.length >= 6 &&
      customerFields.phone.length >= 10;

    this.updateState({
      ...this._state,
      allowedToCreateCustomer: allowCustomerCreation,
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

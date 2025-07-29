import { GetProductSales } from "../../domain/useCases/GetProductSales";
import { GetCustomers } from "../../domain/useCases/GetCustomers";
import { GetParts } from "../../domain/useCases/GetParts";

import { ProductSale } from "../../domain/entities/ProductSale";
import { Customer } from "../../domain/entities/Customer";
import { Piece } from "../../domain/entities/Piece";

import { delay } from "../../shared/utils/delay";

export interface ProductSalesState {
  productSales: ProductSale[] | null;
  customers: Customer[] | null;
  parts: Piece[] | null;

  isSearchingProductSales: boolean;
  isSearchingCustomers: boolean;
  isSearchingParts: boolean;

  isProductSalesNotFound: boolean;
  isCustomersNotFound: boolean;
  isPartsNotFound: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;

  productSaleCode: number;
  customerField: string;
  customerCode: number;
  pieceField: string;
  pieceCode: number;
  quantityField: number;
  valueField: number;
  dateField: string;

  allowedToCreateProductSale: boolean;

  showToast: boolean;
  toastStatus: "success" | "error";
  message: string;
}

export type ProductSalesStateListener = (state: ProductSalesState) => void;

export class ProductSalesViewModel {
  constructor(
    private getProductSalesUseCase: GetProductSales,
    private getCustomersUseCase: GetCustomers,
    private getPartsUseCase: GetParts
  ) {}

  private _state: ProductSalesState = {
    productSales: null,
    customers: null,
    parts: null,

    isSearchingProductSales: false,
    isSearchingCustomers: false,
    isSearchingParts: false,

    isProductSalesNotFound: false,
    isCustomersNotFound: false,
    isPartsNotFound: false,

    showCreateModal: false,
    showEditModal: false,

    productSaleCode: 1,
    customerCode: 1,
    customerField: "",
    pieceCode: 1,
    pieceField: "",
    quantityField: 1,
    valueField: 0,
    dateField: "",

    allowedToCreateProductSale: false,

    showToast: false,
    toastStatus: "success",
    message: "",
  };

  get state(): ProductSalesState {
    return this._state;
  }

  stateListener: ProductSalesStateListener | null = null;

  private updateState(newState: ProductSalesState) {
    this._state = newState;
    this.stateListener?.(this._state);
  }

  async getProductSales() {
    this.updateState({
      ...this._state,
      isSearchingProductSales: true,
      isProductSalesNotFound: false,
    });

    const productSales = await this.getProductSalesUseCase.exec();

    if (productSales === null) {
      this.updateState({
        ...this._state,
        isSearchingProductSales: false,
        isProductSalesNotFound: true,
      });
    }

    if (productSales) {
      this.updateState({
        ...this._state,
        productSales,
        isSearchingProductSales: false,
        isProductSalesNotFound: false,
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

  async getParts() {
    this.updateState({
      ...this._state,
      isSearchingParts: true,
      isPartsNotFound: false,
    });

    const parts = await this.getPartsUseCase.exec();

    if (parts === null) {
      this.updateState({
        ...this._state,
        isSearchingParts: false,
        isPartsNotFound: true,
      });

      await this.showToast("It was not possible to get the parts", "error");
    }

    if (parts) {
      this.updateState({
        ...this._state,
        parts,
        isSearchingParts: false,
        isPartsNotFound: false,
      });
    }
  }

  removeProductSale(productSaleCode: number) {
    console.log("Venda a ser removida:", productSaleCode);
  }

  changeProductSaleCode(productSaleCode: number) {
    this.updateState({
      ...this._state,
      productSaleCode,
    });
  }

  changeCustomerField(customer: string) {
    this.updateState({
      ...this._state,
      customerField: customer,
    });
  }

  changeQuantityField(quantity: number) {
    if (quantity >= 1) {
      this.updateState({
        ...this._state,
        quantityField: quantity,
      });

      const productSaleFields = {
        quantity: this._state.quantityField,
        value: this._state.valueField,
        date: this._state.dateField,
      };

      this.allowProductSaleCreation(productSaleFields);
    }
  }

  changeValueField(value: number) {
    if (value >= 0) {
      this.updateState({
        ...this._state,
        valueField: value,
      });

      const productSaleFields = {
        quantity: this._state.quantityField,
        value: this._state.valueField,
        date: this._state.dateField,
      };

      this.allowProductSaleCreation(productSaleFields);
    }
  }

  changeDateField(date: string) {
    const formattedDate = new Date(date);

    const dateField = !isNaN(formattedDate.getTime()) ? date : "";

    this.updateState({
      ...this._state,
      dateField,
    });

    const productSaleFields = {
      quantity: this._state.quantityField,
      value: this._state.valueField,
      date: this._state.dateField,
    };

    this.allowProductSaleCreation(productSaleFields);
  }

  allowProductSaleCreation(productSaleFields: {
    quantity: number;
    value: number;
    date: string;
  }) {
    const isValidDate = !isNaN(new Date(productSaleFields.date).getTime());

    const allowProductSaleCreation =
      productSaleFields.quantity >= 1 &&
      productSaleFields.value >= 0 &&
      isValidDate;

    this.updateState({
      ...this._state,
      allowedToCreateProductSale: allowProductSaleCreation,
    });
  }

  changeCustomerCode(customer: number) {
    this.updateState({
      ...this._state,
      customerCode: customer,
    });
  }

  changePieceField(piece: string) {
    this.updateState({
      ...this._state,
      pieceField: piece,
    });
  }

  changePieceCode(piece: number) {
    this.updateState({
      ...this._state,
      pieceCode: piece,
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

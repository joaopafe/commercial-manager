import { GetProductPurchases } from "../../domain/useCases/GetProductPurchases";
import { GetSuppliers } from "../../domain/useCases/GetSuppliers";

import { ProductPurchase } from "../../domain/entities/ProductPurchase";
import { Supplier } from "../../domain/entities/Supplier";

import { delay } from "../../shared/utils/delay";

export interface ProductPurchaseState {
  productPurchases: ProductPurchase[] | null;
  suppliers: Supplier[] | null;

  isSearchingProductPurchases: boolean;
  isSearchingSuppliers: boolean;

  isProductPurchasesNotFound: boolean;
  isSuppliersNotFound: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;

  productPurchaseCode: number;
  supplierField: string;
  supplierCode: number;
  pieceField: string;
  pieceCode: number;
  quantityField: number;
  valueField: number;
  dateField: string;

  allowedToCreateProductPurchase: boolean;

  showToast: boolean;
  toastStatus: "success" | "error";
  message: string;
}

export type ProductPurchaseStateListener = (
  state: ProductPurchaseState
) => void;

export class ProductPurchasesViewModel {
  constructor(
    private getProductPurchasesUseCase: GetProductPurchases,
    private getSuppliersUseCase: GetSuppliers
  ) {}

  private _state: ProductPurchaseState = {
    productPurchases: null,
    suppliers: null,

    isSearchingProductPurchases: false,
    isSearchingSuppliers: false,

    isProductPurchasesNotFound: false,
    isSuppliersNotFound: false,

    showCreateModal: false,
    showEditModal: false,

    productPurchaseCode: 1,
    supplierField: "",
    supplierCode: 1,
    pieceField: "",
    pieceCode: 1,
    quantityField: 1,
    valueField: 0,
    dateField: "",

    allowedToCreateProductPurchase: false,

    showToast: false,
    toastStatus: "success",
    message: "",
  };

  get state(): ProductPurchaseState {
    return this._state;
  }

  stateListener: ProductPurchaseStateListener | null = null;

  private updateState(newState: ProductPurchaseState) {
    this._state = newState;
    this.stateListener?.(this._state);
  }

  async getProductPurchases() {
    this.updateState({
      ...this._state,
      isSearchingProductPurchases: true,
      isProductPurchasesNotFound: false,
    });

    const productPurchases = await this.getProductPurchasesUseCase.exec();

    if (productPurchases === null) {
      this.updateState({
        ...this._state,
        productPurchases: null,
        isSearchingProductPurchases: false,
        isProductPurchasesNotFound: true,
      });
    }

    if (productPurchases) {
      this.updateState({
        ...this._state,
        productPurchases,
        isSearchingProductPurchases: false,
        isProductPurchasesNotFound: false,
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

  changeProductPurchaseCode(productPurchaseCode: number) {
    this.updateState({
      ...this._state,
      productPurchaseCode,
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

  changeQuantityField(quantity: number) {
    if (quantity >= 1) {
      this.updateState({
        ...this._state,
        quantityField: quantity,
      });

      const servicePurchaseFields = {
        quantity: this._state.quantityField,
        value: this._state.valueField,
        date: this._state.dateField,
      };

      this.allowProductPurchaseCreation(servicePurchaseFields);
    }
  }

  changeValueField(value: number) {
    if (value >= 0) {
      this.updateState({
        ...this._state,
        valueField: value,
      });

      const servicePurchaseFields = {
        quantity: this._state.quantityField,
        value: this._state.valueField,
        date: this._state.dateField,
      };

      this.allowProductPurchaseCreation(servicePurchaseFields);
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
      quantity: this._state.quantityField,
      value: this._state.valueField,
      date: this._state.dateField,
    };

    this.allowProductPurchaseCreation(servicePurchaseFields);
  }

  allowProductPurchaseCreation(productPurchaseFields: {
    quantity: number;
    value: number;
    date: string;
  }) {
    const isValidDate = !isNaN(new Date(productPurchaseFields.date).getTime());

    const allowProductPurchaseCreation =
      productPurchaseFields.quantity >= 1 &&
      productPurchaseFields.value >= 0 &&
      isValidDate;

    this.updateState({
      ...this._state,
      allowedToCreateProductPurchase: allowProductPurchaseCreation,
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

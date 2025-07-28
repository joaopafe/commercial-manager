import { GetParts } from "../../domain/useCases/GetParts";
import { GetPieceCategories } from "../../domain/useCases/GetPieceCategories";
import { CreatePiece } from "../../domain/useCases/CreatePiece";
import { EditPiece } from "../../domain/useCases/EditPiece";
import { RemovePiece } from "../../domain/useCases/RemovePiece";
import { GetSuppliers } from "../../domain/useCases/GetSuppliers";

import { Piece } from "../../domain/entities/Piece";
import { AddPieceParams } from "../../domain/useCases/CreatePiece";
import { PieceCategory } from "../../domain/entities/PieceCategory";
import { Supplier } from "../../domain/entities/Supplier";

import { delay } from "../../shared/utils/delay";

export interface PartsManagerState {
  parts: Piece[] | null;
  pieceCategories: PieceCategory[] | null;
  suppliers: Supplier[] | null;

  isSearching: boolean;
  isCreatingPiece: boolean;
  isEditingPiece: boolean;
  isRemovingPiece: boolean;

  isPartsNotNotFound: boolean;
  isPieceCategoriesNotFound: boolean;
  isSuppliersNotFound: boolean;
  isErrorInPieceRegistration: boolean;
  isErrorInPieceEdition: boolean;
  isErrorInPieceRemoval: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;

  pieceCode: number;
  nameField: string;
  priceField: number;
  categoryField: string;
  categoryCode: number;
  supplierField: string;
  supplierCode: number;

  allowedToCreatePiece: boolean;

  showToast: boolean;
  toastStatus: "success" | "error";
  message: string;
}

export type PartsManagerStateListener = (state: PartsManagerState) => void;

export class PartsManagerViewModel {
  constructor(
    private getPartsUseCase: GetParts,
    private getPieceCategoriesUseCase: GetPieceCategories,
    private createPieceUseCase: CreatePiece,
    private editPieceUseCase: EditPiece,
    private removePieceUseCase: RemovePiece,
    private getSuppliersUseCase: GetSuppliers
  ) {}

  private _state: PartsManagerState = {
    parts: null,
    pieceCategories: null,
    suppliers: null,

    isSearching: false,
    isCreatingPiece: false,
    isEditingPiece: false,
    isRemovingPiece: false,

    isPartsNotNotFound: false,
    isPieceCategoriesNotFound: false,
    isSuppliersNotFound: false,
    isErrorInPieceRegistration: false,
    isErrorInPieceEdition: false,
    isErrorInPieceRemoval: false,

    showCreateModal: false,
    showEditModal: false,

    pieceCode: 1,
    nameField: "",
    priceField: 1,
    categoryField: "",
    categoryCode: 1,
    supplierField: "",
    supplierCode: 1,

    allowedToCreatePiece: false,

    showToast: false,
    toastStatus: "success",
    message: "",
  };

  get state(): PartsManagerState {
    return this._state;
  }

  stateListener: PartsManagerStateListener | null = null;

  private updateState(newState: PartsManagerState) {
    this._state = newState;

    this.stateListener?.(this._state);
  }

  async getParts() {
    this.updateState({
      ...this._state,
      isSearching: true,
    });

    const parts = await this.getPartsUseCase.exec();

    if (parts === null) {
      this.updateState({
        ...this._state,
        parts: null,
        isSearching: false,
        isPartsNotNotFound: true,
      });
    }

    if (parts) {
      this.updateState({
        ...this._state,
        parts,
        isSearching: false,
        isPartsNotNotFound: false,
      });
    }
  }

  async getPieceCategories() {
    this.updateState({
      ...this._state,
      isSearching: true,
    });

    const pieceCategories = await this.getPieceCategoriesUseCase.execute();

    if (pieceCategories === null) {
      this.updateState({
        ...this._state,
        pieceCategories: null,
        isSearching: false,
        isPieceCategoriesNotFound: true,
      });

      await this.showToast("It was not possible to get the suppliers", "error");
    }

    if (pieceCategories) {
      this.updateState({
        ...this._state,
        pieceCategories,
        isSearching: false,
        isPieceCategoriesNotFound: false,
        categoryField: pieceCategories[0].category,
      });
    }
  }

  async getSuppliers() {
    this.updateState({
      ...this._state,
      isSearching: true,
    });

    const suppliers = await this.getSuppliersUseCase.exec();

    if (suppliers === null) {
      this.updateState({
        ...this._state,
        suppliers: null,
        isSearching: false,
        isSuppliersNotFound: true,
      });

      await this.showToast("It was not possible to get the suppliers", "error");
    }

    if (suppliers) {
      this.updateState({
        ...this._state,
        suppliers,
        isSearching: false,
        isSuppliersNotFound: false,
        supplierField: suppliers[0].name,
      });
    }
  }

  async createPiece(piece: AddPieceParams) {
    this.updateState({
      ...this._state,
      isCreatingPiece: true,
      isErrorInPieceRegistration: false,
    });

    const registeredPiece = await this.createPieceUseCase.exec(piece);

    if (registeredPiece instanceof Error) {
      this.updateState({
        ...this._state,
        isCreatingPiece: false,
        isErrorInPieceRegistration: true,
        message: registeredPiece.message,
      });

      await this.showToast(registeredPiece.message, "error");
    }

    if (!(registeredPiece instanceof Error)) {
      this.updateState({
        ...this._state,
        isCreatingPiece: false,
        isErrorInPieceRegistration: false,
        message: "",
      });

      this.closeModal();

      await this.getParts();

      await this.showToast("Piece successfully create", "success");
    }
  }

  async editPiece(piece: Piece) {
    this.updateState({
      ...this._state,
      isEditingPiece: true,
      isErrorInPieceEdition: false,
    });

    const editedPiece = await this.editPieceUseCase.exec(piece);

    if (editedPiece instanceof Error) {
      this.updateState({
        ...this._state,
        isEditingPiece: false,
        isErrorInPieceEdition: true,
        message: editedPiece.message,
      });

      await this.showToast(editedPiece.message, "error");
    }

    if (!(editedPiece instanceof Error)) {
      this.updateState({
        ...this._state,
        isEditingPiece: false,
        isErrorInPieceEdition: false,
        message: "",
      });

      this.closeModal();

      await this.getParts();

      await this.showToast("Piece successfully edited", "success");
    }
  }

  async removePiece(pieceCode: number) {
    this.updateState({
      ...this._state,
      isRemovingPiece: true,
      isErrorInPieceRemoval: false,
    });

    const removedPiece = await this.removePieceUseCase.exec(pieceCode);

    if (removedPiece instanceof Error) {
      this.updateState({
        ...this._state,
        isRemovingPiece: false,
        isErrorInPieceRemoval: true,
        message: removedPiece.message,
      });

      await this.showToast(removedPiece.message, "error");
    }

    if (!(removedPiece instanceof Error)) {
      this.updateState({
        ...this._state,
        isRemovingPiece: false,
        isErrorInPieceRemoval: false,
        message: "",
      });

      await this.getParts();

      await this.showToast("Piece successfully deleted", "success");
    }
  }

  changePieceName(pieceName: string) {
    this.updateState({
      ...this._state,
      nameField: pieceName,
    });

    const pieceFields = {
      pieceName: pieceName.trim(),
      piecePrice: this._state.priceField,
    };
    this.allowPieceCreation(pieceFields);
  }

  changePiecePrice(piecePrice: number) {
    const piecePriceField = piecePrice >= 0.1 ? piecePrice : 0.1;

    this.updateState({
      ...this._state,
      priceField: piecePriceField,
    });

    const pieceFields = {
      pieceName: this._state.nameField,
      piecePrice: this._state.priceField,
    };
    this.allowPieceCreation(pieceFields);
  }

  changePieceCategoryField(pieceCategory: string) {
    this.updateState({
      ...this._state,
      categoryField: pieceCategory,
    });
  }

  changePieceCategoryCode(pieceCategory: number) {
    this.updateState({
      ...this._state,
      categoryCode: pieceCategory,
    });
  }

  changePieceSupplierField(pieceSupplier: string) {
    this.updateState({
      ...this._state,
      supplierField: pieceSupplier,
    });
  }

  changePieceSupplierCode(pieceSupplier: number) {
    this.updateState({
      ...this._state,
      supplierCode: pieceSupplier,
    });
  }

  changePieceCode(pieceCode: number) {
    this.updateState({
      ...this._state,
      pieceCode,
    });
  }

  allowPieceCreation(pieceFields: { pieceName: string; piecePrice: number }) {
    const allowPieceCreation =
      pieceFields.pieceName.length >= 3 && pieceFields.piecePrice >= 0.1;

    this.updateState({
      ...this._state,
      allowedToCreatePiece: allowPieceCreation,
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

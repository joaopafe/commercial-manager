import {
  AddPieceParams,
  PieceRepository,
} from "../../domain/data/PieceRepository";
import { SupplierRepository } from "../../domain/data/SupplierRepository";

import { Piece } from "../../domain/entities/Piece";
import { PieceCategory } from "../../domain/entities/PieceCategory";
import { Supplier } from "../../domain/entities/Supplier";

export interface PartsManagerState {
  parts: Piece[] | null;
  pieceCategories: PieceCategory[] | null;
  suppliers: Supplier[] | null;

  isSearching: boolean;
  isCreatingPiece: boolean;
  isEditingPiece: boolean;

  isPartsNotNotFound: boolean;
  isPieceCategoriesNotFound: boolean;
  isSuppliersNotFound: boolean;
  isErrorInPieceRegistration: boolean;
  isErrorInPieceEdition: boolean;

  showCreateModal: boolean;
  showEditModal: boolean;

  pieceCode: number;
  nameField: string;
  priceField: number;
  categoryField: string;
  supplierField: string;

  allowedToCreatePiece: boolean;

  errorMessage: string | null;
}

export type PartsManagerStateListener = (state: PartsManagerState) => void;

export class PartsManagerViewModel {
  constructor(
    private pieceRepository: PieceRepository,
    private supplierRepository: SupplierRepository
  ) {}

  private _state: PartsManagerState = {
    parts: null,
    pieceCategories: null,
    suppliers: null,

    isSearching: false,
    isCreatingPiece: false,
    isEditingPiece: false,

    isPartsNotNotFound: false,
    isPieceCategoriesNotFound: false,
    isSuppliersNotFound: false,
    isErrorInPieceRegistration: false,
    isErrorInPieceEdition: false,

    showCreateModal: false,
    showEditModal: false,

    pieceCode: 1,
    nameField: "",
    priceField: 1,
    categoryField: "",
    supplierField: "",

    allowedToCreatePiece: false,

    errorMessage: null,
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

    const parts = await this.pieceRepository.list();

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

    const pieceCategories = await this.pieceRepository.listCategories();

    if (pieceCategories === null) {
      this.updateState({
        ...this._state,
        pieceCategories: null,
        isSearching: false,
        isPieceCategoriesNotFound: true,
      });
    }

    if (pieceCategories) {
      this.updateState({
        ...this._state,
        pieceCategories,
        isSearching: false,
        isPieceCategoriesNotFound: false,
        categoryField: pieceCategories[0],
      });
    }
  }

  async getSuppliers() {
    this.updateState({
      ...this._state,
      isSearching: true,
    });

    const suppliers = await this.supplierRepository.list();

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
        supplierField: suppliers[0],
      });
    }
  }

  async createPiece(piece: AddPieceParams) {
    this.updateState({
      ...this._state,
      isCreatingPiece: true,
      isErrorInPieceRegistration: false,
    });

    const registeredPiece = await this.pieceRepository.add(piece);

    if (registeredPiece instanceof Error) {
      this.updateState({
        ...this._state,
        isCreatingPiece: false,
        isErrorInPieceRegistration: true,
        errorMessage: registeredPiece.message,
      });
    }

    if (!(registeredPiece instanceof Error)) {
      this.updateState({
        ...this._state,
        isCreatingPiece: false,
        isErrorInPieceRegistration: false,
        errorMessage: "",
      });

      this.closeModal();

      await this.getParts();
    }
  }

  async editPiece(piece: Piece) {
    this.updateState({
      ...this._state,
      isEditingPiece: true,
      isErrorInPieceEdition: false,
    });

    const editedPiece = await this.pieceRepository.edit(piece);

    if (editedPiece instanceof Error) {
      this.updateState({
        ...this._state,
        isEditingPiece: false,
        isErrorInPieceEdition: true,
        errorMessage: editedPiece.message,
      });
    }

    if (!(editedPiece instanceof Error)) {
      this.updateState({
        ...this._state,
        isEditingPiece: false,
        isErrorInPieceEdition: false,
        errorMessage: "",
      });

      this.closeModal();

      await this.getParts();
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

  changePieceCategory(pieceCategory: string) {
    this.updateState({
      ...this._state,
      categoryField: pieceCategory,
    });
  }

  changePieceSupplier(pieceSupplier: string) {
    this.updateState({
      ...this._state,
      supplierField: pieceSupplier,
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
}

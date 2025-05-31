import { PieceRepository } from "../../domain/data/PieceRepository";
import { SupplierRepository } from "../../domain/data/SupplierRepository";

import { Piece } from "../../domain/entities/Piece";
import { PieceCategory } from "../../domain/entities/PieceCategory";
import { Supplier } from "../../domain/entities/Supplier";

export interface PartsManagerState {
  parts: Piece[] | null;
  pieceCategories: PieceCategory[] | null;
  suppliers: Supplier[] | null;
  isSearching: boolean;
  isPartsNotNotFound: boolean;
  isPieceCategoriesNotFound: boolean;
  isSuppliersNotFound: boolean;
  showCreateModal: boolean;
  showEditModal: boolean;
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
    isPartsNotNotFound: false,
    isPieceCategoriesNotFound: false,
    isSuppliersNotFound: false,
    showCreateModal: false,
    showEditModal: false,
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

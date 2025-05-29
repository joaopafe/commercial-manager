import { PieceRepository } from "../../domain/data/PieceRepository";

import { Piece } from "../../domain/entities/Piece";
import { PieceCategory } from "../../domain/entities/PieceCategory";

export interface PartsManagerState {
  parts: Piece[] | null;
  pieceCategories: PieceCategory[] | null;
  isSearching: boolean;
  isPartsNotNotFound: boolean;
  isPieceCategoriesNotFound: boolean;
  showCreateModal: boolean;
  showEditModal: boolean;
}

export type PartsManagerStateListener = (state: PartsManagerState) => void;

export class PartsManagerViewModel {
  constructor(private pieceRepository: PieceRepository) {}

  private _state: PartsManagerState = {
    parts: null,
    pieceCategories: null,
    isSearching: false,
    isPartsNotNotFound: false,
    isPieceCategoriesNotFound: false,
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

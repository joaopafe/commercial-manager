import React, { useEffect, useMemo, useState } from "react";

import { PartsManagerViewModelFactory } from "../../app/providers/di/PartsManagerViewModelFactory";

import { PartsTable } from "../components/PartsTable";
import { Loader } from "../components/Loader";

interface PartsManagerViewProps {
  partsManagerViewModelFactory: PartsManagerViewModelFactory;
}

export const PartsManagerView: React.FC<PartsManagerViewProps> = ({
  partsManagerViewModelFactory,
}) => {
  const partsManagerViewModel = useMemo(
    () => partsManagerViewModelFactory.makePartsManagerViewModel(),
    []
  );

  const [state, setState] = useState(partsManagerViewModel.state);

  useEffect(() => {
    partsManagerViewModel.stateListener = setState;

    return () => {
      partsManagerViewModel.stateListener = null;
    };
  });

  useEffect(() => {
    partsManagerViewModel.getParts();
    partsManagerViewModel.getPieceCategories();
    partsManagerViewModel.getSuppliers();
  }, []);

  const partsTable = state.isSearching ? (
    <Loader />
  ) : state.isPartsNotNotFound ? (
    <div className="information-value">Peças não encontradas</div>
  ) : (
    <PartsTable
      parts={state.parts != null ? state.parts : []}
      openModal={(isCreateModal) =>
        partsManagerViewModel.openModal(isCreateModal)
      }
      changePieceCode={(pieceCode) =>
        partsManagerViewModel.changePieceCode(pieceCode)
      }
      removePiece={(pieceCode) => partsManagerViewModel.removePiece(pieceCode)}
    />
  );

  const categoriesInput = state.isSearching ? (
    <Loader />
  ) : state.isPieceCategoriesNotFound ? (
    <div className="information-value">Categorias não encontradas</div>
  ) : (
    <select
      className="category-input"
      name="categories"
      id="category"
      value={state.categoryField}
      onChange={(e) =>
        partsManagerViewModel.changePieceCategory(e.target.value)
      }
    >
      {state.pieceCategories?.map((pieceCategory, index) => {
        return (
          <option key={index} value={pieceCategory}>
            {pieceCategory}
          </option>
        );
      })}
    </select>
  );

  const suppliersInput = state.isSearching ? (
    <Loader />
  ) : state.isSuppliersNotFound ? (
    <div className="information-value">Fornecedores não encontrados</div>
  ) : (
    <select
      className="supplier-input"
      name="suppliers"
      id="suppliers"
      value={state.supplierField}
      onChange={(e) =>
        partsManagerViewModel.changePieceSupplier(e.target.value)
      }
    >
      {state.suppliers?.map((supplier, index) => {
        return (
          <option key={index} value={supplier}>
            {supplier}
          </option>
        );
      })}
    </select>
  );

  return (
    <div className="parts-manager">
      <div className="header">
        <div className="message">Gerenciamento de Peças</div>

        <button
          className="new-piece-button"
          onClick={() => partsManagerViewModel.openModal(true)}
        >
          Nova Peça
        </button>
      </div>

      {partsTable}

      <div
        className="piece-modal"
        style={{ display: state.showCreateModal ? "flex" : "none" }}
      >
        <div className="piece-modal-title">Cadastrar Peça</div>

        <form className="piece-modal-form">
          <label className="name-label" htmlFor="name">
            Nome:
          </label>
          <input
            className="name-input"
            type="text"
            id="name"
            value={state.nameField}
            onChange={(e) =>
              partsManagerViewModel.changePieceName(e.target.value)
            }
          />

          <label className="category-label" htmlFor="">
            Categoria
          </label>
          {categoriesInput}

          <label className="supplier-label" htmlFor="">
            Fornecedor
          </label>
          {suppliersInput}

          <label className="price-label" htmlFor="price">
            Preço:
          </label>
          <input
            className="price-input"
            type="number"
            id="price"
            value={state.priceField}
            onChange={(e) =>
              partsManagerViewModel.changePiecePrice(parseFloat(e.target.value))
            }
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={!state.allowedToCreatePiece}
            onClick={() =>
              partsManagerViewModel.createPiece({
                name: state.nameField,
                category: state.categoryField,
                price: state.priceField,
                supplier: state.supplierField,
              })
            }
          >
            Salvar
          </button>
          <button
            type="submit"
            className="cancel-register"
            onClick={() => partsManagerViewModel.closeModal()}
          >
            Cancelar
          </button>
        </div>
      </div>

      <div
        className="piece-modal"
        style={{ display: state.showEditModal ? "flex" : "none" }}
      >
        <div className="piece-modal-title">Editar Peça</div>

        <form className="piece-modal-form">
          <label className="name-label" htmlFor="name">
            Nome:
          </label>
          <input
            className="name-input"
            type="text"
            id="name"
            value={state.nameField}
            onChange={(e) =>
              partsManagerViewModel.changePieceName(e.target.value)
            }
          />

          <label className="category-label" htmlFor="">
            Categoria
          </label>
          {categoriesInput}

          <label className="supplier-label" htmlFor="">
            Fornecedor
          </label>
          {suppliersInput}

          <label className="price-label" htmlFor="price">
            Preço:
          </label>
          <input
            className="price-input"
            type="number"
            id="price"
            value={state.priceField}
            onChange={(e) =>
              partsManagerViewModel.changePiecePrice(parseFloat(e.target.value))
            }
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={!state.allowedToCreatePiece}
            onClick={() =>
              partsManagerViewModel.editPiece({
                code: state.pieceCode,
                name: state.nameField,
                category: state.categoryField,
                price: state.priceField,
                supplier: state.supplierField,
              })
            }
          >
            Salvar
          </button>
          <button
            type="submit"
            className="cancel-register"
            onClick={() => partsManagerViewModel.closeModal()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

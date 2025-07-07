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
      suppliers={state.suppliers != null ? state.suppliers : []}
      pieceCategories={
        state.pieceCategories != null ? state.pieceCategories : []
      }
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
      value={state.categoryCode}
      onChange={(e) => {
        const selectedCode = Number(e.target.value);
        let selectedCategory;

        if (state.pieceCategories) {
          selectedCategory = state.pieceCategories.find(
            (c) => c.code === selectedCode
          );
        }
        if (selectedCategory) {
          partsManagerViewModel.changePieceCategoryField(
            selectedCategory.category
          );
          partsManagerViewModel.changePieceCategoryCode(selectedCategory.code);
        }
      }}
    >
      {state.pieceCategories?.map((pieceCategory) => (
        <option key={pieceCategory.code} value={pieceCategory.code}>
          {pieceCategory.category}
        </option>
      ))}
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
      id="supplier"
      value={state.supplierCode}
      onChange={(e) => {
        const selectedCode = Number(e.target.value);
        let selectedSupplier;

        if (state.suppliers) {
          selectedSupplier = state.suppliers.find(
            (c) => c.code === selectedCode
          );
        }
        if (selectedSupplier) {
          partsManagerViewModel.changePieceSupplierField(selectedSupplier.name);
          partsManagerViewModel.changePieceSupplierCode(selectedSupplier.code);
        }
      }}
    >
      {state.suppliers?.map((supplier) => (
        <option key={supplier.code} value={supplier.code}>
          {supplier.name}
        </option>
      ))}
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
                categoryCode: state.categoryCode,
                price: state.priceField,
                supplierCode: state.supplierCode,
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
                categoryCode: state.categoryCode,
                price: state.priceField,
                supplierCode: state.supplierCode,
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

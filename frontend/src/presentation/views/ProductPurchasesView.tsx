import React, { useEffect, useMemo, useState } from "react";

import { ProductPurchasesViewModelFactory } from "../../app/providers/di/ProductPurchasesViewModelFactory";

import { Loader } from "../components/Loader";
import { Toast } from "../components/Toast";
import { ProductPurchasesTable } from "../components/ProductPurchasesTable";

interface ProductPurchasesViewProps {
  productPurchasesViewModelFactory: ProductPurchasesViewModelFactory;
}

export const ProductPurchasesView: React.FC<ProductPurchasesViewProps> = ({
  productPurchasesViewModelFactory,
}) => {
  const productPurchasesViewModel = useMemo(
    () => productPurchasesViewModelFactory.makeProductPurchasesViewModel(),
    []
  );

  const [state, setState] = useState(productPurchasesViewModel.state);

  useEffect(() => {
    productPurchasesViewModel.stateListener = setState;

    return () => {
      productPurchasesViewModel.stateListener = setState;
    };
  });

  useEffect(() => {
    productPurchasesViewModel.getProductPurchases();
    productPurchasesViewModel.getSuppliers();
    productPurchasesViewModel.getParts();
  }, []);

  const productPurchasesTable = state.isSearchingProductPurchases ? (
    <Loader />
  ) : state.isProductPurchasesNotFound ? (
    <div className="information-value">Compras não encontradas</div>
  ) : (
    <ProductPurchasesTable
      productPurchases={
        state.productPurchases != null ? state.productPurchases : []
      }
      suppliers={state.suppliers != null ? state.suppliers : []}
      parts={state.parts != null ? state.parts : []}
      openModal={(isCreateModal) =>
        productPurchasesViewModel.openModal(isCreateModal)
      }
      changeProductPurchaseCode={(productPurchaseCode) =>
        productPurchasesViewModel.changeProductPurchaseCode(productPurchaseCode)
      }
      removeProductPurchase={(productPurchaseCode) =>
        productPurchasesViewModel.removeProductPurchase(productPurchaseCode)
      }
    />
  );

  const suppliersInput = state.isSearchingSuppliers ? (
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
            (s) => s.code === selectedCode
          );
        }

        if (selectedSupplier) {
          productPurchasesViewModel.changeSupplierField(selectedSupplier.name);
          productPurchasesViewModel.changeSupplierCode(selectedSupplier.code);
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

  const partsInput = state.isSearchingParts ? (
    <Loader />
  ) : state.isPartsNotFound ? (
    <div className="information-value">Itens não encontrados</div>
  ) : (
    <select
      className="piece-input"
      name="parts"
      id="piece"
      value={state.pieceCode}
      onChange={(e) => {
        const selectedCode = Number(e.target.value);
        let selectedPiece;

        if (state.parts) {
          selectedPiece = state.parts.find((p) => p.code === selectedCode);
        }

        if (selectedPiece) {
          productPurchasesViewModel.changePieceField(selectedPiece.name);
          productPurchasesViewModel.changePieceCode(selectedPiece.code);
        }
      }}
    >
      {state.parts?.map((piece) => (
        <option key={piece.code} value={piece.code}>
          {piece.name}
        </option>
      ))}
    </select>
  );

  return (
    <div className="product-purchases">
      <div className="header">
        <div className="message">Compras de Produto</div>

        <button
          className="new-product-purchase-button"
          onClick={() => productPurchasesViewModel.openModal(true)}
        >
          Registrar Compra
        </button>
      </div>

      {productPurchasesTable}

      <div
        className="product-purchase-modal"
        style={{ display: state.showCreateModal ? "flex" : "none" }}
      >
        <div className="product-purchase-modal-title">Registrar Compra</div>

        <form className="product-purchase-modal-form">
          <label className="supplier-label" htmlFor="">
            Fornecedor:
          </label>
          {suppliersInput}

          <label className="piece-label" htmlFor="">
            Peça:
          </label>
          {partsInput}

          <label className="quantity-label" htmlFor="quantity">
            Quantidade:
          </label>
          <input
            className="quantity-input"
            type="number"
            id="quantity"
            value={state.quantityField}
            onChange={(e) =>
              productPurchasesViewModel.changeQuantityField(
                parseInt(e.target.value)
              )
            }
          />

          <label className="value-label" htmlFor="value">
            Valor:
          </label>
          <input
            className="value-input"
            type="number"
            id="value"
            value={state.valueField}
            onChange={(e) =>
              productPurchasesViewModel.changeValueField(
                parseInt(e.target.value)
              )
            }
          />

          <label className="date-label" htmlFor="date">
            Data:
          </label>
          <input
            className="date-input"
            type="date"
            id="date"
            value={state.dateField}
            onChange={(e) =>
              productPurchasesViewModel.changeDateField(e.target.value)
            }
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={!state.allowedToCreateProductPurchase}
            onClick={() => {
              const [year, month, day] = state.dateField.split("-").map(Number);
              const localDate = new Date(year, month - 1, day);

              productPurchasesViewModel.createProductPurchase({
                supplierId: state.supplierCode,
                pieceId: state.pieceCode,
                quantity: state.quantityField,
                value: state.valueField,
                date: localDate,
              });
            }}
          >
            Salvar
          </button>
          <button
            type="submit"
            className="cancel-register"
            onClick={() => productPurchasesViewModel.closeModal()}
          >
            Cancelar
          </button>
        </div>
      </div>
      <div
        className="product-purchase-modal"
        style={{ display: state.showEditModal ? "flex" : "none" }}
      >
        <div className="product-purchase-modal-title">Editar Compra</div>

        <form className="product-purchase-modal-form">
          <label className="supplier-label" htmlFor="">
            Fornecedor:
          </label>
          {suppliersInput}

          <label className="piece-label" htmlFor="">
            Peça:
          </label>
          {partsInput}

          <label className="quantity-label" htmlFor="quantity">
            Quantidade:
          </label>
          <input
            className="quantity-input"
            type="number"
            id="quantity"
            value={state.quantityField}
            onChange={(e) =>
              productPurchasesViewModel.changeQuantityField(
                parseInt(e.target.value)
              )
            }
          />

          <label className="value-label" htmlFor="value">
            Valor:
          </label>
          <input
            className="value-input"
            type="number"
            id="value"
            value={state.valueField}
            onChange={(e) =>
              productPurchasesViewModel.changeValueField(
                parseInt(e.target.value)
              )
            }
          />

          <label className="date-label" htmlFor="date">
            Data:
          </label>
          <input
            className="date-input"
            type="date"
            id="date"
            value={state.dateField}
            onChange={(e) =>
              productPurchasesViewModel.changeDateField(e.target.value)
            }
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={!state.allowedToCreateProductPurchase}
            onClick={() => {
              const [year, month, day] = state.dateField.split("-").map(Number);
              const localDate = new Date(year, month - 1, day);

              productPurchasesViewModel.editProductPurchase({
                id: state.productPurchaseCode,
                supplierId: state.supplierCode,
                pieceId: state.pieceCode,
                quantity: state.quantityField,
                value: state.valueField,
                date: localDate,
              });
            }}
          >
            Salvar
          </button>
          <button
            type="submit"
            className="cancel-register"
            onClick={() => productPurchasesViewModel.closeModal()}
          >
            Cancelar
          </button>
        </div>
      </div>

      <Toast
        message={state.message}
        status={state.toastStatus}
        show={state.showToast}
      />
    </div>
  );
};

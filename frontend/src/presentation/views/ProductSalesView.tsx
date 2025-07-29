import React, { useEffect, useMemo, useState } from "react";

import { ProductSalesViewModelFactory } from "../../app/providers/di/ProductSalesViewModelFactory";

import { Loader } from "../components/Loader";
import { Toast } from "../components/Toast";
import { ProductSalesTable } from "../components/ProductSalesTable";

interface ProductSalesViewProps {
  productSalesViewModelFactory: ProductSalesViewModelFactory;
}

export const ProductSalesView: React.FC<ProductSalesViewProps> = ({
  productSalesViewModelFactory,
}) => {
  const productSalesViewModel = useMemo(
    () => productSalesViewModelFactory.makeProductSalesViewModel(),
    []
  );

  const [state, setState] = useState(productSalesViewModel.state);

  useEffect(() => {
    productSalesViewModel.stateListener = setState;

    return () => {
      productSalesViewModel.stateListener = setState;
    };
  });

  useEffect(() => {
    productSalesViewModel.getProductSales();
    productSalesViewModel.getCustomers();
    productSalesViewModel.getParts();
  }, []);

  const productSalesTable = state.isSearchingProductSales ? (
    <Loader />
  ) : state.isProductSalesNotFound ? (
    <div className="information-value">Vendas não encontradas</div>
  ) : (
    <ProductSalesTable
      productSales={state.productSales != null ? state.productSales : []}
      customers={state.customers != null ? state.customers : []}
      parts={state.parts != null ? state.parts : []}
      openModal={(isCreateModal) =>
        productSalesViewModel.openModal(isCreateModal)
      }
      changeProductSaleCode={(productSaleCode) =>
        productSalesViewModel.changeProductSaleCode(productSaleCode)
      }
      removeProductSale={(productSaleCode) =>
        productSalesViewModel.removeProductSale(productSaleCode)
      }
    />
  );

  const customersInput = state.isSearchingCustomers ? (
    <Loader />
  ) : state.isCustomersNotFound ? (
    <div className="information-value">Clientes não encontrados</div>
  ) : (
    <select
      className="customer-input"
      name="customers"
      id="customer"
      value={state.customerCode}
      onChange={(e) => {
        const selectedCode = Number(e.target.value);
        let selectedCustomer;

        if (state.customers) {
          selectedCustomer = state.customers.find(
            (c) => c.code === selectedCode
          );
        }

        if (selectedCustomer) {
          productSalesViewModel.changeCustomerField(selectedCustomer.name);
          productSalesViewModel.changeCustomerCode(selectedCustomer.code);
        }
      }}
    >
      {state.customers?.map((customer) => (
        <option key={customer.code} value={customer.code}>
          {customer.name}
        </option>
      ))}
    </select>
  );

  const partsInput = state.isSearchingParts ? (
    <Loader />
  ) : state.isPartsNotFound ? (
    <div className="information-value">Peças não encontradas</div>
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
          selectedPiece = state.parts.find((c) => c.code === selectedCode);
        }

        if (selectedPiece) {
          productSalesViewModel.changeCustomerField(selectedPiece.name);
          productSalesViewModel.changeCustomerCode(selectedPiece.code);
        }
      }}
    >
      {state.parts?.map((customer) => (
        <option key={customer.code} value={customer.code}>
          {customer.name}
        </option>
      ))}
    </select>
  );

  return (
    <div className="product-sales">
      <div className="header">
        <div className="message">Vendas de Produto</div>

        <button
          className="new-product-sale-button"
          onClick={() => productSalesViewModel.openModal(true)}
        >
          Registrar Venda
        </button>
      </div>

      {productSalesTable}

      <div
        className="product-sale-modal"
        style={{ display: state.showCreateModal ? "flex" : "none" }}
      >
        <div className="product-sale-modal-title">Registrar Venda</div>

        <form className="product-sale-modal-form">
          <label className="customer-label" htmlFor="">
            Cliente:
          </label>
          {customersInput}

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
              productSalesViewModel.changeQuantityField(
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
              productSalesViewModel.changeValueField(parseInt(e.target.value))
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
              productSalesViewModel.changeDateField(e.target.value)
            }
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={!state.allowedToCreateProductSale}
            onClick={() => console.log("Cadastrando venda...")}
          >
            Salvar
          </button>
          <button
            type="submit"
            className="cancel-register"
            onClick={() => productSalesViewModel.closeModal()}
          >
            Cancelar
          </button>
        </div>
      </div>

      <div
        className="product-sale-modal"
        style={{ display: state.showEditModal ? "flex" : "none" }}
      >
        <div className="product-sale-modal-title">Editar Venda</div>

        <form className="product-sale-modal-form">
          <label className="customer-label" htmlFor="">
            Cliente:
          </label>
          {customersInput}

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
              productSalesViewModel.changeQuantityField(
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
              productSalesViewModel.changeValueField(parseInt(e.target.value))
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
              productSalesViewModel.changeDateField(e.target.value)
            }
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={!state.allowedToCreateProductSale}
            onClick={() => console.log("Editando venda...")}
          >
            Salvar
          </button>
          <button
            type="submit"
            className="cancel-register"
            onClick={() => productSalesViewModel.closeModal()}
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

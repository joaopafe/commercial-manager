import { FC } from "react";

import { ProductSaleLine } from "./ProductSaleLine";

import { ProductSale } from "../../domain/entities/ProductSale";
import { Customer } from "../../domain/entities/Customer";
import { Piece } from "../../domain/entities/Piece";

interface ProductSalesTableProps {
  productSales: ProductSale[];
  customers: Customer[];
  parts: Piece[];
  openModal(isCreateModal: boolean): void;
  changeProductSaleCode(productSaleCode: number): void;
  removeProductSale(productSaleCode: number): void;
}

export const ProductSalesTable: FC<ProductSalesTableProps> = ({
  productSales,
  customers,
  parts,
  openModal,
  changeProductSaleCode,
  removeProductSale,
}) => {
  const productSaleLines = productSales.map((productSale) => {
    const customer = customers.find((customer) => {
      return customer.code === productSale.clientId;
    });

    const piece = parts.find((piece) => {
      return piece.code === productSale.pieceId;
    });

    return (
      <ProductSaleLine
        code={productSale.id}
        quantity={productSale.quantity}
        pieceName={piece ? piece.name : ""}
        clientName={customer ? customer.name : ""}
        value={productSale.value}
        date={productSale.date}
        openModal={openModal}
        changeProductSaleCode={changeProductSaleCode}
        removeProductSale={removeProductSale}
        key={productSale.id}
      />
    );
  });

  return (
    <table className="product-sales-table">
      <thead className="product-sales-table-head">
        <tr>
          <th
            className="product-sale-table-head-column"
            id="product-sale-code-head"
          >
            Código
          </th>
          <th
            className="product-sale-table-head-column"
            id="product-sale-piece-name-head"
          >
            Item
          </th>
          <th
            className="product-sale-table-head-column"
            id="product-sale-quantity-head"
          >
            Quantidade
          </th>
          <th
            className="product-sale-table-head-column"
            id="product-sale-client-name-head"
          >
            Cliente
          </th>
          <th
            className="product-sale-table-head-column"
            id="product-sale-value-head"
          >
            Valor
          </th>
          <th
            className="product-sale-table-head-column"
            id="product-sale-date-head"
          >
            Data
          </th>
          <th
            className="product-sale-table-head-column"
            id="product-sale-actions-head"
          >
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="product-sales-body">{productSaleLines}</tbody>
    </table>
  );
};

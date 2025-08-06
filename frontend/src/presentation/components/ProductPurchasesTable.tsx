import { FC } from "react";

import { ProductPurchaseLine } from "./ProductPurchaseLine";

import { ProductPurchase } from "../../domain/entities/ProductPurchase";
import { Supplier } from "../../domain/entities/Supplier";
import { Piece } from "../../domain/entities/Piece";

interface ProductPurchasesTableProps {
  productPurchases: ProductPurchase[];
  suppliers: Supplier[];
  parts: Piece[];
  openModal(isCreateModal: boolean): void;
  changeProductPurchaseCode(productPurchaseCode: number): void;
  removeProductPurchase(productPurchaseCode: number): void;
}

export const ProductPurchasesTable: FC<ProductPurchasesTableProps> = ({
  productPurchases,
  suppliers,
  parts,
  openModal,
  changeProductPurchaseCode,
  removeProductPurchase,
}) => {
  const productPurchaseLines = productPurchases.map((productPurchase) => {
    const supplier = suppliers.find((supplier) => {
      return supplier.code === productPurchase.supplierId;
    });

    const piece = parts.find((piece) => {
      return piece.code === productPurchase.pieceId;
    });

    return (
      <ProductPurchaseLine
        code={productPurchase.id}
        supplierName={supplier ? supplier.name : ""}
        pieceName={piece ? piece.name : ""}
        quantity={productPurchase.quantity}
        value={productPurchase.value}
        date={productPurchase.date}
        key={productPurchase.id}
        openModal={openModal}
        changeProductPurchaseCode={changeProductPurchaseCode}
        removeProductPurchase={removeProductPurchase}
      />
    );
  });

  return (
    <table className="product-purchases-table">
      <thead className="product-purchases-table-head">
        <tr>
          <th
            className="product-purchase-table-head-column"
            id="product-purchase-code-head"
          >
            Código
          </th>
          <th
            className="product-purchase-table-head-column"
            id="product-purchase-supplier-name-head"
          >
            Fornecedor
          </th>
          <th
            className="product-purchase-table-head-column"
            id="product-purchase-piece-name-head"
          >
            Item
          </th>
          <th
            className="product-purchase-table-head-column"
            id="product-purchase-quantity-head"
          >
            Quantidade
          </th>
          <th
            className="product-purchase-table-head-column"
            id="product-purchase-value-head"
          >
            Valor
          </th>
          <th
            className="product-purchase-table-head-column"
            id="product-purchase-date-head"
          >
            Data
          </th>
          <th
            className="product-purchase-table-head-column"
            id="product-purchase-actions-head"
          >
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="product-purchases-bode">{productPurchaseLines}</tbody>
    </table>
  );
};

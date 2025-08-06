import { FC } from "react";

export interface ProductPurchaseProps {
  code: number;
  supplierName: string;
  pieceName: string;
  quantity: number;
  value: number;
  date: Date;
}

export interface ProductPurchaseLineProps extends ProductPurchaseProps {
  openModal(isCreateModal: boolean): void;
  changeProductPurchaseCode(productPurchaseCode: number): void;
  removeProductPurchase(productPurchaseCode: number): void;
}

export const ProductPurchaseLine: FC<ProductPurchaseLineProps> = ({
  code,
  supplierName,
  pieceName,
  quantity,
  value,
  date,
  openModal,
  changeProductPurchaseCode,
  removeProductPurchase,
}) => {
  return (
    <tr className="product-purchase-line" key={code}>
      <td className="product-purchase-code">{code}</td>
      <td className="product-purchase-supplier-name">{supplierName}</td>
      <td className="product-purchase-piece-name">{pieceName}</td>
      <td className="product-purchase-quantity">{quantity}</td>
      <td className="product-purchase-value">{value}</td>
      <td className="product-purchase-code">{date.toLocaleDateString()}</td>
      <td className="product-purchase-actions">
        <button
          className="edit-button"
          onClick={() => {
            changeProductPurchaseCode(code);
            openModal(false);
          }}
        >
          Editar
        </button>
        <button
          className="exclude-button"
          onClick={() => {
            removeProductPurchase(code);
          }}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};

import { FC } from "react";

export interface ProductSaleProps {
  code: number;
  clientName: string;
  pieceName: string;
  quantity: number;
  value: number;
  date: Date;
}

export interface ProductSaleLineProps extends ProductSaleProps {
  openModal(isCreateModal: boolean): void;
  changeProductSaleCode(productSaleCode: number): void;
  removeProductSale(productSaleCode: number): void;
}

export const ProductSaleLine: FC<ProductSaleLineProps> = ({
  code,
  clientName,
  pieceName,
  quantity,
  value,
  date,
  openModal,
  changeProductSaleCode,
  removeProductSale,
}) => {
  return (
    <tr className="product-sale-line" key={code}>
      <td className="product-sale-code">{code}</td>
      <td className="product-sale-piece-name">{pieceName}</td>
      <td className="product-sale-quantity">{quantity}</td>
      <td className="product-sale-client-name">{clientName}</td>
      <td className="product-sale-value">{value}</td>
      <td className="product-sale-date">{date.toLocaleDateString()}</td>
      <td className="product-sale-actions">
        <button className="edit-button" onClick={() => openModal(false)}>
          Editar
        </button>
        <button
          className="exclude-button"
          onClick={() => console.log("Excluindo venda...")}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};

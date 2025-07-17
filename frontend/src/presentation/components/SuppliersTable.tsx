import { FC } from "react";

import { SupplierLine } from "./SupplierLine";

import { SupplierProps as Supplier } from "./SupplierLine";

interface SupplierTableProps {
  suppliers: Supplier[];
  openModal(isCreateModal: boolean): void;
  changeSupplierCode(supplierCode: number): void;
  removeSupplier(supplierCode: number): void;
}

export const SuppliersTable: FC<SupplierTableProps> = ({
  suppliers,
  openModal,
  changeSupplierCode,
  removeSupplier,
}) => {
  const supplierLines = suppliers.map((supplier) => {
    return (
      <SupplierLine
        code={supplier.code}
        cnpj={supplier.cnpj}
        name={supplier.name}
        phone={supplier.phone}
        key={supplier.code}
        openModal={openModal}
        changeSupplierCode={changeSupplierCode}
        removeSupplier={removeSupplier}
      />
    );
  });

  return (
    <table className="suppliers-table">
      <thead className="suppliers-table-head">
        <tr>
          <th className="suppliers-table-head-column" id="supplier-code-head">
            Código
          </th>
          <th className="suppliers-table-head-column" id="supplier-cnpj-head">
            CNPJ
          </th>
          <th className="suppliers-table-head-column" id="supplier-name-head">
            Nome
          </th>
          <th className="suppliers-table-head-column" id="supplier-phone-head">
            Telefone
          </th>
          <th
            className="suppliers-table-head-column"
            id="supplier-actions-head"
          >
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="suppliers-table-body">{supplierLines}</tbody>
    </table>
  );
};

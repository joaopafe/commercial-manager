import { FC } from "react";

import { SupplierLine } from "./SupplierLine";

import { SupplierProps as Supplier } from "./SupplierLine";

interface SupplierTableProps {
  suppliers: Supplier[];
}

export const SuppliersTable: FC<SupplierTableProps> = ({ suppliers }) => {
  const supplierLines = suppliers.map((supplier) => {
    return (
      <SupplierLine
        code={supplier.code}
        cnpj={supplier.cnpj}
        name={supplier.name}
        phone={supplier.phone}
        key={supplier.code}
      />
    );
  });

  return (
    <table className="suppliers-table">
      <thead className="suppliers-table-head">
        <tr>
          <th className="suppliers-table-head-column" id="supplier-code-head">
            Códigp
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

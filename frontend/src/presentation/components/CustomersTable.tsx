import { FC } from "react";

import { CustomerLine } from "./CustomerLine";

import { CustomerProps as Customer } from "./CustomerLine";

interface CustomerTableProps {
  customers: Customer[];
  openModal(isCreateModal: boolean): void;
  changeCustomerCode(customerCode: number): void;
}

export const CustomersTable: FC<CustomerTableProps> = ({
  customers,
  openModal,
  changeCustomerCode,
}) => {
  const customerLines = customers.map((customer) => {
    return (
      <CustomerLine
        code={customer.code}
        cpf={customer.cpf}
        name={customer.name}
        email={customer.email}
        phone={customer.phone}
        key={customer.code}
        openModal={openModal}
        changeCustomerCode={changeCustomerCode}
      />
    );
  });

  return (
    <table className="customers-table">
      <thead className="customers-table-head">
        <tr>
          <th className="customers-table-head-column" id="customer-code-head">
            Código
          </th>
          <th className="customers-table-head-column" id="customer-cpf-head">
            CPF
          </th>
          <th className="customers-table-head-column" id="customer-name-head">
            Nome
          </th>
          <th className="customers-table-head-column" id="customer-email-head">
            E-mail
          </th>
          <th className="customers-table-head-column" id="customer-phone-head">
            Telefone
          </th>
          <th className="customers-table-head-column" id="customer-action-head">
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="customers-table-body">{customerLines}</tbody>
    </table>
  );
};

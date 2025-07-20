import React, { useEffect, useMemo, useState } from "react";

import { CustomersManagerViewModelFactory } from "../../app/providers/di/CustomersManagerViewModelFactory";

import { Loader } from "../components/Loader";
import { Toast } from "../components/Toast";
import { CustomersTable } from "../components/CustomersTable";

interface CustomersManagerViewProps {
  customerManagerViewModelFactory: CustomersManagerViewModelFactory;
}

export const CustomersManagerView: React.FC<CustomersManagerViewProps> = ({
  customerManagerViewModelFactory,
}) => {
  const customersManagerViewModel = useMemo(
    () => customerManagerViewModelFactory.makeCustomersManagerViewModel(),
    []
  );

  const [state, setState] = useState(customersManagerViewModel.state);

  useEffect(() => {
    customersManagerViewModel.stateListener = setState;

    return () => {
      customersManagerViewModel.stateListener = setState;
    };
  });

  useEffect(() => {
    customersManagerViewModel.getCustomers();
  }, []);

  const customersTable = state.isSearching ? (
    <Loader />
  ) : state.isCustomersNotFound ? (
    <div className="information-value">Clientes não encontrados</div>
  ) : (
    <CustomersTable
      customers={state.customers != null ? state.customers : []}
      openModal={(isCreateModal) =>
        customersManagerViewModel.openModal(isCreateModal)
      }
      changeCustomerCode={(customerCode) =>
        customersManagerViewModel.changeCustomerCode(customerCode)
      }
      removeCustomer={(customerCode) =>
        customersManagerViewModel.removeCustomer(customerCode)
      }
    />
  );

  return (
    <div className="customers-manager">
      <div className="header">
        <div className="message">Gerenciamento de Clientes</div>

        <button
          className="new-customer-button"
          onClick={() => customersManagerViewModel.openModal(true)}
        >
          Novo Cliente
        </button>
      </div>

      {customersTable}

      <div
        className="customer-modal"
        style={{ display: state.showCreateModal ? "flex" : "none" }}
      >
        <div className="customer-modal-title">Cadastrar Cliente</div>

        <form className="customer-modal-form">
          <label className="cpf-label" htmlFor="cpf">
            CPF:
          </label>
          <input
            className="cpf-input"
            type="text"
            id="cpf"
            value={state.cpfField}
            onChange={(e) =>
              customersManagerViewModel.changeCustomerCPF(e.target.value)
            }
          />

          <label className="name-label" htmlFor="name">
            Name:
          </label>
          <input
            className="name-input"
            type="text"
            id="name"
            value={state.nameField}
            onChange={(e) =>
              customersManagerViewModel.changeCustomerName(e.target.value)
            }
          />

          <label className="email-label" htmlFor="email">
            E-mail:
          </label>
          <input
            className="email-input"
            type="text"
            id="email"
            value={state.emailField}
            onChange={(e) =>
              customersManagerViewModel.changeCustomerEmail(e.target.value)
            }
          />

          <label className="phone-label" htmlFor="phone">
            Telefone:
          </label>
          <input
            className="phone-input"
            type="text"
            id="phone"
            value={state.phoneField}
            onChange={(e) =>
              customersManagerViewModel.changeCustomerPhone(e.target.value)
            }
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={!state.allowedToCreateCustomer}
            onClick={() =>
              customersManagerViewModel.createCustomer({
                cpf: state.cpfField,
                name: state.nameField,
                email: state.emailField,
                phone: state.phoneField,
              })
            }
          >
            Salvar
          </button>

          <button
            type="submit"
            className="cancel-register"
            onClick={() => customersManagerViewModel.closeModal()}
          >
            Cancelar
          </button>
        </div>
      </div>

      <div
        className="customer-modal"
        style={{ display: state.showEditModal ? "flex" : "none" }}
      >
        <div className="customer-modal-title">Editar Cliente</div>

        <form className="customer-modal-form">
          <label className="cpf-label" htmlFor="cpf">
            CPF:
          </label>
          <input
            className="cpf-input"
            type="text"
            id="cpf"
            value={state.cpfField}
            onChange={(e) =>
              customersManagerViewModel.changeCustomerCPF(e.target.value)
            }
          />

          <label className="name-label" htmlFor="name">
            Name:
          </label>
          <input
            className="name-input"
            type="text"
            id="name"
            value={state.nameField}
            onChange={(e) =>
              customersManagerViewModel.changeCustomerName(e.target.value)
            }
          />

          <label className="email-label" htmlFor="email">
            E-mail:
          </label>
          <input
            className="email-input"
            type="text"
            id="email"
            value={state.emailField}
            onChange={(e) =>
              customersManagerViewModel.changeCustomerEmail(e.target.value)
            }
          />

          <label className="phone-label" htmlFor="phone">
            Telefone:
          </label>
          <input
            className="phone-input"
            type="text"
            id="phone"
            value={state.phoneField}
            onChange={(e) =>
              customersManagerViewModel.changeCustomerPhone(e.target.value)
            }
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={!state.allowedToCreateCustomer}
            onClick={() =>
              customersManagerViewModel.editCustomer({
                code: state.customerCode,
                cpf: state.cpfField,
                name: state.nameField,
                email: state.emailField,
                phone: state.phoneField,
              })
            }
          >
            Salvar
          </button>

          <button
            type="submit"
            className="cancel-register"
            onClick={() => customersManagerViewModel.closeModal()}
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

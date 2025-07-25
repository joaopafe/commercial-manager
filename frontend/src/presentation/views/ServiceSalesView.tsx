import React, { useEffect, useMemo, useState } from "react";

import { ServiceSalesViewModelFactory } from "../../app/providers/di/ServiceSalesViewModelFactory";

import { Loader } from "../components/Loader";
import { Toast } from "../components/Toast";
import { ServiceSalesTable } from "../components/ServiceSalesTable";

interface ServiceSalesViewProps {
  serviceSalesViewModelFactory: ServiceSalesViewModelFactory;
}

export const ServiceSalesView: React.FC<ServiceSalesViewProps> = ({
  serviceSalesViewModelFactory,
}) => {
  const serviceSalesViewModel = useMemo(
    () => serviceSalesViewModelFactory.makeServiceSalesViewModel(),
    []
  );

  const [state, setState] = useState(serviceSalesViewModel.state);

  useEffect(() => {
    serviceSalesViewModel.stateListener = setState;

    return () => {
      serviceSalesViewModel.stateListener = setState;
    };
  });

  useEffect(() => {
    serviceSalesViewModel.getServiceSales();
    serviceSalesViewModel.getCustomers();
  }, []);

  const serviceSalesTable = state.isSearchingServiceSales ? (
    <Loader />
  ) : state.isServiceSalesNotFound ? (
    <div className="information-value">Vendas não encontradas</div>
  ) : (
    <ServiceSalesTable
      serviceSales={state.serviceSales != null ? state.serviceSales : []}
      customers={state.customers != null ? state.customers : []}
      openModal={(isCreateModal) =>
        serviceSalesViewModel.openModal(isCreateModal)
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
          serviceSalesViewModel.changeCustomerField(selectedCustomer.name);
          serviceSalesViewModel.changeCustomerCode(selectedCustomer.code);
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

  return (
    <div className="service-sales">
      <div className="header">
        <div className="message">Vendas de Serviço</div>

        <button
          className="new-service-sale-button"
          onClick={() => serviceSalesViewModel.openModal(true)}
        >
          Registrar Venda
        </button>
      </div>

      {serviceSalesTable}

      <div
        className="service-sale-modal"
        style={{ display: state.showCreateModal ? "flex" : "none" }}
      >
        <div className="service-sale-modal-title">Registrar Venda</div>

        <form className="service-sale-modal-form">
          <label className="customer-label" htmlFor="">
            Cliente:
          </label>
          {customersInput}

          <label className="description-label" htmlFor="description">
            Descrição:
          </label>
          <input
            className="description-input"
            type="text"
            id="description"
            value={""}
            onChange={(e) => console.log(e.target.value)}
          />

          <label className="value-label" htmlFor="value">
            Valor:
          </label>
          <input
            className="value-input"
            type="number"
            id="value"
            value={1}
            onChange={(e) => console.log(e.target.value)}
          />

          <label className="date-label" htmlFor="date">
            Data:
          </label>
          <input
            className="date-input"
            type="date"
            id="date"
            value={"15/09/2024"}
            onChange={(e) => console.log(e.target.value)}
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={false}
            onClick={() => console.log("Registrando venda...")}
          >
            Salvar
          </button>
          <button
            type="submit"
            className="cancel-register"
            onClick={() => console.log("Cancelando venda")}
          >
            Cancelar
          </button>
        </div>
      </div>

      <div
        className="service-sale-modal"
        style={{ display: state.showEditModal ? "flex" : "none" }}
      >
        <div className="service-sale-modal-title">Editar Venda</div>

        <form className="service-sale-modal-form">
          <label className="customer-label" htmlFor="">
            Cliente:
          </label>
          {customersInput}

          <label className="description-label" htmlFor="description">
            Descrição:
          </label>
          <input
            className="description-input"
            type="text"
            id="description"
            value={""}
            onChange={(e) => console.log(e.target.value)}
          />

          <label className="value-label" htmlFor="value">
            Valor:
          </label>
          <input
            className="value-input"
            type="number"
            id="value"
            value={1}
            onChange={(e) => console.log(e.target.value)}
          />

          <label className="date-label" htmlFor="date">
            Data:
          </label>
          <input
            className="date-input"
            type="datetime-local"
            id="date"
            value={"15/09/2024"}
            onChange={(e) => console.log(e.target.value)}
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={false}
            onClick={() => console.log("Editando venda...")}
          >
            Salvar
          </button>
          <button
            type="submit"
            className="cancel-register"
            onClick={() => console.log("Cancelando edição")}
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

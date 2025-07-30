import React, { useEffect, useMemo, useState } from "react";

import { ServicePurchasesViewModelFactory } from "../../app/providers/di/ServicePurchasesViewModelFactory";

import { Loader } from "../components/Loader";
import { Toast } from "../components/Toast";
import { ServicePurchasesTable } from "../components/ServicePurchasesTable";

interface ServicePurchasesViewProps {
  servicePurchasesViewModelFactory: ServicePurchasesViewModelFactory;
}

export const ServicePurchasesView: React.FC<ServicePurchasesViewProps> = ({
  servicePurchasesViewModelFactory,
}) => {
  const servicePurchasesViewModel = useMemo(
    () => servicePurchasesViewModelFactory.makeServicePurchasesViewModel(),
    []
  );

  const [state, setState] = useState(servicePurchasesViewModel.state);

  useEffect(() => {
    servicePurchasesViewModel.stateListener = setState;

    return () => {
      servicePurchasesViewModel.stateListener = setState;
    };
  });

  useEffect(() => {
    servicePurchasesViewModel.getServicePurchases();
    servicePurchasesViewModel.getSuppliers();
  }, []);

  const servicePurchasesTable = state.isSearchingServicePurchases ? (
    <Loader />
  ) : state.isServicePurchasesNotFound ? (
    <div className="information-value">Compras não encontradas</div>
  ) : (
    <ServicePurchasesTable
      servicePurchases={
        state.servicePurchases != null ? state.servicePurchases : []
      }
      suppliers={state.suppliers != null ? state.suppliers : []}
      openModal={(isCreateModal) =>
        servicePurchasesViewModel.openModal(isCreateModal)
      }
      changeServicePurchaseCode={(servicePurchaseCode) =>
        servicePurchasesViewModel.changeServicePurchaseCode(servicePurchaseCode)
      }
      removeServicePurchase={() => console.log("Removendo compra...")}
    />
  );

  const suppliersInput = state.isSearchingSuppliers ? (
    <Loader />
  ) : state.isSuppliersNotFound ? (
    <div className="information-value">Fornecedores não encontrados</div>
  ) : (
    <select
      className="supplier-input"
      name="suppliers"
      id="supplier"
      value={state.supplierCode}
      onChange={(e) => {
        const selectedCode = Number(e.target.value);
        let selectedCustomer;

        if (state.suppliers) {
          selectedCustomer = state.suppliers.find(
            (c) => c.code === selectedCode
          );
        }
        if (selectedCustomer) {
          servicePurchasesViewModel.changeSupplierField(selectedCustomer.name);
          servicePurchasesViewModel.changeSupplierCode(selectedCustomer.code);
        }
      }}
    >
      {state.suppliers?.map((supplier) => (
        <option key={supplier.code} value={supplier.code}>
          {supplier.name}
        </option>
      ))}
    </select>
  );

  return (
    <div>
      <div className="service-purchases">
        <div className="header">
          <div className="message">Compras de Serviço</div>

          <button
            className="new-service-purchase-button"
            onClick={() => servicePurchasesViewModel.openModal(true)}
          >
            Registrar Compra
          </button>
        </div>

        {servicePurchasesTable}

        <div
          className="service-purchase-modal"
          style={{ display: state.showCreateModal ? "flex" : "none" }}
        >
          <div className="service-purchase-modal-title">Registrar Compra</div>

          <form className="service-purchase-modal-form">
            <label className="supplier-label" htmlFor="">
              Fornecedor:
            </label>
            {suppliersInput}

            <label className="description-label" htmlFor="description">
              Descrição:
            </label>
            <input
              className="description-input"
              type="text"
              id="description"
              value={state.descriptionField}
              onChange={(e) =>
                servicePurchasesViewModel.changeDescriptionField(e.target.value)
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
                servicePurchasesViewModel.changeValueField(
                  parseInt(e.target.value)
                )
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
                servicePurchasesViewModel.changeDateField(e.target.value)
              }
            />
          </form>

          <div className="modal-buttons">
            <button
              type="submit"
              className="confirm-register"
              disabled={!state.allowedToCreateServicePurchase}
              onClick={() => {
                //   const [year, month, day] = state.dateField.split("-").map(Number);
                //   const localDate = new Date(year, month - 1, day);

                //   servicePurchasesViewModel.createServicePurchase({
                //     supplierId: state.supplierCode,
                //     name: state.descriptionField,
                //     value: state.valueField,
                //     date: localDate,
                //   });
                // }}
                console.log("Cadastrando compra...");
              }}
            >
              Salvar
            </button>
            <button
              type="submit"
              className="cancel-register"
              onClick={() => servicePurchasesViewModel.closeModal()}
            >
              Cancelar
            </button>
          </div>
        </div>

        <div
          className="service-purchase-modal"
          style={{ display: state.showEditModal ? "flex" : "none" }}
        >
          <div className="service-purchase-modal-title">Editar Compra</div>

          <form className="service-purchase-modal-form">
            <label className="supplier-label" htmlFor="">
              Fornecedor:
            </label>
            {suppliersInput}

            <label className="description-label" htmlFor="description">
              Descrição:
            </label>
            <input
              className="description-input"
              type="text"
              id="description"
              value={state.descriptionField}
              onChange={(e) =>
                servicePurchasesViewModel.changeDescriptionField(e.target.value)
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
                servicePurchasesViewModel.changeValueField(
                  parseInt(e.target.value)
                )
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
                servicePurchasesViewModel.changeDateField(e.target.value)
              }
            />
          </form>

          <div className="modal-buttons">
            <button
              type="submit"
              className="confirm-register"
              disabled={!state.allowedToCreateServicePurchase}
              onClick={() => {
                //   const [year, month, day] = state.dateField.split("-").map(Number);
                //   const localDate = new Date(year, month - 1, day);

                //   servicePurchasesViewModel.editServicePurchase({
                //     supplierId: state.supplierCode,
                //     name: state.descriptionField,
                //     value: state.valueField,
                //     date: localDate,
                //   });
                // }}
                console.log("Editando compra...");
              }}
            >
              Salvar
            </button>
            <button
              type="submit"
              className="cancel-register"
              onClick={() => servicePurchasesViewModel.closeModal()}
            >
              Cancelar
            </button>
          </div>
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

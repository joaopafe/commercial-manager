import React, { useEffect, useMemo, useState } from "react";

import { SuppliersManagerViewModelFactory } from "../../app/providers/di/SuppliersManagerViewModelFactory";

import { SuppliersTable } from "../components/SuppliersTable";
import { Loader } from "../components/Loader";

interface SuppliersManagerViewProps {
  supplierManagerViewModelFactory: SuppliersManagerViewModelFactory;
}

export const SuppliersManagerView: React.FC<SuppliersManagerViewProps> = ({
  supplierManagerViewModelFactory,
}) => {
  const suppliersManagerViewModel = useMemo(
    () => supplierManagerViewModelFactory.makeSuppliersManagerViewModel(),
    []
  );

  const [state, setState] = useState(suppliersManagerViewModel.state);

  useEffect(() => {
    suppliersManagerViewModel.stateListener = setState;

    return () => {
      suppliersManagerViewModel.stateListener = null;
    };
  });

  useEffect(() => {
    suppliersManagerViewModel.getSuppliers();
  }, []);

  const suppliersTable = state.isSearching ? (
    <Loader />
  ) : state.isSuppliersNotFound ? (
    <div className="information-value">Fornecedores não encontrados</div>
  ) : (
    <SuppliersTable
      suppliers={state.suppliers != null ? state.suppliers : []}
    />
  );

  return (
    <div className="suppliers-manager">
      <div className="header">
        <div className="message">Gerenciamento de Fornecedores</div>

        <button className="new-supplier-button">Novo Fornecedor</button>
      </div>

      {suppliersTable}

      <div className="supplier-modal" style={{ display: "none" }}>
        <div className="supplier-modal-title">Cadastrar Fornecedor</div>

        <form className="supplier-modal-form">
          <label className="cnpj-label" htmlFor="cnpj">
            CNPJ:
          </label>
          <input className="cnpj-input" type="text" id="cnpj" />

          <label className="name-label" htmlFor="cnpj">
            Nome:
          </label>
          <input className="name-input" type="text" id="cnpj" />

          <label className="phone-label" htmlFor="cnpj">
            Telefone:
          </label>
          <input className="phone-input" type="text" id="cnpj" />
        </form>

        <div className="modal-buttons">
          <button type="submit" className="confirm-register">
            Salvar
          </button>

          <button type="submit" className="cancel-register">
            Cancelar
          </button>
        </div>
      </div>

      <div className="supplier-modal" style={{ display: "none" }}>
        <div className="supplier-modal-title">Editar Fornecedor</div>

        <form className="supplier-modal-form">
          <label className="cnpj-label" htmlFor="cnpj">
            CNPJ:
          </label>
          <input className="cnpj-input" type="text" id="cnpj" />

          <label className="name-label" htmlFor="cnpj">
            Nome:
          </label>
          <input className="name-input" type="text" id="cnpj" />

          <label className="phone-label" htmlFor="cnpj">
            Telefone:
          </label>
          <input className="phone-input" type="text" id="cnpj" />
        </form>

        <div className="modal-buttons">
          <button type="submit" className="confirm-register">
            Salvar
          </button>

          <button type="submit" className="cancel-register">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

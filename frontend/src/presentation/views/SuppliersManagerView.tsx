import { SuppliersTable } from "../components/SuppliersTable";

export const SuppliersManagerView = () => {
  return (
    <div className="suppliers-manager">
      <div className="header">
        <div className="message">Gerenciamento de Fornecedores</div>

        <button className="new-supplier-button">Novo Fornecedor</button>
      </div>
      <SuppliersTable
        suppliers={[
          {
            code: 1,
            cnpj: "12.345.678/0001-90",
            name: "Auto Partes LTDA",
            phone: "(15) 99231-2001",
          },
          {
            code: 2,
            cnpj: "16.456.965/0001-77",
            name: "Freios Brasil",
            phone: "(11) 3324-2132",
          },
          {
            code: 3,
            cnpj: "11.314.556/0001-43",
            name: "GM",
            phone: "(19) 4321-4344",
          },
          {
            code: 4,
            cnpj: "10.617.432/0001-31",
            name: "Bosh",
            phone: "(11) 3232-3910",
          },
        ]}
      />

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

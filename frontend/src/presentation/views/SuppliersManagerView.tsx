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
    </div>
  );
};

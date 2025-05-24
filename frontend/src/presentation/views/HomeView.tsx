import { SaleTable } from "../components/SaleTable";

export const HomeView = () => {
  return (
    <div className="home">
      <div className="message">Bem-vindo, Usuário</div>

      <div className="main-informations">
        <div className="information-card" id="sales-today">
          <div className="information-name">Vendas Hoje</div>
          <div className="information-value">R$ 1.250,00</div>
        </div>

        <div className="information-card" id="cash">
          <div className="information-name">Total em caixa</div>
          <div className="information-value">R$ 7.840,00</div>
        </div>
      </div>

      <div className="last-sales">
        <div className="last-sales-title">Últimas vendas</div>

        <SaleTable
          sales={[
            {
              clientName: "José da Silva",
              saleValue: 23.5,
              date: new Date().toLocaleDateString(),
            },
            {
              clientName: "Antônio Ferreira",
              saleValue: 120.7,
              date: new Date().toLocaleDateString(),
            },
            {
              clientName: "Itamar Pereira",
              saleValue: 876.5,
              date: new Date().toLocaleDateString(),
            },
          ]}
        />
      </div>
    </div>
  );
};

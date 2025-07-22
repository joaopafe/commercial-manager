import { Link } from "react-router-dom";

export const Aside = () => {
  return (
    <aside className="aside">
      <div className="company-name">Auto Peças</div>

      <div className="aside-links">
        <Link to="/">Início</Link>
        <Link to="/parts-manager">Itens</Link>
        <Link to="/stock">Estoque</Link>
        <Link to="/suppliers-manager">Fornecedores</Link>
        <Link to="/customers-manager">Clientes</Link>
        <div className="accordion">
          <details>
            <summary>Vendas</summary>
            <ul className="links-section">
              <li>
                <Link to="/service-sales">Vendas de serviço</Link>
              </li>
              <li>
                <Link to="/product-sales">Vendas de produto</Link>
              </li>
            </ul>
          </details>
        </div>
        <div className="accordion">
          <details>
            <summary>Compras</summary>
            <ul className="links-section">
              <li>
                <Link to="/service-purchases">Compras de serviço</Link>
              </li>
              <li>
                <Link to="/product-purchases">Compras de produto</Link>
              </li>
            </ul>
          </details>
        </div>
        <Link to="/cash">Caixa</Link>
        <Link to="/users">Usuários</Link>
        <Link to="/settings">Configurações</Link>
      </div>
    </aside>
  );
};

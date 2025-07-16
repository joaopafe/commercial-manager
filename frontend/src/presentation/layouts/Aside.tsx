import { Link } from "react-router-dom";

export const Aside = () => {
  return (
    <aside className="aside">
      <div className="company-name">Auto Peças</div>

      <div className="aside-links">
        <Link to="/">Início</Link>
        <Link to="/partsmanager">Itens</Link>
        <Link to="/stock">Estoque</Link>
        <Link to="/suppliersmanager">Fornecedores</Link>
        <Link to="/customers">Clientes</Link>
        <Link to="/sales">Vendas</Link>
        <Link to="/cash">Caixa</Link>
        <Link to="/users">Usuários</Link>
        <Link to="/settings">Configurações</Link>
      </div>
    </aside>
  );
};

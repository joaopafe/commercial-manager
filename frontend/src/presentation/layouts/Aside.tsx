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
        <Link to="/clientes">Clientes</Link>
        <Link to="/vendas">Vendas</Link>
        <Link to="/caixa">Caixa</Link>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/configuracoes">Configurações</Link>
      </div>
    </aside>
  );
};

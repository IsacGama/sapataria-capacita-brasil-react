import Header from '../componentes/header';
import Filter from '../componentes/filter';
import CardProduto from '../components/cardProduto';
import './produtosGeral.css';

export default function ProdutosGeral() {
  return (
    <div className="produtosGeral">
        <Header className="produtosGeral-header">
        </Header>

        <div className="produtosGeral-content">
            <Filter />
            <div className="produtosGeral-list">
              <CardProduto />
            </div>

        </div>
    </div>
  );
}
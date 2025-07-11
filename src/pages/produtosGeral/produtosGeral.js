import CardProduto from '../../Componentes/produtos/cardProduto/cardProduto';
import './produtosGeral.css';

export default function ProdutosGeral() {
  return (
    <div className="produtosGeral">
        <div className="produtosGeral-content">
            <div className="produtosGeral-list">
              <CardProduto />
            </div>

        </div>
    </div>
  );
}
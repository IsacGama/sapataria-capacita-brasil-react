import './cardProduto.css';

export default function CardProduto() {
    return(
        <div className="cardProduto">
            <div className="cardProduto-image">
                <img src="https://via.placeholder.com/150" alt="Produto" />
            </div>
            <div className="cardProduto-info">
                <h3>Nome do Produto</h3>
                <p>Descrição breve do produto.</p>
                <span>R$ 99,99</span>
            </div>
        </div>
    )

}
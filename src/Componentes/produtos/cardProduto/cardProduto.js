import { useState } from 'react';
import ButtonComprar from '../../Buttons/ButtonComprar';
import Stars from '../../Stars/Stars';
import './cardProduto.css';

function ProdutoCard({ produto }) {
  const [hover, setHover] = useState(false);
  const imagemPrincipal = produto.imagens[0];
  const segundaImagem = produto.imagens[1] || imagemPrincipal;

  const preco = produto.preco;

  return (
    <div 
      className='produto-card'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="produto-imagem-container">
        <img
          src={imagemPrincipal}
          alt={produto.nome}
          className={`produto-imagem ${hover ? 'fade-out' : 'fade-in'}`}
        />
        {segundaImagem && (
          <img
            src={segundaImagem}
            alt={produto.nome}
            className={`produto-imagem ${hover ? 'fade-in' : 'fade-out'}`}
          />
        )}
      </div>
      <div className='produto-informacoes'>
        <h3 className="produto-nome">{produto.nome}</h3>
        <Stars rating={produto.stars} size="medium" />
        <p className="produto-preco-sem-desconto">R$ {preco.semDesconto.toFixed(2)}</p>
        <div className="produto-opcoes-pagamento">
          <p className="produto-parcelado">
            {preco.parcelado[0].parcelas}x de R$ {preco.parcelado[0].valor.toFixed(2)} sem juros
          </p>
          <p className="produto-a-vista">
            ou R$ {preco.aVista.toFixed(2)} à vista (5% de desconto) no Pix
          </p>
        </div>
      </div>
      <ButtonComprar />
    </div>
  );
}

export default ProdutoCard;
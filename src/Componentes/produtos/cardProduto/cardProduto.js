import './cardProduto.css'

function ProdutoCard({ produto }) {
  const imagemPrincipal = produto.imagens[0];
  const preco = produto.preco;

  return (
    <div className='produto-card'>
      <img
        src={imagemPrincipal}
        alt={produto.nome}
        className="produto-imagem"
      />
      <div className='produto-informacoes'>
        <h3 className="produto-nome">{produto.nome}</h3>
        <p className="produto-preco">R$ {preco.aVista.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProdutoCard;
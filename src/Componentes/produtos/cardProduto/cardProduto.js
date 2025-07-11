function ProdutoCard({ produto }) {
  const imagemPrincipal = produto.imagens[0];
  const preco = produto.preco;

  return (
    <div>
      <img
        src={imagemPrincipal}
        alt={produto.nome}

      />
      <h3>{produto.nome}</h3>
      <p>{produto.descricao || 'Sem descrição'}</p>
      <p>
        <strong>À vista:</strong> R$ {preco.aVista.toFixed(2)}
      </p>
      <p>
        <strong>Parcelado:</strong>{' '}
        {preco.parcelado.map((p, i) => (
          <span key={i}>
            {p.parcelas}x de R$ {p.valor.toFixed(2)}{' '}
          </span>
        ))}
      </p>
    </div>
  );
}

export default ProdutoCard;
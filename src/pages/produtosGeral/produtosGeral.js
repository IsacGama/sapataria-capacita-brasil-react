import { useEffect, useState } from 'react';
import { getSapatos } from '../../utils/requestJson';
import ProdutoCard from '../../Componentes/produtos/cardProduto/cardProduto';

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      const data = await getSapatos();
      setProdutos(data);
    }
    carregarProdutos();
  }, []);

  return (
    <div>
      <h1>Todos os Produtos</h1>
      <div>
        {produtos.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}

export default Produtos;

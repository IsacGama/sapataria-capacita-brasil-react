import { useEffect, useState } from 'react';
import { getSapatos } from '../../utils/requestJson';
import ProdutoCard from '../../Componentes/produtos/cardProduto/cardProduto';
import FiltroLateral from '../../Componentes/Filtros/FiltroLateral';
import './ProdutosGeral.css';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [filtros, setFiltros] = useState({
    tipo: [],
    cor: [],
    precoMin: 200,
    precoMax: 2000,
  });
  const [filtroAberto, setFiltroAberto] = useState(false);

  useEffect(() => {
    async function carregarProdutos() {
      const data = await getSapatos();
      setProdutos(data);
    }
    carregarProdutos();
  }, []);

  const tiposUnicos = [...new Set(produtos.map(p => p.tipo))];
  const coresUnicas = [...new Set(produtos.map(p => p.cor).filter(Boolean))];

  const produtosFiltrados = produtos.filter(p => {
    const tipoOk = filtros.tipo.length === 0 || filtros.tipo.includes(p.tipo);
    const corOk = filtros.cor.length === 0 || filtros.cor.includes(p.cor || '');
    const preco = p.preco?.aVista || 0;
    const precoOk = preco >= filtros.precoMin && preco <= filtros.precoMax;
    return tipoOk && corOk && precoOk;
  });

  return (
    <div className="produtos-container">
        <button className="btn-abrir-filtro" onClick={() => setFiltroAberto(true)}>
          Mostrar Filtros
        </button>

      <div className="produtos-area">
        <h1 className="titulo-pagina">Todos os Produtos</h1>
        <div className="grid-produtos">
          {produtosFiltrados.map(produto => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>

      <FiltroLateral
        filtros={filtros}
        setFiltros={setFiltros}
        opcoes={{ tipos: tiposUnicos, cores: coresUnicas }}
        aberto={filtroAberto}
        setAberto={setFiltroAberto}
      />
    </div>
  );
}

export default Produtos;
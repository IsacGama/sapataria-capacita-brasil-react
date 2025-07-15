import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSapatos } from "../../utils/requestJson";
import ProdutoCard from "../../Componentes/produtos/cardProduto/cardProduto";
import FiltroLateral from "../../Componentes/Filtros/FiltroLateral";
import "./ProdutosGeral.css";
import Button from "../../Componentes/Buttons/Button";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [produtosExibidos, setProdutosExibidos] = useState(15);
  const [filtros, setFiltros] = useState({
    nome: "",
    tipo: [],
    cor: [],
    precoMin: 200,
    precoMax: 2000,
  });
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [searchParams] = useSearchParams();

  // Estado para o input de nome (valor inicial da URL)
  const [nomeInput, setNomeInput] = useState(searchParams.get("q") || "");

  // Carrega produtos ao montar o componente
  useEffect(() => {
    async function carregarProdutos() {
      const data = await getSapatos();
      setProdutos(data);
    }
    carregarProdutos();
  }, []);

  // Atualiza o filtro nome quando o debounce terminar
  useEffect(() => {
    const timer = setTimeout(() => {
      setFiltros(prev => ({ ...prev, nome: nomeInput }));
    }, 500); // 500ms de debounce
    
    return () => clearTimeout(timer);
  }, [nomeInput]);

  // Sincroniza com a URL quando ela muda
  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q !== nomeInput) {
      setNomeInput(q);
      setFiltros(prev => ({ ...prev, nome: q }));
    }
  }, [searchParams]);

  // Filtra os produtos
  const produtosFiltrados = produtos.filter((p) => {
    const nomeOk = !filtros.nome || p.nome.toLowerCase().includes(filtros.nome.toLowerCase());
    const tipoOk = filtros.tipo.length === 0 || filtros.tipo.includes(p.tipo);
    const corOk = filtros.cor.length === 0 || filtros.cor.includes(p.cor || "");
    const preco = p.preco?.aVista || 0;
    const precoOk = preco >= filtros.precoMin && preco <= filtros.precoMax;
    return nomeOk && tipoOk && corOk && precoOk;
  });

  // Tipos e cores disponíveis
  const tiposUnicos = [...new Set(produtosFiltrados.map((p) => p.tipo))];
  const coresUnicas = [...new Set(produtosFiltrados.map((p) => p.cor).filter(Boolean))];

  const carregarMaisProdutos = () => {
    setProdutosExibidos(prev => prev + 15);
  };

  const haMaisProdutosParaCarregar = produtosExibidos < produtosFiltrados.length;

  return (
    <div className="produtos-container">
      <div className="produtos-area">
        <Button
          title={"Abrir filtro"}
          onClick={() => setFiltroAberto(true)}
          variant="abrir-filtro"
        >
          Abrir Filtros
        </Button>

        <h1 className="titulo-pagina">Todos os Produtos</h1>

        <div className="grid-produtos">
          {produtosFiltrados.slice(0, produtosExibidos).map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>

        {haMaisProdutosParaCarregar && (
          <Button 
            onPress={carregarMaisProdutos}
            variant="primary"
            title={"Carregar mais produtos"} 
          />
        )}
      </div>

      <FiltroLateral
        aberto={filtroAberto}
        setAberto={setFiltroAberto}
        filtros={filtros}
        setFiltros={setFiltros}
        opcoes={{ tipos: tiposUnicos, cores: coresUnicas }}
        nomeInput={nomeInput}
        setNomeInput={setNomeInput}
      />
    </div>
  );
}

export default Produtos;
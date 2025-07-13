import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSapatos } from "../../utils/requestJson";
import { useDispatch } from "react-redux";
import { addItem } from "../../Componentes/Cart/CartSlice";

import Button from "../../Componentes/Buttons/Button";
import Stars from "../../Componentes/Stars/Stars";
import SelectSize from "../../Componentes/SelectSize/SelectSize";
import QuantitySelector from "../../Componentes/QuantitySelector/QuantitySelector";
import ProdutoCard from "../../Componentes/produtos/cardProduto/cardProduto";

import "./ProdutoEspecifico.css";

export default function ProdutoEspecifico() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const [lightboxImagem, setLightboxImagem] = useState(null);
  const miniaturaRef = useRef(null);
  const [mostrarSetas, setMostrarSetas] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const produto = produtos.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (miniaturaRef.current) {
      const primeiraMiniatura = miniaturaRef.current.querySelector('img');
      if (primeiraMiniatura) {
        primeiraMiniatura.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    }
  }, [produto?.id]);

  useEffect(() => {
    getSapatos()
      .then((data) => setProdutos(data))
      .catch(() => setErro("Erro ao carregar os produtos."))
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    const verificarOverflow = () => {
      const el = miniaturaRef.current;
      if (!el) return;
      setMostrarSetas(el.scrollWidth > el.clientWidth);
    };

    verificarOverflow();
    window.addEventListener('resize', verificarOverflow);
    return () => window.removeEventListener('resize', verificarOverflow);
  }, [produto?.imagens]);


  useEffect(() => {
    document.body.classList.toggle("body-no-scroll", !!lightboxImagem);
    return () => document.body.classList.remove("body-no-scroll");
  }, [lightboxImagem]);

  // Early return para evitar erro de acesso em produto ou imagens
  if (carregando)
    return (
      <div className="ProdutoDetalhe">
        <p>Carregando produto...</p>
      </div>
    );

  if (erro || !produto || !Array.isArray(produto.imagens))
    return (
      <div className="ProdutoDetalhe">
        <p>{erro || "Produto não encontrado ou sem imagens."}</p>
      </div>
    );

  const handleAddToCart = () => {
    if (!tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho");
      return;
    }
    dispatch(
      addItem({
        id: produto.id,
        name: produto.nome,
        price: produto.preco.aVista,
        image: produto.imagens[0],
        size: tamanhoSelecionado,
        quantity: quantidade,
        maxQuantity: produto.quantidadeEstoque || 10,
      })
    );
    navigate("/carrinho");
  };

  const irParaProximo = () => {
    if (!produto || !produto.imagens) return;
    const ehUltimaImagem = imagemAtiva === produto.imagens.length - 1;
    const novoIndice = ehUltimaImagem ? 0 : imagemAtiva + 1;
    setImagemAtiva(novoIndice);
  };

  const irParaAnterior = () => {
    if (!produto || !produto.imagens) return;
    const ehPrimeiraImagem = imagemAtiva === 0;
    const novoIndice = ehPrimeiraImagem
      ? produto.imagens.length - 1
      : imagemAtiva - 1;
    setImagemAtiva(novoIndice);
  };

  const abrirLightbox = (src) => setLightboxImagem(src);
  const fecharLightbox = () => setLightboxImagem(null);

  const parcelaPrincipal =
    produto.preco.parcelado && produto.preco.parcelado.length > 0
      ? produto.preco.parcelado[0]
      : null;
  const precoPix = produto.preco.aVista * 0.95;

  const embaralhar = (arr) => [...arr].sort(() => 0.5 - Math.random());
  const relacionados = embaralhar(
    produtos.filter((p) => p.tipo === produto.tipo && p.id !== produto.id)
  ).slice(0, 3);

  return (
    <div className="ProdutoDetalhe">
      <div className="produto-container">
        <section className="produto-imagens">
          <div className="carrossel-container">
            <button
              onClick={irParaAnterior}
              className="carrossel-btn btn-anterior"
              aria-label="Imagem anterior"
            >
              ‹
            </button>
            <div className="carrossel-viewport">
              <div
                className="carrossel-wrapper"
                style={{ transform: `translateX(-${imagemAtiva * 100}%)` }}
              >
                {produto.imagens.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${produto.nome} - Imagem ${index + 1}`}
                    className="carrossel-imagem"
                    onClick={() => abrirLightbox(img)}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={irParaProximo}
              className="carrossel-btn btn-proximo"
              aria-label="Próxima imagem"
            >
              ›
            </button>
          </div>
          <div className="miniaturas-container">
            {mostrarSetas && (
              <button className="miniaturas-scroll left" onClick={() => miniaturaRef.current.scrollLeft -= 100}>
                ‹
              </button>
            )}

            <div className="imagens-miniaturas" ref={miniaturaRef}>
              {produto.imagens.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  className={`miniaturas${imagemAtiva === index ? " ativa" : ""}`}
                  onClick={() => setImagemAtiva(index)}
                />
              ))}
            </div>

            {mostrarSetas && (
              <button className="miniaturas-scroll right" onClick={() => miniaturaRef.current.scrollLeft += 100}>
                ›
              </button>
            )}
          </div>


        </section>

        <section className="produto-info">
          <h1>{produto.nome}</h1>

          <div className="avaliacoes">
            <Stars rating={produto.stars || 4.5} />
            <a href="#avaliar">Avaliar este produto</a>
            <a href="#avaliacoes">{produto.reviews || 0} avaliações</a>
          </div>

          <p className="preco-principal">
            R$ {produto.preco.aVista.toFixed(2).replace(".", ",")}
          </p>

          <div className="opcoes-pagamento">
            {parcelaPrincipal && (
              <p>
                em até{" "}
                <strong>
                  {parcelaPrincipal.parcelas}x de R${" "}
                  {parcelaPrincipal.valor.toFixed(2).replace(".", ",")}
                </strong>{" "}
                sem juros
              </p>
            )}
            <p>
              ou <strong>R$ {precoPix.toFixed(2).replace(".", ",")}</strong> à
              vista com 5% no Pix
            </p>
          </div>

          <p className="calçados-tipo">Calçados Adulto</p>

          <SelectSize
            sizes={produto.tamanhos}
            onSelect={setTamanhoSelecionado}
          />

          <div className="descricao-material-container">
            <p>{produto.descricao}</p>
          </div>

          <QuantitySelector onChange={setQuantidade} />

          <Button
            title={"Comprar"}
            variant="primary"
            onPress={handleAddToCart}
          />

          <div className="calculadora-frete">
            <p>Calcule prazos e preços</p>
            <div className="input-grupo">
              <input type="text" placeholder="Digite seu CEP" />
              <button className="btn-consultar">Consultar</button>
            </div>
            <a href="#naoseimeucep" className="link-cep">
              Não sei meu CEP
            </a>
          </div>
        </section>
      </div>

      <section className="relacionados-container">
        <h3>Você também pode gostar</h3>
        <div className="relacionados-grid">
          {relacionados.length === 0 ? (
            <p>Nenhum produto relacionado encontrado.</p>
          ) : (
            relacionados.map((item) => (
              <ProdutoCard key={item.id} produto={item} />
            ))
          )}
        </div>
      </section>

      {lightboxImagem && (
        <div className="lightbox-overlay" onClick={fecharLightbox}>
          <button className="lightbox-fechar" aria-label="Fechar">
            ×
          </button>
          <img
            src={lightboxImagem}
            alt="Imagem ampliada"
            className="lightbox-imagem"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

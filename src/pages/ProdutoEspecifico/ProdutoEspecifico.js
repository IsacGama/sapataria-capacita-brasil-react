import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSapatos } from '../../utils/requestJson';
import './ProdutoEspecifico.css'; 

import Button from '../../Componentes/Buttons/Button'; 
import Stars from '../../Componentes/Stars/Stars';              
import SelectSize from '../../Componentes/SelectSize/SelectSize';      
import QuantitySelector from '../../Componentes/QuantitySelector/QuantitySelector'; 
import ProdutoCard from '../../Componentes/produtos/cardProduto/cardProduto';

export default function ProdutoEspecifico(){
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [imagemAtiva, setImagemAtiva] = useState(0);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState(1);
    const [lightboxImagem, setLightboxImagem] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getSapatos()
            .then(data => setProdutos(data))
            .catch(() => setErro('Erro ao carregar os produtos.'))
            .finally(() => setCarregando(false));
    }, []);

    const produto = produtos.find(p => p.id === parseInt(id));

    const irParaProximo = () => {
        if (!produto) return;
        const ehUltimaImagem = imagemAtiva === produto.imagens.length - 1;
        const novoIndice = ehUltimaImagem ? 0 : imagemAtiva + 1;
        setImagemAtiva(novoIndice);
    };

    const irParaAnterior = () => {
        if (!produto) return;
        const ehPrimeiraImagem = imagemAtiva === 0;
        const novoIndice = ehPrimeiraImagem ? produto.imagens.length - 1 : imagemAtiva - 1;
        setImagemAtiva(novoIndice);
    };

    const abrirLightbox = (src) => setLightboxImagem(src);
    const fecharLightbox = () => setLightboxImagem(null);
    
    useEffect(() => {
        document.body.classList.toggle('body-no-scroll', !!lightboxImagem);
        return () => document.body.classList.remove('body-no-scroll');
    }, [lightboxImagem]);

    if (carregando) return <div className="ProdutoDetalhe"><p>Carregando produto...</p></div>;
    if (erro || !produto) return <div className="ProdutoDetalhe"><p>Produto não encontrado.</p></div>;

    const produtosRelacionados = produtos.filter(p => p.id !== parseInt(id)).slice(0, 3);
    const parcelaPrincipal = produto.preco.parcelado.length > 0 ? produto.preco.parcelado[0] : null;
    const precoPix = produto.preco.aVista * 0.95;

    return (
        <div className="ProdutoDetalhe">
            <div className="produto-container">
                <div className="coluna-esquerda">
                    <section className="produto-imagens">
                        <div className="carrossel-container">
                            <button onClick={irParaAnterior} className="carrossel-btn btn-anterior" aria-label="Imagem anterior">‹</button>
                            <div className="carrossel-viewport">
                                <div className="carrossel-wrapper" style={{ transform: `translateX(-${imagemAtiva * 100}%)` }}>
                                    {produto.imagens.map((img, index) => (
                                        <img key={index} src={img} alt={`${produto.nome} - Imagem ${index + 1}`} className="carrossel-imagem" onClick={() => abrirLightbox(img)} />
                                    ))}
                                </div>
                            </div>
                            <button onClick={irParaProximo} className="carrossel-btn btn-proximo" aria-label="Próxima imagem">›</button>
                        </div>
                        <div className="imagens-miniaturas">
                            {produto.imagens.map((img, index) => (
                                <img key={index} src={img} alt={`Miniatura ${index + 1}`} className={`miniaturas${imagemAtiva === index ? ' ativa' : ''}`} onClick={() => setImagemAtiva(index)} />
                            ))}
                        </div>
                    </section>
                </div>

                <section className="produto-info">
                    <h1>{produto.nome}</h1>
                    <div className="avaliacoes">
                        <Stars rating={produto.stars || 4.5} />
                        <a href="#avaliar">Avaliar este produto</a>
                        <a href="#avaliacoes">{produto.reviews || 0} avaliações</a>
                    </div>
                    <p className="preco-principal">R$ {produto.preco.aVista.toFixed(2).replace('.', ',')}</p>
                    <div className="opcoes-pagamento">
                        {parcelaPrincipal && (
                            <p>em até <strong>{parcelaPrincipal.parcelas}x de R$ {parcelaPrincipal.valor.toFixed(2).replace('.', ',')}</strong> sem juros</p>
                        )}
                        <p>ou <strong>R$ {precoPix.toFixed(2).replace('.', ',')}</strong> à vista com 5% no Pix</p>
                    </div>
                    <p className="calçados-tipo">Calçados Adulto</p>
                    <SelectSize sizes={produto.tamanhos} onSelect={setTamanhoSelecionado} />
                    <QuantitySelector onChange={setQuantidade} />
                    <Button title={"Comprar"} variant="primary" onPress={() => console.log('Clicou no botão!')} />
                    <div className="calculadora-frete">
                        <p>Calcule prazos e preços</p>
                        <div className="input-grupo">
                            <input type="text" placeholder="Digite seu CEP" />
                            <button className="btn-consultar">Consultar</button>
                        </div>
                        <a href="#naoseimeucep" className="link-cep">Não sei meu CEP</a>
                    </div>
                </section>
            </div>
            
            <hr className="divisor-detalhes" />
            <section className="detalhes-produto-section">
                <h2 className="detalhes-titulo-principal">Detalhes do Produto</h2>
                <p className="detalhes-paragrafo">{produto.descricao}</p>
                {produto.caracteristicas && (
                    <>
                        <h3 className="detalhes-subtitulo">Características e Detalhes</h3>
                        <ul className="detalhes-lista">
                            {produto.caracteristicas.map((carac, idx) => <li key={idx}>{carac}</li>)}
                        </ul>
                    </>
                )}
                {produto.detalhesExtra && (
                    <>
                        <h3 className="detalhes-subtitulo">Cometa Clássico</h3>
                        <p className="detalhes-paragrafo">{produto.detalhesExtra}</p>
                    </>
                )}
            </section>

            <section className="relacionados-container">
                <h3>Você também pode gostar</h3>
                <div className="relacionados-grid">
                    {produtosRelacionados.map(item => (
                        <ProdutoCard key={item.id} produto={item} />
                    ))}
                </div>
            </section>
            
            {lightboxImagem && (
                <div className="lightbox-overlay" onClick={fecharLightbox}>
                    <button className="lightbox-fechar" aria-label="Fechar">×</button>
                    <img src={lightboxImagem} alt="Imagem ampliada" className="lightbox-imagem" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
}
import { useState, useEffect } from 'react';
import { getSapatos } from '../../utils/requestJson';
import './ProdutoEspecifico.css';

export default function ProdutoEspecifico() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [imagemAtiva, setImagemAtiva] = useState(0); // Para controlar a imagem principal
    const [tamanho, setTamanho] = useState('');
    const [quantidade, setQuantidade] = useState(1);

    useEffect(() => {
        getSapatos()
            .then(data => setProdutos(data))
            .catch(() => setErro('Erro ao carregar os produtos.'))
            .finally(() => setCarregando(false));
    }, []);

    if (carregando) {
        return <div className="ProdutoEspecifico"><p>Carregando produto...</p></div>;
    }

    const produto = produtos.length > 0 ? produtos[0] : null;
    if (erro || !produto) {
        return <div className="ProdutoEspecifico"><p>{erro || 'Produto não encontrado.'}</p></div>;
    }

    return (
        <div className="ProdutoEspecifico">
            <div className="breadcrumb">Home / Sapatos / {produto.nome}</div>

            <main className="produto-container">
                <section className="produto-imagens">
                    <img className="imagem-principal" src={produto.imagens[imagemAtiva]} alt={produto.nome} />
                    <div className="imagens-miniaturas">
                        {produto.imagens.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Miniatura ${index + 1}`}
                                className={`miniaturas${imagemAtiva === index ? ' ativa' : ''}`}
                                onClick={() => setImagemAtiva(index)}
                            />
                        ))}
                    </div>
                </section>

                <section className="produto-info">
                    <h2>{produto.nome}</h2>
                    <p className="tipo">Tipo: {produto.tipo}</p>
                    <p className="preco">R$ {produto.preco.aVista.toFixed(2).replace('.', ',')}</p>
                    {Array.isArray(produto.preco.parcelado) && produto.preco.parcelado.length > 0 ? (
                        <ul className="parcelado-lista">
                            {produto.preco.parcelado.map((parcela, idx) => (
                                <li key={idx}>
                                    {parcela.qtd}x de R$ {parcela.valor.toFixed(2).replace('.', ',')}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="parcelado-fallback">Parcelamento indisponível</p>
                    )}

                    <h3 className="descricao-titulo">Descrição</h3>
                    <p className="descricao-texto">{produto.descricao}</p>
                    <ul className="caracteristicas">
                        {(produto.caracteristicas && produto.caracteristicas.length > 0)
                            ? produto.caracteristicas.map((carac, idx) => <li key={idx}>{carac}</li>)
                            : (
                                <>
                                    <li>Material: Couro Italiano Premium</li>
                                    <li>Origem: Feito à mão na Itália</li>
                                    <li>Acabamento: Polido com Perfeição</li>
                                </>
                            )
                        }
                    </ul>

                    <div className="form-compra">
                        <div className="form-grupo">
                            <label htmlFor="tamanho">Tamanho</label>
                            <select id="tamanho" value={tamanho} onChange={e => setTamanho(e.target.value)}>
                                <option value="">Selecionar o Tamanho</option>
                                {Array.isArray(produto.tamanhos) && produto.tamanhos.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="quantidade">Quantidade</label>
                            <input
                                id="quantidade"
                                type="number"
                                min="1"
                                value={quantidade}
                                onChange={e => setQuantidade(e.target.value)}
                            />
                        </div>
                        <button className="btn-adicionar">Adicionar ao Carrinho</button>
                    </div>
                </section>
            </main>

            <section className="relacionados-container">
                <h3>Você também pode gostar</h3>
                <div className="relacionados-grid">
                    {produtos.slice(1, 4).map(item => (
                        <div key={item.id} className="relacionado-card">
                            <img
                                src={Array.isArray(item.imagens) && item.imagens.length > 0 ? item.imagens[0] : '/fallback-image.png'}
                                alt={item.nome}
                            />
                            <p className="nome">{item.nome}</p>
                            <p className="preco">R$ {item.preco.aVista.toFixed(2).replace('.', ',')}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

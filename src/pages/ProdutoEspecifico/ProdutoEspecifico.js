import React, { useState, useEffect } from 'react';
import Header from '../../Componentes/Header';
import { getSapatos } from '../../utils/requestJson';
import './ProdutoEspecifico.css';

export default function ProdutoEspecifico() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function carregarProdutos() {
            const data = await getSapatos();
            setProdutos(data);
    }
    carregarProdutos();
  }, []);

    const produto = produtos[0];

    if (carregando) {
        return (
            <div className="ProdutoEspecifico">
                <Header />
                <div className="ProdutoEspecifico-container">
                    <p>Carregando produto...</p>
                </div>
            </div>
        );
    }

    if (erro || !produto) {
        return (
            <div className="ProdutoEspecifico">
                <Header />
                <div className="ProdutoEspecifico-container">
                    <p>{erro || 'Produto não encontrado.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="ProdutoEspecifico">
            <Header />
            <div className="ProdutoEspecifico-container">

                <div className="breadcrumb">Home / Sapatos / {produto.nome}</div>

                <div className="produto-main">
                    <div className="produto-imagem">
                        <img src={produto.imagem} alt={produto.nome} />
                        <div className="miniaturas">
                            <img src={produto.imagem} alt="thumb1" />
                            <img src={produto.imagem} alt="thumb2" />
                            <img src={produto.imagem} alt="thumb3" />d
                        </div>
                    </div>

                    <div className="produto-detalhes">
                        <h2>{produto.nome}</h2>
                        <p className="tipo">Tipo: Oxford</p>
                        <strong className="preco">{produto.preco}</strong>

                        <h3>Descrição</h3>
                        <p className="descricao">{produto.descricao}</p>

                        <ul className="caracteristicas">
                            <li>Material: Couro Premium Italiano</li>
                            <li>Origem: Feito à mão no Brasil</li>
                            <li>Acabamento: Polido à perfeição</li>
                        </ul>

                        <label htmlFor="tamanho">Tamanho</label>
                        <select id="tamanho" value={tamanhoSelecionado} onChange={(e) => setTamanhoSelecionado(e.target.value)}>
                            <option value="">Selecione o tamanho</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                        </select>

                        <label htmlFor="quantidade">Quantidade</label>
                        <input
                            type="number"
                            id="quantidade"
                            min="1"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                        />

                        <button className="btn-comprar">Adicionar ao Carrinho</button>
                    </div>
                </div>

                <div className="produtos-relacionados">
                    <h3>Você também pode gostar</h3>
                    <div className="cards-relacionados">
                        {produtos.slice(1, 4).map((item) => (
                            <div className="card" key={item.id}>
                                <img src={item.imagem} alt={item.nome} />
                                <p>{item.nome}</p>
                                <strong>{item.preco}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { getSapatos } from '../../utils/requestJson';
import '../Carrinho/CarrinhoDeCompras.css'

export default function CarrinhoDeCompras() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');


    // if (carregando) {
    //     return <div className="ProdutoEspecifico"><p>Carregando produto...</p></div>;
    // }

    // const produto = produtos.length > 0 ? produtos[0] : null;
    // if (erro || !produto) {
    //     return <div className="ProdutoEspecifico"><p>{erro || 'Produto não encontrado.'}</p></div>;
    // }

    return (
        <div className="ProdutoEspecifico">
            <div className="breadcrumb">Home / Carrinho de Compras</div>
            
            <section className="container">
                <h2>Carrinho de Compras</h2>

            </section>
        </div>
    );
}
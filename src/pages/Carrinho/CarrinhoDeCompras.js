import { useState, useEffect } from 'react';
import CartList from '../../Componentes/Cart/CartList';
import '../Carrinho/CarrinhoDeCompras.css'

export default function CarrinhoDeCompras() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    return (
        <div className="ProdutoEspecifico">
            <div className="breadcrumb">Home / Carrinho de Compras</div>
            
            <section className="container">
                <h2>Carrinho de Compras</h2>
                <CartList/>
            </section>
        </div>
    );
}
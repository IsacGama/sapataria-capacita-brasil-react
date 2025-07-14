import { useState, useEffect } from 'react';
import CartList from '../../Componentes/Cart/CartList';
import '../Carrinho/CarrinhoDeCompras.css'

export default function CheckoutCompras() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    return (
        <div className="ProdutoEspecifico">
            <div className="breadcrumb">Home / Carrinho de Compras /Checkout</div>
            
            <section className="container">
                <h2>Checkout</h2>
                <form>
                  <h3>Informações pessoais</h3>
                  <div>
                      <label>Nome Completo</label>
                      <input name='name' id='name'/>
                      <label>Email</label>
                      <input name='Email' id='Email'/>
                      <label>Telefone</label>
                      <input name='tell' id='tell'/>
                  </div>
                  <h3>Endereço</h3>
                  <div>
                      <label>Rua</label>
                      <input name='address' id='address'/>
                      <label>Cidade</label>
                      <input name='city' id='city'/>
                      <label>Estado</label>
                      <input name='state' id='state'/>
                      <label>CEP</label>
                      <input name='CEP' id='CEP'/>
                      <label>País</label>
                      <input name='country' id='country'/>
                  </div>
                </form>
                
            </section>
        </div>
    );
}
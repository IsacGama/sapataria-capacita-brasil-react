import CartList from '../../Componentes/Cart/CartList';
import ResumoCompraCarrinho from '../../Componentes/ResumoCompra/ResumoCompraCarrinho';
import '../Carrinho/CarrinhoDeCompras.css'
import { useSelector } from 'react-redux';

export default function CarrinhoDeCompras() {
    const cartItems = useSelector(state => state.cart.items);

    return (
        <div className="carrinho">
            
            <section className="container">
                <h2>Carrinho de Compras</h2>
                <CartList/>
                {cartItems.length > 0 && <ResumoCompraCarrinho />}
            </section>
        </div>
    );
}
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import './CartList.css';
import Button from '../Buttons/Button';

function CartList() {
  const cartItems = useSelector(state => state.cart.items);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  };

  return (
    <div className="cart-list">
      <div className="cart-list__header">
        <div>PRODUTO</div>
        <div>PREÇO</div>
        <div>QUANTIDADE</div>
        <div>SUBTOTAL</div>
        <div></div>
      </div>
      
      {cartItems.length > 0 ? (
        <>
          {cartItems.map(item => (
            <CartItem key={`${item.id}-${item.size}`} item={item} />
          ))}
          
          <div className="cart-total">
            <div className="cart-total__row">
              <span className="cart-total__label">Total:</span>
              <span className="cart-total__value">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <Button title="Finalizar Compra" variant="primary" />
          </div>
        </>
      ) : (
        <div className="cart-empty">
          <p>Seu carrinho está vazio</p>
          <a href="/produtos" className="cart-empty__link">
            Continuar comprando
          </a>
        </div>
      )}
    </div>
  );
}

export default CartList;
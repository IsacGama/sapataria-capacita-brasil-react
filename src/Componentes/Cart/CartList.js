import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importação adicionada
import CartItem from './CartItem';
import './CartList.css';
import Button from '../Buttons/Button';

function CartList() {
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();

  function handleContinuarComprando() {
    navigate('/produtos')
  }

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
        </>
      ) : (
        <div className="cart-empty">
          <p>Seu carrinho está vazio</p>
          <Button 
            title={"Voltar às Compras"}
            variant='primary'
            onPress={handleContinuarComprando}
          />
        </div>
      )}
    </div>
  );
}

export default CartList;
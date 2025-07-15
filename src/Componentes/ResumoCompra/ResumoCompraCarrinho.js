import { useSelector } from 'react-redux';
import Button from '../Buttons/Button';
import './ResumoCompraCarrinho.css';
import { useNavigate } from 'react-router-dom';

const ResumoCompraCarrinho = () => {
  const cartItems = useSelector(state => state.cart.items);
  const subtotal = useSelector(state => state.cart.total);
  const frete = 0.0;
  const total = subtotal + frete;

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinuarComprando = () => {
    navigate('/produtos');
  };

  return (
    <div className="resumo-compra">
      <h2>Order Summary</h2>

      <div className="linha">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="linha">
        <span>Shipping</span>
        {frete > 0 ? (
          <span>${frete.toFixed(2)}</span>
        ) : (
          <span>Grátis</span>
        )}
      </div>

      <div className="linha total">
        <strong>Total</strong>
        <strong>${total.toFixed(2)}</strong>
      </div>

      <Button 
        title="Finalizar Compra" 
        variant="primary"
        onPress={handleCheckout}
        disabled={cartItems.length === 0}
      />

      <Button
        title="Continuar Comprando"
        variant="secondary"
        onPress={handleContinuarComprando}
      />
    </div>
  );
};

export default ResumoCompraCarrinho;
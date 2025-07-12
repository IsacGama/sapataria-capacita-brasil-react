import { useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';
import './CartItem.css';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (item.maxQuantity || 10)) {
      dispatch(updateQuantity({
        id: item.id,
        size: item.size,
        quantity: newQuantity
      }));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem({
      id: item.id,
      size: item.size
    }));
  };

  return (
    <div className="cart-item">
      <div className="cart-item__product">
        <img src={item.image} alt={item.name} className="cart-item__image" />
        <div>
          <h3 className="cart-item__name">{item.name}</h3>
          <p className="cart-item__size">Tamanho: {item.size}</p>
        </div>
      </div>
      <div className="cart-item__price">${item.price.toFixed(2)}</div>
      <div className="cart-item__quantity">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="cart-item__quantity-button"
        >
          -
        </button>
        <span className="cart-item__quantity-value">{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= (item.maxQuantity || 10)}
          className="cart-item__quantity-button"
        >
          +
        </button>
      </div>
      <div className="cart-item__subtotal">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button 
        className="cart-item__remove"
        onClick={handleRemove}
      >
        Remover
      </button>
    </div>
  );
}

export default CartItem;

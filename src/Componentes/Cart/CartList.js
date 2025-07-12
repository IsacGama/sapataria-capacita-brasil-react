import CartItem from './CartItem';
import './CartList.css';

function CartList({ cartItems, onRemoveItem, onUpdateQuantity }) {
  return (
    <div className="cart-list">
      <div className="cart-header">
        <div>PRODUCT</div>
        <div>PRICE</div>
        <div>QUANTITY</div>
        <div>SUBTOTAL</div>
        <div></div>
      </div>
      
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={onRemoveItem}
          onQuantityChange={onUpdateQuantity}
        />
      ))}
    </div>
  );
}

export default CartList;
import React from 'react';
import './CartItem.css';

function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="cart-item">
      <div className="cart-item-product">
        <img src={item.image} alt={item.name} className="cart-item-image" />
        <span>{item.name}</span>
      </div>
      <div className="cart-item-price">${item.price.toFixed(2)}</div>
      <div className="cart-item-quantity">
        <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
      </div>
      <div className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</div>
      <button className="cart-item-remove" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
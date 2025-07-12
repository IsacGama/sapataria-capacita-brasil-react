import { useState } from 'react';
import './QuantitySelector.css';

export default function QuantitySelector({ min = 1, max = 10, onChange }) {
  const [quantity, setQuantity] = useState(min);

  const handleDecrease = () => {
    if (quantity > min) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onChange?.(newQty);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      onChange?.(newQty);
    }
  };

  return (
    <div className="quantidade-container">
      <button className="btn-quantidade" onClick={handleDecrease}>−</button>
      <span className="quantidade">{quantity}</span>
      <button className="btn-quantidade" onClick={handleIncrease}>+</button>
    </div>
  );
}

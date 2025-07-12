import { useState } from 'react';
import './SelectSize.css';

export default function SelectSize({ sizes, onSelect }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSelect = (size) => {
    setSelectedSize(size);
    onSelect(size);
  };

  return (
    <div className="tamanhos">
      {sizes.map((size) => (
        <button
          key={size}
          className={`tamanho ${selectedSize === size ? 'selecionado' : ''}`}
          onClick={() => handleSelect(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
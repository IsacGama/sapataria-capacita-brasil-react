import React from 'react';
import { useSelector } from 'react-redux';
import './OrderSummary.css'; // continue usando CSS normal
import Button from '../Buttons/Button';

const OrderSummary = () => {
  const { items = [], total = 0 } = useSelector((state) => state.cart);

  return (
    <div className="order-summary">
      <h2>Resumo do Pedido</h2>

      <table className="summary-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={`${item.id}-${item.size || ''}`}>
              <td className="product-cell">
                <div className="product-info">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="product-image"
                    onError={(e) => {
                      e.target.src = '/placeholder-produto.jpg'; // fallback se a imagem quebrar
                    }}
                  />
                  <div>
                    <p className="product-name">{item.name}</p>
                    {item.size && <p className="product-size">Tamanho: {item.size}</p>}
                  </div>
                </div>
              </td>
              <td>{item.quantity}</td>
              <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-total">
        <div className="total-row">
          <span>Subtotal:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span>Frete:</span>
          <span>Grátis</span>
        </div>
        <div className="total-row grand-total">
          <strong>Total:</strong>
          <strong>R$ {total.toFixed(2)}</strong>
        </div>
          <Button title="Confirmar" variant="primary" />
      </div>
    </div>
  );
};

export default OrderSummary;
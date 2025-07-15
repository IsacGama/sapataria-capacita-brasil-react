import React from 'react';
import './PaymentMethod.css';

const PaymentMethod = () => {
  return (
    <div className="payment-method">
      <h3>Método de Pagamento</h3>
      
      <div className="payment-options">
        <label>
          <input type="radio" name="payment" value="credit" defaultChecked />
          Cartão de Crédito
        </label>
        
        <label className='p'>
          <input type="radio" name="payment" value="pix" />
          PIX
        </label>
        
        <label>
          <input type="radio" name="payment" value="boleto" />
          Boleto Bancário
        </label>
      </div>

      {/* Campos do cartão (aparecem apenas se cartão selecionado) */}
      <div className="credit-card-form">
        <div className="form-group">
          <label>Número do Cartão</label>
          <input type="text" placeholder="1234 5678 9012 3456" />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Validade</label>
            <input type="text" placeholder="MM/AA" />
          </div>
          
          <div className="form-group">
            <label>CVV</label>
            <input type="text" placeholder="123" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
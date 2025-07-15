import React from 'react';
import './ShippingAddress.css';

const ShippingAddress = () => {
  return (
    <div className="shipping-address">
      <h3>Endereço de Entrega</h3>
      
      <div className="form-group">
        <label>CEP</label>
        <input type="text" placeholder="00000-000" />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Endereço</label>
          <input type="text" placeholder="Rua, Avenida, etc." />
        </div>
        
        <div className="form-group">
          <label>Número</label>
          <input type="text" placeholder="123" />
        </div>
      </div>
      
      <div className="form-group">
        <label>Complemento</label>
        <input type="text" placeholder="Apto, Bloco, etc." />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Bairro</label>
          <input type="text" placeholder="Seu bairro" />
        </div>
        
        <div className="form-group">
          <label>Cidade</label>
          <input type="text" placeholder="Sua cidade" />
        </div>
      </div>
      
      <div className="form-group">
        <label>Estado</label>
        <select>
          <option value="">Selecione</option>
          <option value="SP">São Paulo</option>
          {/* Adicione outros estados */}
        </select>
      </div>
    </div>
  );
};

export default ShippingAddress;
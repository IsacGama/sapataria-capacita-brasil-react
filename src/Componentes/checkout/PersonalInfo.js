import React from 'react';
import './PersonalInfo.css';

const PersonalInfo = () => {
  return (
    <div className="personal-info">
      <h3>Informações Pessoais</h3>
      
      <div className="form-group">
        <label>Nome Completo</label>
        <input type="text" placeholder="Digite seu nome completo" />
      </div>
      
      <div className="form-group">
        <label>CPF</label>
        <input type="text" placeholder="000.000.000-00" />
      </div>
      
      <div className="form-group">
        <label>E-mail</label>
        <input type="email" placeholder="seu@email.com" />
      </div>
      
      <div className="form-group">
        <label>Telefone</label>
        <input type="tel" placeholder="(00) 00000-0000" />
      </div>
    </div>
  );
};

export default PersonalInfo;
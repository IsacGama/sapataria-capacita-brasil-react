import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

 // já usa Redux internamente
import PersonalInfo from './PersonalInfo';
import ShippingAddress from './ShippingAddress';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';

import styles from './Checkout.module.css';

const Checkout = () => {
  const { items = [] } = useSelector((state) => state.cart || {});

  // Redireciona para o carrinho se estiver vazio
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}></h1>

      <OrderSummary />
      <PersonalInfo />
      <ShippingAddress />
      <PaymentMethod />

      
    </div>
  );
};

export default Checkout;
import './CheckoutCompras.css';
import ResumoCompraCheckout from '../../Componentes/ResumoCompra/ResumoCompraCheckout';
import { useRef } from 'react';

export default function CheckoutCompras() {
  const formRef = useRef();

  const handleConfirmOrder = (cartItems, total) => {
    const formData = new FormData(formRef.current);
    const formJson = Object.fromEntries(formData.entries());

    const pedido = {
      cliente: {
        nome: formJson.name,
        email: formJson.email,
        telefone: formJson.phone,
        endereco: {
          rua: formJson.address,
          cidade: formJson.city,
          estado: formJson.state,
          cep: formJson.zip,
          pais: formJson.country,
        },
      },
      pagamento: {
        metodo: formJson.payment,
        cartao: {
          numero: formJson.cardNumber,
          validade: formJson.expiry,
          cvv: formJson.cvv,
        }
      },
      itens: cartItems,
      total
    };

    console.log('Pedido Finalizado:', pedido);
    alert('Pedido confirmado!');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <form className="checkout-form" ref={formRef}>
          <h2>Checkout</h2>

          {/* Dados Pessoais */}
          <section className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-grid-full">
                <label>Full Name</label>
                <input type="text" name="name" required />
              </div>
              <div>
                <label>Email Address</label>
                <input type="email" name="email" required />
              </div>
              <div>
                <label>Phone Number</label>
                <input type="tel" name="phone" required />
              </div>
            </div>
          </section>

          {/* Endereço */}
          <section className="form-section">
            <h3>Shipping Address</h3>
            <div className="form-grid">
              <div className="form-grid-full">
                <label>Street Address</label>
                <input type="text" name="address" required />
              </div>
              <div>
                <label>City</label>
                <input type="text" name="city" required />
              </div>
              <div>
                <label>State / Province</label>
                <input type="text" name="state" required />
              </div>
              <div>
                <label>Zip / Postal Code</label>
                <input type="text" name="zip" required />
              </div>
              <div className="form-grid-full">
                <label>Country</label>
                <input type="text" name="country" required />
              </div>
            </div>
          </section>

          {/* Pagamento */}
          <section className="form-section">
            <h3>Payment Method</h3>
            <div className="form-grid">
              <div className="form-grid-full">
                <label>
                  <input type="radio" name="payment" value="credit" defaultChecked />
                  Credit Card
                </label>
                <label>
                  <input type="radio" name="payment" value="paypal" />
                  PayPal
                </label>
              </div>
              <div className="form-grid-full">
                <label>Card Number</label>
                <input type="text" name="cardNumber" />
              </div>
              <div>
                <label>Expiry Date</label>
                <input type="text" name="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <label>CVV</label>
                <input type="text" name="cvv" />
              </div>
            </div>
          </section>
        </form>

        <ResumoCompraCheckout onConfirm={(cartItems, total) => handleConfirmOrder(cartItems, total)} />
      </div>
    </div>
  );
}
import "./CheckoutCompras.css";
import ResumoCompraCheckout from "../../Componentes/ResumoCompra/ResumoCompraCheckout";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Componentes/Cart/CartSlice";

export default function CheckoutCompras() {
  const formRef = useRef();
  const dispatch = useDispatch();

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
        },
      },
      itens: cartItems,
      total,
    };

    console.log("Pedido Finalizado:", pedido);
    alert("Pedido confirmado!");

    dispatch(clearCart()); // Zera o carrinho
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <form className="checkout-form" ref={formRef}>
          <h2>Checkout</h2>

          {/* Dados Pessoais */}
          <section className="form-section">
            <h3>Informações Pessoais</h3>
            <div className="form-grid">
              <div className="form-grid-full">
                <label>Nome Completo</label>
                <input type="text" name="name" required />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" required />
              </div>
              <div>
                <label>Telefone</label>
                <input type="tel" name="phone" required />
              </div>
            </div>
          </section>

          {/* Endereço */}
          <section className="form-section">
            <h3>Endereço de Entrega</h3>
            <div className="form-grid">
              <div className="form-grid-full">
                <label>Endereço</label>
                <input type="text" name="address" required />
              </div>
              <div>
                <label>Cidade</label>
                <input type="text" name="city" required />
              </div>
              <div>
                <label>Estado</label>
                <input type="text" name="state" required />
              </div>
              <div>
                <label>CEP</label>
                <input type="text" name="zip" required />
              </div>
              <div className="form-grid-full">
                <label>País</label>
                <input type="text" name="country" required />
              </div>
            </div>
          </section>

          {/* Pagamento */}
          <section className="form-section">
            <h3>Método de Pagamento</h3>
            <div className="form-grid">
              <div className="form-grid-full">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    defaultChecked
                  />
                  Cartão de Crédito
                </label>
                <label>
                  <input type="radio" name="payment" value="paypal" />
                  PayPal
                </label>
              </div>
              <div className="form-grid-full">
                <label>Número do Cartão</label>
                <input type="text" name="cardNumber" />
              </div>
              <div>
                <label>Data de Validade</label>
                <input type="text" name="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <label>CVV</label>
                <input type="text" name="cvv" />
              </div>
            </div>
          </section>
        </form>

        <ResumoCompraCheckout
          onConfirm={(cartItems, total) => handleConfirmOrder(cartItems, total)}
        />
      </div>
    </div>
  );
}

import "./App.css";
import { Header } from "./Componentes/Header/Header";
import { Footer } from "./Componentes/Footer/Footer";
import  CarrinhoDeCompras  from "./pages/Carrinho/CarrinhoDeCompras"

import ProdutoEspecifico from "./pages/ProdutoEspecifico/ProdutoEspecifico";

function App() {
  return (
    <div className="App">
      <Header />
      <CarrinhoDeCompras/>
      <Footer />
    </div>
  );
}

export default App;

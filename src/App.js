import "./App.css";
import { Header } from "./Componentes/Header/Header";
import { Footer } from "./Componentes/Footer/Footer";
import ProdutoEspecifico from "./pages/ProdutoEspecifico/ProdutoEspecifico";

function App() {
  return (
    <div className="App">
      <Header />
        <ProdutoEspecifico />
      <Footer />
    </div>
  );
}

export default App;

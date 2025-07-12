import "./App.css";
import { Header } from "./Componentes/Header/Header";
import { Footer } from "./Componentes/Footer/Footer";
import ProdutoEspecifico from "./pages/ProdutoEspecifico/ProdutoEspecifico";
import ProdutosGeral from "./pages/ProdutosGeral/ProdutosGeral";

function App() {
  return (
    <div className="App">
      <Header />
        <ProdutosGeral />
      <Footer />
    </div>
  );
}

export default App;

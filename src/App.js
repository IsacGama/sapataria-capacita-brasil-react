import "./App.css";
import { Header } from "./Componentes/Header/Header";
import { Home } from "./pages/Home/Home";
import { Footer } from "./Componentes/Footer/Footer";
import Produtos from "./pages/ProdutosGeral/ProdutosGeral";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Produtos />
      <Footer />
    </div>
  );
}

export default App;

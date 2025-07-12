import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./Componentes/Header/Header";
import { Home } from "./pages/Home/Home";
import Produtos from "./pages/ProdutosGeral/ProdutosGeral";
import { Sobre } from "./pages/Sobre/Sobre";
import { Footer } from "./Componentes/Footer/Footer";
import ProdutoEspecifico from "./pages/ProdutoEspecifico/ProdutoEspecifico";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/especifico" element={<ProdutoEspecifico />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

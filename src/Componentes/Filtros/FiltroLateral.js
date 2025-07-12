import './FiltroLateral.css';
import FiltroTipo from './FiltroTipo';
import FiltroCor from './FiltroCor';
import FiltroPreco from './FiltroPreco';

export default function FiltroLateral({ filtros, setFiltros, opcoes, aberto, setAberto }) {
  return (
    <aside className={`filtro-lateral ${aberto ? 'aberto' : ''}`}>
      <button className="fechar-filtro" onClick={() => setAberto(false)}>×</button>
      <h2>Filtros</h2>
      <FiltroPreco filtros={filtros} setFiltros={setFiltros} />
      <FiltroTipo tipos={opcoes.tipos} filtros={filtros} setFiltros={setFiltros} />
      <FiltroCor cores={opcoes.cores} filtros={filtros} setFiltros={setFiltros} />
    </aside>
  );
}

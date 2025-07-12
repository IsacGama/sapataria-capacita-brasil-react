import './FiltroLateral.css';

export default function FiltroPreco({ filtros, setFiltros }) {
  const handleMin = (e) => {
    const novoMin = Number(e.target.value);
    if (novoMin <= filtros.precoMax) {
      setFiltros(prev => ({ ...prev, precoMin: novoMin }));
    }
  };

  const handleMax = (e) => {
    const novoMax = Number(e.target.value);
    if (novoMax >= filtros.precoMin) {
      setFiltros(prev => ({ ...prev, precoMax: novoMax }));
    }
  };

  return (
    <div className="filtro-secao">
      <h3 className="filtro-titulo">Faixa de Preço</h3>
      <div className="range-container">
        <div className="range-inputs">
          <input
            type="range"
            min="200"
            max="2000"
            step="50"
            value={filtros.precoMin}
            onChange={handleMin}
            className="range-slider"
          />
          <input
            type="range"
            min="200"
            max="2000"
            step="50"
            value={filtros.precoMax}
            onChange={handleMax}
            className="range-slider"
          />
        </div>
        <p className="range-valores">
          R$ <span className="valor-destaque">{filtros.precoMin}</span> até 
          R$ <span className="valor-destaque">{filtros.precoMax}</span>
        </p>
      </div>
    </div>
  );
}


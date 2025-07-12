import './FiltroLateral.css'

export default function FiltroCor({ cores, filtros, setFiltros }) {
  const toggleCor = (cor) => {
    const atual = filtros.cor.includes(cor);
    setFiltros(prev => ({
      ...prev,
      cor: atual ? prev.cor.filter(c => c !== cor) : [...prev.cor, cor]
    }));
  };

  return (
    <div className="filtro-secao">
      <h3 className="filtro-titulo">Cor</h3>
      <div className="opcoes-container opcoes-cor">
        {cores.map(cor => (
          <label key={cor} className="opcao-item">
            <input
              type="checkbox"
              checked={filtros.cor.includes(cor)}
              onChange={() => toggleCor(cor)}
              className="opcao-checkbox"
            />
            <span className="opcao-texto">{cor}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
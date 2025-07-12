import './FiltroLateral.css'

export default function FiltroTipo({ tipos, filtros, setFiltros }) {
  const toggleTipo = (tipo) => {
    const atual = filtros.tipo.includes(tipo);
    setFiltros(prev => ({
      ...prev,
      tipo: atual ? prev.tipo.filter(t => t !== tipo) : [...prev.tipo, tipo]
    }));
  };

  return (
    <div className="filtro-secao">
      <h3 className="filtro-titulo">Tipo</h3>
      <div className="opcoes-container">
        {tipos.map(tipo => (
          <label key={tipo} className="opcao-item">
            <input
              type="checkbox"
              checked={filtros.tipo.includes(tipo)}
              onChange={() => toggleTipo(tipo)}
              className="opcao-checkbox"
            />
            <span className="opcao-texto">{tipo}</span>
          </label>
        ))}
      </div>
    </div>
  );
}


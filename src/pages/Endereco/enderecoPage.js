import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Componentes/Buttons/Button';
import Alert from '../../Componentes/Alert/alert';
import './EnderecoPage.css';
import { authUtils } from '../../utils/clientApi';
import { enderecoApi } from '../../utils/enderecoApi';

export default function EnderecoPage() {
  const navigate = useNavigate();
  const [enderecos, setEnderecos] = useState([]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  const token = authUtils.obterToken();

  useEffect(() => {
    const fetchEnderecos = async () => {
      if (!token) return navigate('/login-cliente');

      try {
        const data = await enderecoApi.getEnderecos(token);
        setEnderecos(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };

    fetchEnderecos();
  }, [navigate, token]);

  const handleDelete = async (id) => {
    try {
      await enderecoApi.deleteEndereco(id, token);
      setEnderecos(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      setErro(error.message);
    }
  };

  if (carregando) return <p>Carregando endereços...</p>;

  return (
    <div className="enderecopage-container">
      {erro && <Alert type="error" message={erro} onClose={() => setErro('')} />}
      
      <div className="enderecos-header">
        <h1>Meus Endereços</h1>
        <Button title="Adicionar Novo" variant="primary" onClick={() => navigate('/enderecos/novo')} />
      </div>

      {enderecos.length === 0 ? (
        <p>Nenhum endereço cadastrado.</p>
      ) : (
        <div className="enderecos-list">
          {enderecos.map(e => (
            <div key={e.id} className="endereco-card">
              <p><strong>Rua:</strong> {e.rua}</p>
              <p><strong>Número:</strong> {e.numero}</p>
              <p><strong>Cidade:</strong> {e.cidade}</p>
              <p><strong>Estado:</strong> {e.estado}</p>
              <p><strong>CEP:</strong> {e.cep}</p>
              <div className="endereco-actions">
                <Button title="Editar" variant="secondary" onClick={() => navigate(`/enderecos/${e.id}/editar`)} />
                <Button title="Deletar" variant="danger" onClick={() => handleDelete(e.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

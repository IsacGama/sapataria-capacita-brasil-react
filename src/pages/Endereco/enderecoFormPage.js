import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Componentes/Buttons/Button';
import Alert from '../../Componentes/Alert/alert';
import './EnderecoFormPage.css';
import { authUtils } from '../../utils/clientApi';
import { enderecoApi } from '../../utils/enderecoApi';

export default function EnderecoFormPage() {
  const { id } = useParams(); // id do endereço, se estiver editando
  const navigate = useNavigate();
  const [form, setForm] = useState({
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    cep: '',
  });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const token = authUtils.obterToken();

  useEffect(() => {
    if (!token) return navigate('/login-cliente');

    const fetchEndereco = async () => {
      if (!id) return; // criar novo, não buscar
      setCarregando(true);
      try {
        const data = await enderecoApi.getEnderecoById(id, token);
        setForm({
          rua: data.rua,
          numero: data.numero,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep,
        });
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };

    fetchEndereco();
  }, [id, navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      if (id) {
        // editar
        await enderecoApi.updateEndereco(id, form, token);
      } else {
        // criar novo
        await enderecoApi.createEndereco(form, token);
      }
      navigate('/enderecos');
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="endereco-form-container">
      <h1>{id ? 'Editar Endereço' : 'Adicionar Novo Endereço'}</h1>
      {erro && <Alert type="error" message={erro} onClose={() => setErro('')} />}

      {carregando && <p>Carregando...</p>}

      {!carregando && (
        <form className="endereco-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="rua"
            placeholder="Rua"
            value={form.rua}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="numero"
            placeholder="Número"
            value={form.numero}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={form.cidade}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={form.estado}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cep"
            placeholder="CEP"
            value={form.cep}
            onChange={handleChange}
            required
          />

          <div className="form-actions">
            <Button
              type="submit"
              variant="primary"
              disabled={carregando}
              title={carregando ? 'Salvando...' : 'Salvar'}
            />
            <Button
              type="button"
              variant="secondary"
              title="Cancelar"
              onClick={() => navigate('/enderecos')}
            />
          </div>
        </form>
      )}
    </div>
  );
}

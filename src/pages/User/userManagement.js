import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserManagement.css";
import Button from "../../Componentes/Buttons/Button";
import { userApi } from "../../utils/requestJson";

export default function UserManagement({ users, setUsers, token }) {
  const [novoUser, setNovoUser] = useState({ nome: "", email: "", senha: "" });
  const [editando, setEditando] = useState(null);
  const [userEditado, setUserEditado] = useState({});
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // Criar usuário
  const criarUser = async () => {
    if (!novoUser.nome || !novoUser.email || !novoUser.senha) {
      setErro("Todos os campos são obrigatórios");
      return;
    }

    try {
      const criado = await userApi.createUser(novoUser, token);
      setUsers([...users, criado]);
      setNovoUser({ nome: "", email: "", senha: "" });
      setErro("");
    } catch (err) {
      setErro(err.message || "Erro ao criar usuário");
    }
  };

  // Atualizar usuário
  const atualizarUser = async (id) => {
    try {
      const payload = { ...userEditado };

      // se senha estiver vazia, não manda
      if (!payload.senha) {
        delete payload.senha;
      }

      const atualizado = await userApi.updateUser(id, payload, token);
      setUsers(users.map((u) => (u.id === id ? atualizado : u)));
      setEditando(null);
      setUserEditado({});
      setErro("");
    } catch (err) {
      setErro(err.message || "Erro ao atualizar usuário");
    }
  };

  // Deletar usuário
  const deletarUser = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;
    try {
      await userApi.deleteUser(id, token);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setErro(err.message || "Erro ao deletar usuário");
    }
  };

  return (
    <section className="users-section">
      <div className="users-header">
        <h2>Gerenciar Usuários</h2>
        <Button
          title="Voltar"
          variant="secondary"
          onClick={() => navigate(-1)}
        />
      </div>

      {erro && <div className="error">{erro}</div>}

      {/* Criar novo */}
      <div className="novo-user">
        <input
          type="text"
          placeholder="Nome"
          value={novoUser.nome}
          onChange={(e) => setNovoUser({ ...novoUser, nome: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={novoUser.email}
          onChange={(e) => setNovoUser({ ...novoUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          value={novoUser.senha}
          onChange={(e) => setNovoUser({ ...novoUser, senha: e.target.value })}
        />
        <Button title="Criar Usuário" variant="primary" onClick={criarUser} />
      </div>

      {/* Listagem */}
      <div className="users-list">
        {users.map((u) => (
          <div key={u.id} className="user-card">
            {editando === u.id ? (
              <>
                <input
                  type="text"
                  value={userEditado.nome || ""}
                  onChange={(e) =>
                    setUserEditado({ ...userEditado, nome: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={userEditado.email || ""}
                  onChange={(e) =>
                    setUserEditado({ ...userEditado, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Nova senha"
                  value={userEditado.senha || ""}
                  onChange={(e) =>
                    setUserEditado({ ...userEditado, senha: e.target.value })
                  }
                />
                <div className="user-actions">
                  <Button
                    title="Salvar"
                    variant="success"
                    onClick={() => atualizarUser(u.id)}
                  />
                  <Button
                    title="Cancelar"
                    variant="secondary"
                    onClick={() => setEditando(null)}
                  />
                </div>
              </>
            ) : (
              <>
                <span className="user-nome">{u.nome}</span>
                <span className="user-email">{u.email}</span>
                <div className="user-actions">
                  <Button
                    title="Editar"
                    variant="secondary"
                    onClick={() => {
                      setEditando(u.id);
                      setUserEditado(u);
                    }}
                  />
                  <Button
                    title="Deletar"
                    variant="danger"
                    onClick={() => deletarUser(u.id)}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

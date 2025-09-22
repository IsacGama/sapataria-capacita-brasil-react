import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./userSlice";
import Button from "../../Componentes/Buttons/Button";
import "./Auth.css";
import { authUtils } from "../../utils/clientApi";
import { userApi } from "../../utils/requestJson";

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Se já tiver token válido, vai direto pra UserPage
  useEffect(() => {
    const token = authUtils.obterToken();
    if (token && !authUtils.tokenExpirado(token)) {
      navigate("/user-page");
    }
  }, [navigate]);

  useEffect(() => {
    const token = authUtils.obterToken();
    if (token && !authUtils.tokenExpirado(token)) {
      // Decodifica o token
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Carrega o usuário do backend
      userApi.getUserById(payload.userId, token).then((userData) => {
        dispatch(setUser({ ...userData, token }));
        navigate("/user-page");
      }).catch(() => {
        authUtils.removerToken("user");
      });
    }
  }, [navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    try {
      // CORREÇÃO: Mudar de "/user/login" para "/users/login"
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao fazer login");

      // CORREÇÃO: Usar a chave correta para salvar o token
      authUtils.salvarToken(data.token, "user");
      
      // Decodificar token para obter ID do usuário
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      
      // Buscar dados completos do usuário
      const userData = await userApi.getUserById(payload.userId, data.token);

      // Atualizar estado global
      dispatch(setUser({ ...userData, token: data.token }));
      
      // Redirecionar para página do usuário
      navigate("/user-page");
    } catch (err) {
      setErro(err.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login do Usuário</h2>
        {erro && <div className="auth-error">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Seu email"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Sua senha"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={carregando}
            title={carregando ? "Entrando..." : "Entrar"}
          />
        </form>
      </div>
    </div>
  );
}

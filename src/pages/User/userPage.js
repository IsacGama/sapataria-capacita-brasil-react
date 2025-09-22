import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Componentes/Buttons/Button";
import "./UserPage.css";
import { setUser, logoutUser } from "../User/userSlice";
import { productApi, userApi } from "../../utils/requestJson";

export default function UserPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [users, setUsers] = useState([]);
  const [erro, setErro] = useState("");
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: 0,
    qtdEstoque: 0,
    tipo: "",
    cor: "",
    descricao: "",
    tamanhos: [],
    imagens: [],
  });
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [produtoEditado, setProdutoEditado] = useState({});

  // === Carrega usuário e dados ===
  const carregarUsuario = useCallback(async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return navigate("/login-user");

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("userToken");
        return navigate("/login-user");
      }

      if (user && user.id === payload.userId) return;

      const userData = await userApi.getUserById(payload.userId, token);
      dispatch(setUser({ ...userData, token }));
    } catch (err) {
      console.error(err);
      localStorage.removeItem("userToken");
      navigate("/login-user");
    }
  }, [dispatch, navigate, user]);

  const carregarDados = useCallback(async () => {
    if (!user?.token) return;

    try {
      const [produtosData, usersData] = await Promise.all([
        productApi.getAllProdutos(user.token),
        userApi.getUsers(user.token),
      ]);
      setProdutos(produtosData);
      setUsers(usersData);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar dados. Verifique suas permissões.");
    }
  }, [user]);

  useEffect(() => {
    const init = async () => {
      await carregarUsuario();
      await carregarDados();
      setCarregando(false);
    };
    init();
  }, [carregarUsuario, carregarDados]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(logoutUser());
    navigate("/login-user");
  };

  // === CRUD Produtos ===
  const criarProduto = async () => {
    if (!novoProduto.nome || novoProduto.preco <= 0) {
      setErro("Nome e preço válido são obrigatórios");
      return;
    }

    const formData = new FormData();
    formData.append("nome", novoProduto.nome);
    formData.append("preco", novoProduto.preco);
    formData.append("qtdEstoque", novoProduto.qtdEstoque);
    formData.append("tipo", novoProduto.tipo);
    formData.append("cor", novoProduto.cor);
    formData.append("descricao", novoProduto.descricao);

    novoProduto.tamanhos.forEach((t, i) =>
      formData.append(`tamanhos[${i}][nome]`, t)
    );
    novoProduto.imagens.forEach((img) => formData.append("imagens", img));

    try {
      const criado = await productApi.createProduto(formData, user.token);
      setProdutos([...produtos, criado]);
      setNovoProduto({
        nome: "",
        preco: 0,
        qtdEstoque: 0,
        tipo: "",
        cor: "",
        descricao: "",
        tamanhos: [],
        imagens: [],
      });
      setErro("");
    } catch (err) {
      setErro(err.message || "Erro ao criar produto");
    }
  };

  const iniciarEdicao = (prod) => {
    setEditando(prod.id);
    setProdutoEditado({
      ...prod,
      imagens: [],
      tamanhos: prod.tamanhos?.map((t) => t.nome) || [],
    });
  };

  const atualizarProduto = async (produtoId) => {
    const formData = new FormData();
    Object.entries(produtoEditado).forEach(([key, value]) => {
      if (key === "tamanhos") {
        value.forEach((t, i) => formData.append(`tamanhos[${i}][nome]`, t));
      } else if (key === "imagens") {
        value.forEach((img) => formData.append("imagens", img));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const atualizado = await productApi.updateProduto(
        produtoId,
        formData,
        user.token
      );
      setProdutos(produtos.map((p) => (p.id === produtoId ? atualizado : p)));
      setEditando(null);
      setProdutoEditado({});
      setErro("");
    } catch (err) {
      setErro(err.message || "Erro ao atualizar produto");
    }
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setProdutoEditado({});
  };

  const deletarProduto = async (produtoId) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      await productApi.deleteProduto(produtoId, user.token);
      setProdutos(produtos.filter((p) => p.id !== produtoId));
      setErro("");
    } catch (err) {
      setErro(err.message || "Erro ao deletar produto");
    }
  };

  if (carregando) return <div>Carregando...</div>;

  return (
    <div className="user-page">
      <div className="user-header">
        <h1>Painel do Usuário: {user?.nome}</h1>
        <Button title="Logout" variant="danger" onClick={handleLogout} />
      </div>

      {/* Usuários */}
      <div className="users-navegacao">
        <h2>Usuários</h2>
        <Link to="/user-management">
          <Button title="Gerenciar Usuários" variant="primary" />
        </Link>
      </div>

      {erro && <div className="error">{erro}</div>}

      {/* Produtos */}
      <section className="produtos-container">
        <div className="produtos-area">
          <h2 className="titulo-pagina">Produtos</h2>

          {/* Novo Produto */}
          <div className="novo-produto">
            <label>
              Nome:
              <input
                type="text"
                value={novoProduto.nome}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, nome: e.target.value })
                }
              />
            </label>

            <label>
              Preço:
              <input
                type="number"
                value={novoProduto.preco}
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    preco: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </label>

            <label>
              Estoque:
              <input
                type="number"
                value={novoProduto.qtdEstoque}
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    qtdEstoque: parseInt(e.target.value) || 0,
                  })
                }
              />
            </label>

            <label>
              Tipo:
              <input
                type="text"
                value={novoProduto.tipo}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, tipo: e.target.value })
                }
              />
            </label>

            <label>
              Cor:
              <input
                type="text"
                value={novoProduto.cor}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, cor: e.target.value })
                }
              />
            </label>

            <label>
              Descrição:
              <textarea
                value={novoProduto.descricao}
                onChange={(e) =>
                  setNovoProduto({ ...novoProduto, descricao: e.target.value })
                }
              />
            </label>

            <label>
              Tamanhos (vírgula separado):
              <input
                type="text"
                value={novoProduto.tamanhos.join(",")}
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    tamanhos: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>

            <label>
              Imagens:
              <input
                type="file"
                multiple
                onChange={(e) =>
                  setNovoProduto({
                    ...novoProduto,
                    imagens: Array.from(e.target.files),
                  })
                }
              />
            </label>

            <Button
              title="Criar Produto"
              variant="primary"
              onClick={criarProduto}
            />
          </div>

          {/* Grid Produtos */}
          <div className="grid-produtos">
            {produtos.map((prod) => {
              const imagemPrincipal =
                prod.imagens?.[0]?.url || "placeholder.jpg";

              return (
                <div key={prod.id} className="produto-card">
                  <img
                    src={imagemPrincipal}
                    alt={prod.nome}
                    className="produto-imagem-mini"
                  />

                  {editando === prod.id ? (
                    <>
                      <label>
                        Nome:
                        <input
                          type="text"
                          value={produtoEditado.nome || ""}
                          onChange={(e) =>
                            setProdutoEditado({
                              ...produtoEditado,
                              nome: e.target.value,
                            })
                          }
                        />
                      </label>

                      <label>
                        Preço:
                        <input
                          type="number"
                          value={produtoEditado.preco || 0}
                          onChange={(e) =>
                            setProdutoEditado({
                              ...produtoEditado,
                              preco: parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </label>

                      <label>
                        Estoque:
                        <input
                          type="number"
                          value={produtoEditado.qtdEstoque || 0}
                          onChange={(e) =>
                            setProdutoEditado({
                              ...produtoEditado,
                              qtdEstoque: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </label>

                      <label>
                        Tipo:
                        <input
                          type="text"
                          value={produtoEditado.tipo || ""}
                          onChange={(e) =>
                            setProdutoEditado({
                              ...produtoEditado,
                              tipo: e.target.value,
                            })
                          }
                        />
                      </label>

                      <label>
                        Cor:
                        <input
                          type="text"
                          value={produtoEditado.cor || ""}
                          onChange={(e) =>
                            setProdutoEditado({
                              ...produtoEditado,
                              cor: e.target.value,
                            })
                          }
                        />
                      </label>

                      <label>
                        Descrição:
                        <textarea
                          value={produtoEditado.descricao || ""}
                          onChange={(e) =>
                            setProdutoEditado({
                              ...produtoEditado,
                              descricao: e.target.value,
                            })
                          }
                        />
                      </label>

                      <label>
                        Tamanhos (vírgula separado):
                        <input
                          type="text"
                          value={produtoEditado.tamanhos?.join(",") || ""}
                          onChange={(e) =>
                            setProdutoEditado({
                              ...produtoEditado,
                              tamanhos: e.target.value
                                .split(",")
                                .map((t) => t.trim())
                                .filter(Boolean),
                            })
                          }
                        />
                      </label>

                      <label>
                        Novas Imagens:
                        <input
                          type="file"
                          multiple
                          onChange={(e) =>
                            setProdutoEditado({
                              ...produtoEditado,
                              imagens: Array.from(e.target.files),
                            })
                          }
                        />
                      </label>

                      <div className="produto-actions">
                        <Button
                          title="Salvar"
                          variant="success"
                          onClick={() => atualizarProduto(prod.id)}
                        />
                        <Button
                          title="Cancelar"
                          variant="secondary"
                          onClick={cancelarEdicao}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="produto-nome">{prod.nome}</span>
                      <span className="produto-tipo">Tipo: {prod.tipo}</span>
                      <span className="produto-cor">Cor: {prod.cor}</span>
                      <span className="produto-estoque">
                        Estoque: {prod.qtdEstoque}
                      </span>
                      <span className="produto-vendido">
                        Vendido: {prod.qtdVendido}
                      </span>
                      <span className="produto-avaliacao">
                        Avaliações: {prod.qtdAvaliacao}
                      </span>
                      <div className="produto-actions">
                        <Button
                          title="Editar"
                          variant="secondary"
                          onClick={() => iniciarEdicao(prod)}
                        />
                        <Button
                          title="Deletar"
                          variant="danger"
                          onClick={() => deletarProduto(prod.id)}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

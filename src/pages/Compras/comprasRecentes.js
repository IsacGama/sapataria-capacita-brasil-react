import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../Componentes/Buttons/Button";
import "./ComprasRecentes.css";
import { authUtils } from "../../utils/clientApi";
import { comprasApi } from "../../utils/comprasApi";

export default function ComprasRecentes() {
  const [compras, setCompras] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const cliente = useSelector((state) => state.client);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const carregarCompras = async () => {
      try {
        const token = authUtils.obterToken();
        if (!token) {
          navigate("/login-cliente");
          return;
        }

        const comprasData = await comprasApi.getCompras(token);

        // Processa imagens bytea para URLs, igual ao cardProduto
        const comprasComUrls = comprasData.map((compra) => ({
          ...compra,
          itens: compra.itens.map((item) => ({
            ...item,
            imagemUrl: item.produto?.imagens?.[0]
              ? `${BASE_URL}/produtos/imagem/${item.produto.imagens[0].id}`
              : "/placeholder.png", // caso não tenha imagem
          })),
        }));

        setCompras(comprasComUrls);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarCompras();
  }, [navigate]);

  const formatarData = (dataString) =>
    new Date(dataString).toLocaleDateString("pt-BR");

  const formatarPreco = (preco) => `R$ ${preco.toFixed(2).replace(".", ",")}`;

  const getStatusColor = (status) => {
    switch (status) {
      case "PAID":
        return "status-paid";
      case "SENT":
        return "status-sent";
      case "DELIVERED":
        return "status-delivered";
      case "CANCELED":
        return "status-canceled";
      default:
        return "status-pending";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "PAID":
        return "Pago";
      case "SENT":
        return "Enviado";
      case "DELIVERED":
        return "Entregue";
      case "CANCELED":
        return "Cancelado";
      default:
        return status;
    }
  };

  if (carregando)
    return <div className="compras-carregando">Carregando compras...</div>;
  if (erro) return <div className="compras-erro">Erro: {erro}</div>;

  return (
    <div className="compras-recentes">
      <div className="compras-header">
        <h1>Minhas Compras</h1>
        <Button
          title="Voltar para Perfil"
          variant="secondary"
          onClick={() => navigate("/client-page")}
        />
      </div>

      {compras.length === 0 ? (
        <div className="compras-vazias">
          <p>Nenhuma compra encontrada.</p>
          <Button
            title="Ir para Loja"
            variant="primary"
            onClick={() => navigate("/produtos")}
          />
        </div>
      ) : (
        <div className="compras-lista">
          {compras.map((compra) => (
            <div key={compra.id} className="compra-card">
              <div className="compra-header">
                <div className="compra-info">
                  <h3>Compra #{compra.id}</h3>
                  <span
                    className={`status-badge ${getStatusColor(compra.status)}`}
                  >
                    {getStatusText(compra.status)}
                  </span>
                </div>
                <div className="compra-data">
                  <span>Data: {formatarData(compra.criadoEm)}</span>
                  <span>
                    Total:{" "}
                    {formatarPreco(
                      compra.itens.reduce(
                        (total, item) =>
                          total + item.precoUnit * item.quantidade,
                        0
                      )
                    )}
                  </span>
                </div>
              </div>

              <div className="compra-itens">
                <h4>Itens:</h4>
                {compra.itens.map((item) => {
                  const imagemUrl = item.imagemUrl;
                  const nomeProduto =
                    item.produto?.nome || `Produto #${item.produtoId}`;
                  return (
                    <div key={item.id} className="compra-item">
                      <div className="item-info">
                        <img src={imagemUrl} alt={nomeProduto} />
                        <span>
                          {item.quantidade}x {nomeProduto}
                        </span>
                      </div>
                      <span>
                        {formatarPreco(item.precoUnit * item.quantidade)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {compra.status === "PENDING" && (
                <div className="compra-acoes">
                  <Button
                    title="Cancelar Compra"
                    variant="danger"
                    size="small"
                    onClick={async () => {
                      try {
                        const token = authUtils.obterToken();
                        await comprasApi.cancelCompra(compra.id, token);
                        setCompras(
                          compras.map((c) =>
                            c.id === compra.id
                              ? { ...c, status: "CANCELED" }
                              : c
                          )
                        );
                      } catch (error) {
                        setErro(error.message);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-%5E1.9.5-purple?logo=redux)
![Status](https://img.shields.io/badge/status-concluído-brightgreen)

# 👞 Sapataria Capacita Brasil

Uma loja virtual de calçados sociais desenvolvida com React e Redux Toolkit. O projeto simula a experiência completa de uma loja: exibição de produtos, filtros, carrossel, carrinho, checkout e painel de histórico de compras. Este projeto foi desenvolvido pela equipe durante o Módulo Intermediário do curso de Desenvolvimento Fullstack do Capacita Brasil.

## 🚀 Tecnologias Utilizadas

- **React** – Biblioteca de UI
- **React Router DOM** – Navegação SPA
- **Redux Toolkit** – Gerenciamento de estado global (carrinho)
- **Lucide-react** – Ícones SVG
- **Embla-carousel-react** – Slider de imagens/carrossel
- **math.js** – Avaliação segura de expressões (sem `eval`)
- **CSS Modules ou arquivos .css por componente**

## 📦 Funcionalidades

- 🖼️ **Banner principal com carrossel automático**
- 🛍️ **Visualização de produtos** com múltiplas imagens, hover, e avaliações
- 🧮 **Filtros dinâmicos** por tipo, cor e faixa de preço
- 🔍 **Barra de busca com autocomplete**
- 🛒 **Carrinho de compras com Redux** e persistência no estado global
- 💳 **Resumo da compra** com valores totais e botão de confirmação
- 📜 **Histórico de compras e painel de memória**
- 📱 **Layout responsivo com menu mobile**
- ⚡ Navegação rápida com React Router Dom

## 🛒 Lógica do Carrinho

- Os produtos adicionados ao carrinho são controlados via `Redux`
- O componente `CartSlice.js` cuida do estado global
- Operações possíveis:
  - Adicionar/remover produto
  - Alterar quantidade
  - Calcular subtotal e total final
  - Confirmar compra (reseta carrinho e envia ao histórico)

---

## 🔍 Busca com Autocomplete

- Campo de busca com lupa (ícone)
- Sugestões estilizadas (imagem, nome e preço)
- Busca é acionada ao clicar no botão **OK** ou pressionar **Enter**
- Sugestões redirecionam para `/produtos/:id`

---

## 💡 Como adicionar novos produtos

1. Vá até `public/data/sapatos.json` ou onde estiver a lista de produtos
2. Adicione um novo objeto com estrutura semelhante:

```json
{
    "id": 1,
    "nome": "Sapato Social Penny Loafer Preto",
    "tipo": "Penny Loafer",
    "cor": "Preto",
    "stars": 4.5,
    "qtdEstoque": 10,
    "qtdVendido": 5,
    "qtdAvaliacao": 110,
    "preco": {
      "semDesconto": 748.0,
      "aVista": 710.6,
      "parcelado": [
        {
          "parcelas": 3,
          "valor": 249.33
        },
        {
          "parcelas": 6,
          "valor": 124.67
        },
        {
          "parcelas": 12,
          "valor": 62.33
        }
      ]
    },
    "imagens": [
      "/assets/images/SocialPennyLoaferPreto/SocialPennyLoaferPreto_1.png",
      "/assets/images/SocialPennyLoaferPreto/SocialPennyLoaferPreto_2.png",
      "/assets/images/SocialPennyLoaferPreto/SocialPennyLoaferPreto_3.png",
      "/assets/images/SocialPennyLoaferPreto/SocialPennyLoaferPreto_4.png",
      "/assets/images/SocialPennyLoaferPreto/SocialPennyLoaferPreto_5.png",
      "/assets/images/SocialPennyLoaferPreto/SocialPennyLoaferPreto_6.png"
    ],
    "descricao": "Um sapato social elegante com acabamento premium em couro legítimo.",
    "tamanhos": [
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44
    ]
}
```
---

## 📂 Estrutura do Projeto

```bash
├── public/
│ ├── assets/
│ │ ├── images/
│ │ └── RedeSociais/
│ └── data/
│ ├── Carrinho.json
│ └── sapatos.json
├── src/
│ ├── Componentes/
│ │ ├── Banner/
│ │ ├── Buttons/
│ │ ├── Cart/
│ │ ├── Filtros/
│ │ ├── Footer/
│ │ ├── Header/
│ │ ├── MiniaturasSlider/
│ │ ├── Produtos/CardProduto/
│ │ ├── QuantitySelector/
│ │ ├── ResumoCompra/
│ │ ├── SearchBar/
│ │ ├── SelectSize/
│ │ └── Stars/
│ ├── pages/
│ │ ├── Carrinho/
│ │ ├── Checkout/
│ │ ├── Home/
│ │ ├── ProdutoEspecifico/
│ │ ├── ProdutosGeral/
│ │ └── Sobre/
│ ├── utils/
│ ├── App.js
│ ├── store.js
│ └── index.js
├── .gitignore
├── package-lock.json
└── README.md
```

## 👨‍💻 Desenvolvedores

| Foto | Nome | GitHub | LinkedIn |
|------|------|--------|----------|
| ![Foto 1](https://avatars.githubusercontent.com/u/87917139?v=4) | Isac Dias Gama | [GitHub](https://github.com/IsacGama/) | [LinkedIn](https://www.linkedin.com/in/isacgama/) |
| ![Foto 2](https://avatars.githubusercontent.com/u/136024712?v=4) | Beatriz Castro | [GitHub](https://github.com/bcastroea) | [LinkedIn](https://www.linkedin.com/in/beatriz-castro-a44934282/) |
| ![Foto 3](https://avatars.githubusercontent.com/u/141072611?v=4) | Bruno Erick | [GitHub](https://github.com/bericktk) | [LinkedIn](https://www.linkedin.com/in/brunoerick-desenvolvedor-back-end/) |
| ![Foto 4](https://avatars.githubusercontent.com/u/58824534?v=4) | Ramiro Dantas | [GitHub](https://github.com/RamiroDantas) | [LinkedIn](https://www.linkedin.com/in/ramiro-dantas-766908228/) |
| ![Foto 5](https://avatars.githubusercontent.com/u/202461120?v=4) | José Cleudiano | [GitHub](https://github.com/Cleudianojunior) | [LinkedIn](https://www.linkedin.com/in/jos%C3%A9-cleudiano-9395701a4/) |
| ![Foto 6](https://avatars.githubusercontent.com/u/208545833?v=4) | Adison | [GitHub](https://github.com/adison2512) | [LinkedIn](Sem link) |

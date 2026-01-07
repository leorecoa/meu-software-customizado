# Laboratório de Hooks e Performance em React

> Um dashboard interativo para explorar e dominar os principais Hooks do React, otimizações de performance e boas práticas de desenvolvimento com TypeScript e Vite.

[**Clique aqui para ver a demonstração ao vivo**](https://meu-software-customizado.vercel.app/)

<!-- Adicione aqui um screenshot ou GIF do seu app! -->
<!-- ![Screenshot do App](URL_DA_IMAGEM_AQUI) -->

---


## 🚀 Sobre o Projeto

Este projeto foi criado como um "campo de treinamento" para aprofundar o conhecimento no ecossistema React moderno. Em vez de apenas construir uma UI, o foco foi entender **como e por que** as coisas funcionam, abordando desde o ciclo de vida e renderização de componentes até estratégias avançadas de gerenciamento de estado e estilização.

A aplicação é um dashboard interativo onde cada "card" demonstra um conceito específico do React, permitindo visualizar na prática os efeitos de cada otimização.

## 🛠️ Construído Com

*   **React 18:** Utilizando os hooks mais recentes e o modelo de renderização concorrente.
*   **TypeScript:** Para um código mais seguro, legível e escalável.
*   **Vite:** Para um ambiente de desenvolvimento e build extremamente rápido.
*   **React Router DOM:** Para gerenciamento de rotas no lado do cliente (SPA) com layout persistente.
*   **CSS Modules:** Para estilização escopada e organizada, evitando conflitos de classe.
*   **Vercel:** Para deploy contínuo (CI/CD) e hosting.

## ⚙️ Como Executar Localmente

Para clonar e rodar esta aplicação, você precisará do [Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/download/) (v20 ou superior) instalados no seu computador.

```bash
# 1. Clone o repositório
git clone https://github.com/leorecoa/meu-software-customizado.git

# 2. Navegue até a pasta do projeto
cd meu-software-customizado

# 3. Instale as dependências
npm install

# 4. Rode o servidor de desenvolvimento
npm run dev
```

## ✨ Funcionalidades e Conceitos Aplicados

*   **Hooks Fundamentais:** Demonstrações práticas de `useState`, `useEffect` e `useRef`.
*   **Gerenciamento de Estado Avançado:** Evolução de `useState` para `useReducer` para lógicas mais complexas e centralizadas.
*   **Otimização de Performance:**
    *   `React.memo` para evitar re-renderização de componentes filhos.
    *   `useCallback` para memorizar funções e manter a estabilidade de referência para props.
    *   `useMemo` para memorizar cálculos pesados e evitar sua re-execução a cada render.
*   **Roteamento:**
    *   Configuração de rotas com `react-router-dom`.
    *   Layout persistente com `Outlet` e `Navbar`.
    *   Leitura de parâmetros da URL com `useParams`.
    *   Navegação programática com `useNavigate`.
    *   Estilização de links ativos com `NavLink`.
*   **Estilização e UI/UX:**
## 🎨 Design System

### Tokens
- Colors via CSS Variables
- Tipografia escalável
- Espaçamentos padronizados

### Tema
- Dark/Light com `data-theme`
- Persistência no localStorage

### Componentes
- Button
- Card
- Layouts reutilizáveis

### Padrões
- CSS Modules
- UI desacoplada de páginas

*   **DevOps:**
    *   Configuração de projeto com Vite e TypeScript.
    *   Deploy contínuo (CI/CD) configurado no Vercel.

## 🧠 Estudo de Caso: Desafios e Aprendizados

Esta seção detalha as decisões técnicas e os aprendizados obtidos durante o desenvolvimento.

### 1. O Problema da Re-renderização Desnecessária

Um dos maiores desafios em React é garantir que a aplicação permaneça performática à medida que cresce. Inicialmente, qualquer mudança de estado no componente principal (`RevisaoHooks`) causava a re-renderização de todos os seus filhos, incluindo a execução de cálculos pesados.

*   **Solução:**
    *   O **`useMemo`** foi aplicado ao `resultadoCalculoPesado`. Com isso, o cálculo só é refeito quando sua dependência (`count`) muda, e não quando outros estados (como o `toggle`) são alterados.
    *   O **`ComponenteFilho`** foi envolvido em **`React.memo`**, que faz uma comparação superficial de suas props.
    *   No entanto, apenas o `React.memo` não foi suficiente, pois a função `handleChildClick` era recriada a cada renderização do pai. A solução foi envolver `handleChildClick` com **`useCallback`**, garantindo que sua referência permanecesse estável.

### 2. Organização do Estado: `useState` vs. `useReducer`

O estado do contador, embora simples, foi migrado de `useState` para `useReducer` como um exercício prático.

*   **Aprendizado:** `useReducer` centraliza toda a lógica de transição de estado em uma única função (o *reducer*). Isso torna o componente mais limpo (os handlers apenas despacham ações) e o estado mais previsível e fácil de testar, uma abordagem que escala muito melhor para estados mais complexos.

### 3. Implementando um Tema Escuro Escalável

A implementação do Dark Mode foi feita de forma a ser robusta e de fácil manutenção.

*   **Estratégia:**
    1.  **Variáveis CSS:** Todas as cores do projeto foram definidas em variáveis no `:root` do `index.css`.
    2.  **Sobrescrita com Classe:** Um arquivo `dark-mode.css` define os valores dessas mesmas variáveis quando o elemento `<html>` possui a classe `.dark`.
    3.  **Context API:** O `ThemeContext` foi criado para gerenciar o estado atual do tema, persistir a escolha no `localStorage` e aplicar/remover a classe `.dark` do `<html>`.
    4.  **Transições Suaves:** Uma transição CSS global foi adicionada para `background-color`, `color`, e `border-color`, garantindo que a troca de tema seja suave em toda a aplicação.

Essa abordagem desacopla a lógica do tema dos componentes, que apenas consomem as variáveis CSS sem precisar saber qual tema está ativo.
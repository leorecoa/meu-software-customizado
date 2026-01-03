📊 Meu Software Customizado — Dashboard de Projetos

Este projeto é um Dashboard de Gerenciamento de Projetos desenvolvido com foco em boas práticas de engenharia de software, tipagem estrita, organização arquitetural e experiência do desenvolvedor (DX).

A aplicação permite criar, listar, filtrar, editar e excluir projetos, com persistência local, paginação, exportação de dados e suporte a tema claro/escuro (Dark & Light Mode).

🚀 Stack Tecnológica e Decisões Arquiteturais

As tecnologias foram escolhidas priorizando performance, manutenibilidade, escalabilidade e clareza de código.

🔹 Core

React (Hooks + Function Components)
Utilizado pela sua abordagem declarativa, composição via Hooks e ecossistema maduro para SPAs modernas.

TypeScript (modo strict)
O projeto utiliza TypeScript com strict: true, garantindo:

menor chance de erros em runtime

refatorações seguras

contratos claros entre componentes

código auto-documentado

Vite
Utilizado como bundler por oferecer:

build extremamente rápido

HMR instantâneo

configuração simples

excelente integração com TypeScript e testes

🔹 Roteamento

React Router DOM
Responsável pela navegação entre páginas sem recarregamento, seguindo o padrão SPA (Single Page Application).

🎨 Estilização

CSS Modules (*.module.css)
Escolhido para garantir escopo local de estilos, evitando colisões de classes e mantendo simplicidade sem custo de runtime.

CSS Variables (Custom Properties)
Utilizadas como base do sistema de temas (Dark / Light), permitindo troca instantânea de paleta sem re-renderizações desnecessárias.

🧪 Qualidade e Testes

Vitest
Utilizado para testes unitários por ser nativo do ecossistema Vite, oferecendo:

execução rápida

configuração compartilhada com o build

ótima experiência de desenvolvimento

ESLint (Flat Config)
Aplicado para manter padronização de código, evitar anti-patterns e reforçar boas práticas.

🏗️ Arquitetura do Projeto

O projeto segue o princípio de Separação de Responsabilidades (SoC), mantendo cada camada com uma função bem definida:

src/
├── components/   # Componentes de UI reutilizáveis (presentational)
├── contexts/     # Estados globais (ThemeContext)
├── hooks/        # Regras de negócio encapsuladas em hooks
├── pages/        # Páginas da aplicação (containers)
├── services/     # Camada de acesso a dados (CRUD / persistência)
├── types/        # Tipos TypeScript compartilhados
└── styles/       # Estilos globais e variáveis de tema

🧩 Padrões de Design Aplicados
🔹 Service Pattern

A camada de serviços abstrai completamente a origem dos dados.

Exemplo:

projetoService.getAll()


A interface da aplicação não depende da fonte de dados.
Atualmente os dados são persistidos via localStorage, mas o serviço pode ser facilmente adaptado para consumir uma API REST sem impacto nos componentes.

🔹 Custom Hooks

A lógica de negócio (busca, filtro, ordenação, paginação) foi extraída para hooks customizados, como:

useProjetos

Isso traz:

melhor legibilidade

fácil reutilização

maior testabilidade

componentes de UI mais simples

🔹 Context API

O ThemeContext é utilizado para gerenciar o tema global da aplicação, evitando prop drilling e mantendo a lógica de tema centralizada.

🛠️ Instalação e Execução
Pré-requisitos

Node.js 18+

1️⃣ Instalar dependências
npm install

2️⃣ Executar em modo desenvolvimento
npm run dev

3️⃣ Executar testes unitários
npm test

4️⃣ Gerar build de produção
npm run build

🧪 Estratégia de Testes

Os testes unitários focam principalmente em:

Services: validação de CRUD e persistência

Lógica de negócio: funções puras e hooks

Durante os testes:

o localStorage é mockado

cada teste roda em ambiente isolado

o comportamento é previsível e determinístico

🔮 Roadmap e Melhorias Futuras

Possíveis evoluções do projeto:

 Integração com backend real (API REST)

 React Query / TanStack Query para cache e sincronização de dados

 Testes E2E com Cypress ou Playwright

 Internacionalização (i18n)

 Autenticação e autorização

 Design System mais completo (tokens, sizes, loading states)

📌 Considerações Finais

Este projeto foi desenvolvido com foco em Clean Code, boas práticas, organização e clareza arquitetural, servindo tanto como aplicação funcional quanto como case técnico.
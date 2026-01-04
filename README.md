📊 Meu Software Customizado — Dashboard de Projetos

Este projeto é um Dashboard de Gerenciamento de Projetos desenvolvido com foco em boas práticas de engenharia de software, tipagem estrita, organização arquitetural e excelente experiência do desenvolvedor (DX).

A aplicação permite criar, listar, filtrar, editar e excluir projetos, contando com persistência local, paginação, exportação de dados e suporte a tema claro/escuro (Light & Dark Mode).

🤖 Desenvolvimento Assistido por Inteligência Artificial

Este projeto foi desenvolvido com uso consciente, técnico e responsável de Inteligência Artificial, seguindo práticas modernas adotadas por times de alta performance.

A IA foi utilizada como ferramenta de apoio, principalmente para:

Acelerar decisões arquiteturais, avaliando trade-offs entre padrões e bibliotecas

Refinar tipagens TypeScript, garantindo contratos mais seguros entre camadas

Identificar edge cases e anti-patterns, especialmente em Context API, Hooks e Services

Apoiar refatorações incrementais, preservando legibilidade e previsibilidade do código

Validar boas práticas como Clean Code, separação de responsabilidades e performance

Todo o código foi analisado, adaptado e validado manualmente, com foco em:

Clareza

Manutenibilidade

Escalabilidade

Consistência com padrões de mercado

A Inteligência Artificial revoluciona o desenvolvimento de software ao transformar boas ideias em soluções melhores, mais rápidas e mais seguras — quando usada com critério técnico.

O desenvolvedor permanece como responsável final por todas as decisões e implementações.

🚀 Stack Tecnológica e Decisões Arquiteturais

As tecnologias foram escolhidas priorizando performance, manutenibilidade, escalabilidade e clareza de código.

🔹 Core

React (Function Components + Hooks)
Utilizado pela abordagem declarativa, composição eficiente e ecossistema maduro para SPAs modernas.

TypeScript (modo strict)
O projeto utiliza strict: true, garantindo:

menor risco de erros em runtime

refatorações seguras

contratos claros entre componentes

código auto-documentado

Vite
Bundler escolhido por oferecer:

build extremamente rápido

HMR instantâneo

configuração simples

excelente integração com TypeScript e testes

🔹 Roteamento

React Router DOM
Responsável pela navegação entre páginas seguindo o padrão Single Page Application (SPA), sem recarregamento da página.

🎨 Estilização

CSS Modules (*.module.css)
Garantem escopo local de estilos, evitando colisões de classes e mantendo simplicidade sem custo de runtime.

CSS Variables (Custom Properties)
Utilizadas como base do sistema de temas (Light / Dark), permitindo troca instantânea de paleta sem re-renderizações desnecessárias.

🧪 Qualidade e Testes

Vitest
Executor de testes unitários nativo do ecossistema Vite, oferecendo:

execução rápida

configuração compartilhada com o build

excelente experiência de desenvolvimento

ESLint (Flat Config)
Aplicado para padronização de código, prevenção de anti-patterns e reforço de boas práticas.

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

A camada de serviços abstrai completamente a origem dos dados:

projetoService.getAll();


A interface da aplicação não depende da fonte de dados.
Atualmente os dados são persistidos via localStorage, mas o serviço pode ser facilmente adaptado para consumir uma API REST sem impacto nos componentes.

🔹 Custom Hooks

A lógica de negócio (busca, filtro, ordenação e paginação) foi extraída para hooks customizados, como:

useProjetos

Benefícios:

melhor legibilidade

reutilização de lógica

maior testabilidade

componentes de UI mais simples

🔹 Context API

O ThemeContext é utilizado para gerenciar o tema global da aplicação, evitando prop drilling e mantendo a lógica centralizada.

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

Design System mais completo (tokens, tamanhos, estados de loading)

📌 Considerações Finais

Este projeto foi desenvolvido com foco em Clean Code, boas práticas, organização arquitetural e clareza técnica, servindo tanto como aplicação funcional quanto como case técnico de portfólio.

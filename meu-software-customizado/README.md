# 📊 Dashboard de Gerenciamento de Projetos

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![React](https://img.shields.io/badge/React-19.2-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

> Uma aplicação web moderna e completa para gerenciamento de projetos, desenvolvida com React, TypeScript e Vite. Interface intuitiva, recursos avançados e código de qualidade profissional.

## 🎯 Visão Geral

Este projeto é um **Dashboard completo de Gerenciamento de Projetos** que demonstra boas práticas de desenvolvimento front-end moderno. A aplicação oferece uma experiência rica e profissional para criar, visualizar, editar e gerenciar projetos com múltiplos recursos avançados.

### ✨ Principais Funcionalidades

- 📋 **CRUD Completo**: Criar, ler, atualizar e excluir projetos
- 🔍 **Busca Avançada**: Pesquisa em tempo real por nome ou descrição
- 🎨 **Filtros Inteligentes**: Filtro por status (Pendente, Em Andamento, Concluído)
- 📊 **Dashboard com Estatísticas**: Cards com métricas e gráficos visuais
- 📈 **Gráficos de Status**: Visualização gráfica da distribuição de projetos
- 🔄 **Ordenação**: Ordenar por nome, data, prioridade ou status
- 📄 **Exportação de Dados**: Exportar para CSV ou JSON
- ✅ **Seleção Múltipla**: Selecionar e excluir múltiplos projetos
- 📱 **Responsivo**: Design adaptável para desktop, tablet e mobile
- 🌙 **Dark Mode**: Suporte completo a tema claro e escuro
- 📄 **Paginação**: Navegação eficiente entre páginas de resultados
- ⚠️ **Error Boundary**: Tratamento robusto de erros
- 💾 **Persistência Local**: Dados salvos no localStorage

## 🚀 Tecnologias Utilizadas

### Core
- **React 19.2** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9** - Superset do JavaScript com tipagem estática (strict mode)
- **Vite 7.3** - Build tool moderna e extremamente rápida

### Roteamento
- **React Router DOM 7.1** - Roteamento para Single Page Applications

### UI/UX
- **CSS Modules** - Estilos com escopo local
- **CSS Variables** - Sistema de temas dinâmico
- **React Toastify** - Notificações elegantes

### Testes
- **Vitest 4.0** - Framework de testes unitários
- **Testing Library** - Utilitários para testes de componentes React
- **jsdom** - Ambiente DOM para testes

### Qualidade de Código
- **ESLint** - Linter para manter padrões de código
- **Prettier** - Formatador de código

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/dashboard-projetos.git
cd dashboard-projetos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção

# Testes
npm test             # Executa testes unitários
npm test:ui          # Executa testes com interface visual

# Qualidade
npm run lint         # Verifica código com ESLint
npm run format       # Formata código com Prettier

# Preview
npm run preview      # Preview do build de produção
```

## 🏗️ Arquitetura

O projeto segue o princípio de **Separação de Responsabilidades (SoC)**, organizando o código em camadas bem definidas:

```
src/
├── components/      # Componentes de UI reutilizáveis
│   ├── Button.tsx
│   ├── ProjetoCard.tsx
│   ├── StatsCard.tsx
│   ├── StatusChart.tsx
│   ├── ErrorBoundary.tsx
│   └── ...
├── contexts/        # Contextos React (ThemeContext)
├── hooks/           # Custom Hooks
│   ├── usePagination.ts
│   ├── useSelection.ts
│   └── useSort.ts
├── pages/           # Páginas da aplicação
│   └── Dashboard.tsx
├── services/        # Camada de serviços (CRUD)
│   └── projetoService.ts
├── types/           # Definições TypeScript
│   └── Projeto.ts
└── utils/           # Funções utilitárias
    └── exportUtils.ts
```

## 🎨 Recursos Visuais

### Dashboard
- **Cards de Estatísticas**: Métricas visuais com ícones e cores
- **Gráficos**: Visualização da distribuição de projetos por status
- **Layout Responsivo**: Grid adaptável para diferentes tamanhos de tela

### Cards de Projeto
- **Design Moderno**: Interface limpa e profissional
- **Badges de Status**: Indicadores visuais coloridos
- **Badges de Prioridade**: Diferenciação clara de prioridades
- **Indicador de Atraso**: Alerta visual para projetos atrasados
- **Animações**: Transições suaves e feedback visual

### Tema Escuro/Claro
- **Troca Instantânea**: Alternância suave entre temas
- **Persistência**: Preferência salva no localStorage
- **Detecção Automática**: Detecta preferência do sistema

## 🧪 Testes

O projeto possui cobertura de testes para:

- ✅ **Services**: CRUD e persistência
- ✅ **Hooks**: Lógica de negócio (paginação, seleção, ordenação)
- ✅ **Componentes**: Renderização e interações

```bash
npm test
```

## 📊 Métricas e Estatísticas

O dashboard exibe:

- 📁 **Total de Projetos**
- ⏳ **Projetos Pendentes**
- 🚀 **Em Andamento**
- ✅ **Concluídos**
- ⚠️ **Atrasados**

## 💡 Destaques Técnicos

### TypeScript Strict Mode
- Tipagem estrita habilitada
- Tipos bem definidos em toda aplicação
- IntelliSense completo no IDE

### Custom Hooks
- Lógica de negócio isolada e reutilizável
- Fácil manutenção e testes
- Composição eficiente

### Service Pattern
- Abstração da camada de dados
- Fácil migração para API REST
- Código desacoplado

### Error Handling
- Error Boundary para capturar erros React
- Tratamento de erros no localStorage
- Feedback visual para o usuário

### Performance
- Code splitting automático (Vite)
- Lazy loading quando apropriado
- Otimizações de re-renderização

## 🎯 Casos de Uso

Este projeto é ideal para:

- 📚 **Portfólio**: Demonstração de habilidades técnicas
- 🎓 **Aprendizado**: Referência de boas práticas React/TypeScript
- 💼 **Case de Trabalho**: Exemplo de aplicação profissional
- 🚀 **Base para Projetos**: Estrutura para expandir funcionalidades

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Perfil](https://linkedin.com/in/seu-perfil)

## 🙏 Agradecimentos

- React Team pela excelente biblioteca
- Vite Team pela ferramenta incrível
- Comunidade open source por todas as bibliotecas utilizadas

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!

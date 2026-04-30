# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e o projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-30

### ✨ Added (Features Novas)

#### Backend
- ✅ Servidor Express com CORS configurado
- ✅ NLP simples com interpretação de intenção (preço, localização, comparação)
- ✅ Sistema de keywords para melhorar confiança da interpretação
- ✅ Extração de nome de produtos da mensagem do usuário
- ✅ Queries otimizadas ao MySQL com connection pooling
- ✅ Busca de preços com ordenação por valor
- ✅ Busca de estabelecimentos por produto e cidade
- ✅ Busca de melhor preço com estatísticas
- ✅ Formatação de respostas com emojis e estrutura clara
- ✅ Middleware global de error handling
- ✅ Logger estruturado com timestamps
- ✅ Validadores de entrada reutilizáveis
- ✅ Health check endpoint
- ✅ Graceful shutdown handling
- ✅ Índices no banco de dados para performance

#### Frontend
- ✅ Componente ChatbotWidget com botão flutuante
- ✅ Componente ChatWindow com histórico de mensagens
- ✅ Componente ChatMessage com suporte a metadata
- ✅ Cliente HTTP Axios com interceptors
- ✅ Página Home com header, banner, ofertas e footer
- ✅ Chat responsivo (mobile-first design)
- ✅ CSS variables para consistência de cores
- ✅ Animações suaves (slide-in, bounce, fade)
- ✅ Backdrop filter para overlay do chat
- ✅ PropTypes em todos componentes
- ✅ useCallback para otimização de performance
- ✅ Error handling com feedback visual
- ✅ ARIA labels para acessibilidade
- ✅ Google Fonts (Poppins) integrado

#### Database
- ✅ Tabela produtos com índice em nome
- ✅ Tabela estabelecimentos com índice em cidade
- ✅ Tabela precos com foreign keys e unique constraint
- ✅ Índices para queries otimizadas

#### Documentação
- ✅ README.md completo com setup, API docs, troubleshooting
- ✅ ARCHITECTURE.md com detalhes técnicos
- ✅ CONTRIBUTING.md com guia de contribuição
- ✅ CHANGELOG.md (este arquivo)
- ✅ Comments JSDoc em funções principais

### 🔧 Changed (Melhorias)

- 🔄 Refatoração do código backend com MVC pattern
- 🔄 Melhoria no sistema de NLP com keywords configuráveis
- 🔄 Otimização de queries SQL com INNER JOINs
- 🔄 Melhor estrutura de pasta (middleware, utils, services)
- 🔄 Melhor tratamento de erros com mensagens específicas
- 🔄 CSS refatorado com mais breakpoints responsivos

### 🐛 Fixed

- 🐛 Validação correta de mensagens vazias
- 🐛 Tratamento de timeouts de API
- 🐛 Scroll automático para novas mensagens no chat
- 🐛 Desabilitação de botão enviar enquanto carregando

### 📚 Docs

- 📝 README.md: 300+ linhas com instruções completas
- 📝 ARCHITECTURE.md: Explicação de padrões e decisões técnicas
- 📝 CONTRIBUTING.md: Guia para contribuidores
- 📝 API Documentation: Detalhes de cada endpoint

### 🔐 Security

- ✅ Prepared statements para prevenir SQL injection
- ✅ CORS configurado com whitelist
- ✅ Input validation em servidor
- ✅ Variáveis sensíveis em .env (não versionadas)
- ✅ React escapa HTML automaticamente

### ⚡ Performance

- ⚡ Connection pooling MySQL (10 conexões)
- ⚡ Database indexes em campos frequentemente consultados
- ⚡ useCallback para evitar re-renders desnecessários
- ⚡ CSS variables para reduzir duplication
- ⚡ Limit em queries (max 100 resultados)

---

## [0.1.0] - 2026-04-22

### ✨ Initial Planning

- 📋 Planejamento da arquitetura
- 📋 Decisão do stack tecnológico (React + Node.js + MySQL)
- 📋 Design do banco de dados (3 tabelas principais)
- 📋 Definição do NLP strategy

---

## Planned for Future Versions

### [1.1.0] - Autenticação & Validação
- [ ] JWT authentication
- [ ] Rate limiting
- [ ] Unit tests com Jest
- [ ] Input sanitization mais robusta
- [ ] localStorage para histórico

### [1.5.0] - Features Avançadas
- [ ] Integração com APIs reais (Mercado Livre, etc)
- [ ] Dashboard admin
- [ ] Sistema de notificações
- [ ] Análise de trending de preços
- [ ] Redis caching

### [2.0.0] - Major Update
- [ ] Migração para TypeScript
- [ ] Machine Learning para previsão de preços
- [ ] Integração com redes sociais
- [ ] App mobile (React Native)
- [ ] CI/CD com GitHub Actions
- [ ] Docker containerization
- [ ] Kubernetes deployment

---

## Versioning

- **Stable**: Versões X.Y.Z (ex: 1.0.0)
- **Beta**: Versões X.Y.Z-beta.N
- **Alpha**: Versões X.Y.Z-alpha.N
- **Development**: Branch `main` com commits não tagados

---

## Como Interpretar Este Arquivo

- **Added**: Novas features adicionadas
- **Changed**: Mudanças em features existentes
- **Deprecated**: Features que serão removidas em breve
- **Removed**: Features removidas
- **Fixed**: Bugs corrigidos
- **Security**: Fixes de segurança
- **Docs**: Mudanças de documentação

---

**Última atualização**: 30 de Abril de 2026  
**Versão Atual**: 1.0.0  
**Status**: ✅ Production Ready

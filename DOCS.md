# 📚 Índice de Documentação - DopIA

Guia rápido para navegar pela documentação do projeto.

## 🚀 Para Começar

**Novo no projeto?** Comece aqui:

1. [README.md](./README.md) - Visão geral completa ← **COMECE AQUI**
2. [DEVELOPMENT.md](./DEVELOPMENT.md) - Setup local
3. Clique no botão 👀💰 no canto inferior direito para testar

---

## 📖 Documentação Principal

### Guias de Uso

| Documento | Propósito | Para Quem |
|-----------|-----------|-----------|
| **[README.md](./README.md)** | Visão geral, setup, API docs | Todos |
| **[DEVELOPMENT.md](./DEVELOPMENT.md)** | Desenvolvimento local | Desenvolvedores |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Padrões, decisões técnicas | Arquitetos, Devs sênior |
| **[SECURITY.md](./SECURITY.md)** | Boas práticas de segurança | DevOps, Devs |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Deploy em produção | DevOps, DevSecOps |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | Como contribuir | Contribuidores |
| **[CHANGELOG.md](./CHANGELOG.md)** | Histórico de mudanças | Todos (para saber o que mudou) |

---

## 🎯 Documentação por Tarefa

### "Quero começar a usar"
→ [README.md](./README.md#-setup-e-instalação) (Setup)  
→ [DEVELOPMENT.md](./DEVELOPMENT.md#setup-inicial) (Instalação detalhada)  

### "Quero contribuir com código"
→ [CONTRIBUTING.md](./CONTRIBUTING.md#-como-contribuir) (Como contribuir)  
→ [DEVELOPMENT.md](./DEVELOPMENT.md#fluxo-de-desenvolvimento) (Fluxo de dev)  

### "Quero fazer deploy"
→ [DEPLOYMENT.md](./DEPLOYMENT.md) (Guia completo)  
→ [SECURITY.md](./SECURITY.md) (Verificar antes de fazer deploy)  

### "Quero entender a arquitetura"
→ [ARCHITECTURE.md](./ARCHITECTURE.md) (Padrões, design)  
→ [README.md](./README.md#-estrutura-do-projeto) (Estrutura de pastas)  

### "Encontrei um bug"
→ [DEVELOPMENT.md](./DEVELOPMENT.md#debug-de-issues) (Debugar)  
→ [.github/ISSUE_TEMPLATE/bug_report.md](./.github/ISSUE_TEMPLATE/bug_report.md) (Relatar)  

### "Tenho uma ideia para feature"
→ [.github/ISSUE_TEMPLATE/feature_request.md](./.github/ISSUE_TEMPLATE/feature_request.md)  

### "Tenho uma dúvida"
→ [README.md](./README.md#-troubleshooting) (Troubleshooting)  
→ [.github/ISSUE_TEMPLATE/question.md](./.github/ISSUE_TEMPLATE/question.md) (Fazer pergunta)  

---

## 📁 Estrutura de Documentação

```
projeto_DopIA/
├── 📄 README.md                      ← Documento principal
├── 📄 DEVELOPMENT.md                 ← Setup local & desenvolvimento
├── 📄 ARCHITECTURE.md                ← Padrões & decisões técnicas
├── 📄 SECURITY.md                    ← Segurança & boas práticas
├── 📄 DEPLOYMENT.md                  ← Deployment em produção
├── 📄 CONTRIBUTING.md                ← Como contribuir
├── 📄 CHANGELOG.md                   ← Histórico de versões
├── 📄 LICENSE                        ← MIT License
├── 📄 .gitignore                     ← Git ignore rules
│
├── .github/
│   ├── workflows/
│   │   └── 📄 ci.yml                 ← CI/CD pipeline (GitHub Actions)
│   │
│   └── ISSUE_TEMPLATE/
│       ├── 📄 bug_report.md          ← Template para reportar bugs
│       ├── 📄 feature_request.md     ← Template para features
│       └── 📄 question.md            ← Template para dúvidas
│
├── backend/                          ← API Node.js + Express
│   └── src/
│       ├── 📄 server.js
│       ├── db/
│       ├── routes/
│       ├── services/
│       ├── middleware/
│       └── utils/
│
└── frontend/                         ← App React
    └── src/
        ├── api/
        ├── components/
        ├── pages/
        └── styles/
```

---

## 🔍 Busca Rápida por Tópico

### Backend

| Tópico | Localização | Linha |
|--------|-------------|-------|
| Configuração do servidor | README.md | [Executando a Aplicação](#-executando-a-aplicação) |
| Banco de dados | README.md | [Configuração do BD](#-configuração-do-banco-de-dados) |
| APIs disponíveis | README.md | [API Documentation](#-api-documentation) |
| NLP (interpretação) | ARCHITECTURE.md | [NLP Strategy](#strategy-pattern) |
| Error handling | DEVELOPMENT.md | [Backend Setup](#backend-setup) |

### Frontend

| Tópico | Localização | Linha |
|--------|-------------|-------|
| Componentes | README.md | [Estrutura do Projeto](#-estrutura-do-projeto) |
| Chat widget | ARCHITECTURE.md | [Frontend Stack](#frontend-stack) |
| Estilos & CSS | DEVELOPMENT.md | [Estrutura de Dev](#estrutura-de-desenvolvimento) |
| Props & Types | CONTRIBUTING.md | [React/JSX](#reactjsx) |

### DevOps

| Tópico | Localização |
|--------|-------------|
| Setup local | DEVELOPMENT.md |
| Deployment | DEPLOYMENT.md |
| Segurança | SECURITY.md |
| CI/CD | .github/workflows/ci.yml |

---

## 🎓 Guias de Aprendizado

### Iniciantes
1. Ler: [README.md](./README.md) inteiro
2. Seguir: [DEVELOPMENT.md - Setup Inicial](./DEVELOPMENT.md#setup-inicial)
3. Praticar: Testar o chat localmente
4. Explorar: Olhar arquivos no backend/frontend

### Desenvolvedores Intermediários
1. Ler: [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Ler: [CONTRIBUTING.md](./CONTRIBUTING.md)
3. Praticar: Adicionar uma nova feature
4. Testar: Fazer um commit e PR

### Desenvolvadores Sênior
1. Review: [ARCHITECTURE.md](./ARCHITECTURE.md) padrões
2. Revisar: SECURITY.md práticas
3. Planejar: Roadmap em [README.md](./README.md#-próximos-passos)
4. Contribuir: Guiar team

### DevOps/Arquitetos
1. Ler: [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Ler: [SECURITY.md](./SECURITY.md)
3. Configurar: CI/CD em [.github/workflows/ci.yml](./.github/workflows/ci.yml)
4. Monitorar: Setup de alertas

---

## 💬 Convenções de Documentação

### Símbolos Usados

| Símbolo | Significado |
|---------|------------|
| ✅ | Bom, implementado |
| ❌ | Ruim, anti-pattern |
| 🔄 | Em desenvolvimento/futuro |
| ⚠️ | Atenção, importante |
| 📝 | Documentação |
| 🐛 | Bug, problema |
| 🔐 | Segurança |
| 🚀 | Deploy/production |

### Code Blocks

```bash
# Shell commands
$ npm start
```

```javascript
// Code examples
const exemplo = true;
```

```json
// JSON responses
{ "resultado": "sucesso" }
```

---

## 🔗 Links Úteis

### Interna
- [GitHub do Projeto](https://github.com/Kaua10710/DopIA)
- [Arquivo de Changelog](./CHANGELOG.md)
- [Roadmap](./README.md#-próximos-passos)

### Externa
- [Node.js Docs](https://nodejs.org/en/docs/)
- [React Docs](https://react.dev/)
- [Express Docs](https://expressjs.com/)
- [MySQL Docs](https://dev.mysql.com/doc/)

---

## 📞 Como Obter Ajuda

1. **Documentação**: Leia a seção relevante acima
2. **Buscar Issues**: [GitHub Issues](https://github.com/Kaua10710/DopIA/issues)
3. **Troubleshooting**: [README.md - Troubleshooting](#-troubleshooting)
4. **Reportar Bug**: Use [template de bug](./github/ISSUE_TEMPLATE/bug_report.md)
5. **Fazer Pergunta**: Use [template de question](./github/ISSUE_TEMPLATE/question.md)

---

## 📊 Estatísticas de Documentação

- **Documentos**: 7 arquivos principais + 3 templates
- **Linhas Totais**: ~2000+ linhas
- **Cobertura**: 95%+ (faltam apenas docs de testes em v1.1)
- **Última Atualização**: 30 de Abril de 2026

---

## ✨ Próxima Leitura

**Recomendação**: Dependendo do seu papel:

- **Se é novo**: Leia [README.md](./README.md) completo
- **Se vai contribuir**: Leia [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Se vai fazer deploy**: Leia [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Se quer entender código**: Leia [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**Última atualização**: 30 de Abril de 2026  
**Status**: ✅ Documentação completa para v1.0.0  
**Próxima atualização**: Quando v1.1 for lançada

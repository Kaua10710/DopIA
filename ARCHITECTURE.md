# 🏗️ Arquitetura do DopIA

Este documento detalha a arquitetura técnica, decisões de design e padrões utilizados no projeto.

## Índice

- [Visão Geral](#visão-geral)
- [Arquitetura em Camadas](#arquitetura-em-camadas)
- [Fluxo de Dados](#fluxo-de-dados)
- [Padrões de Design](#padrões-de-design)
- [Decisões Técnicas](#decisões-técnicas)
- [Performance](#performance)
- [Segurança](#segurança)

---

## Visão Geral

DopIA segue uma arquitetura **3-tier** (apresentação, aplicação, dados) com componentes desacoplados:

```
┌─────────────────────────────────────┐
│  Frontend (React 18.2)              │ <- Apresentação
│  - Components (JSX)                 │
│  - State Management (hooks)         │
│  - API Client (Axios)               │
└──────────────┬──────────────────────┘
               │ HTTP REST
┌──────────────▼──────────────────────┐
│  Backend (Express 4.18)             │ <- Aplicação
│  - Routes & Controllers             │
│  - Business Logic (NLP, Services)   │
│  - Middleware (auth, errors)        │
│  - Utilities (validation, logging)  │
└──────────────┬──────────────────────┘
               │ SQL
┌──────────────▼──────────────────────┐
│  Database (MySQL 8.0)               │ <- Dados
│  - produtos                         │
│  - estabelecimentos                 │
│  - precos                           │
└─────────────────────────────────────┘
```

---

## Arquitetura em Camadas

### Backend Stack

```
┌─────────────────────────────────┐
│ HTTP Requests                   │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────────┐
│ Express Middleware                  │
│ - CORS                              │
│ - JSON Parser                       │
│ - Request Logger                    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ Routes Layer (routes/)              │ <- Entry points
│ - /api/chat                         │
│ - /api/produtos                     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ Controllers (inline em routes/)     │ <- Request handling
│ - Validação de entrada              │
│ - Orquestração de services          │
│ - Formatação de respostas           │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │             │
┌───────▼────┐   ┌────▼────────┐
│ Services   │   │  Utilities  │ <- Business Logic
│ - nlp.js   │   │ - logger.js │
│ - queries  │   │ - validators│
└───────┬────┘   └────────────┘
        │
┌───────▼─────────────────────────┐
│ Database Layer (db/)            │ <- Data Access
│ - connection.js (pool)          │
│ - schema.sql                    │
└─────────────────────────────────┘
        │
        └──→ MySQL Server
```

### Frontend Stack

```
┌──────────────────────────┐
│ index.html               │
│ (Entry Point)            │
└────────────┬─────────────┘
             │
┌────────────▼──────────────────────┐
│ React Root (index.js)             │
│ ReactDOM.createRoot()             │
└────────────┬──────────────────────┘
             │
┌────────────▼──────────────────────┐
│ App.js (Root Component)           │
└────────────┬──────────────────────┘
             │
┌────────────▼──────────────────────┐
│ Pages (pages/)                    │
│ - Home.js (layout principal)      │
└────────────┬──────────────────────┘
             │
┌────────────▼──────────────────────┐
│ Components (components/)           │ <- Reusables
│ - ChatbotWidget.jsx               │
│ - ChatWindow.jsx                  │
│ - ChatMessage.jsx                 │
└────────────┬──────────────────────┘
             │
      ┌──────┴──────────┐
      │                 │
┌─────▼────┐   ┌────────▼─────────┐
│ Styles   │   │  API Layer       │
│ (CSS)    │   │ - chatApi.js     │
└──────────┘   │ - Axios instance │
               └────────┬─────────┘
                        │
                   HTTP GET/POST
                        │
                     Backend API
```

---

## Fluxo de Dados

### 1. Chat - Busca de Preço

```
┌─────────────────────────────────────────────────────────────┐
│ Frontend: Usuário digita "Qual o preço do leite?"           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼ onChange → setState(inputValue)
        ┌────────────────────────────┐
        │ ChatWindow.jsx state update │
        └────────────┬───────────────┘
                     │
                     ▼ onSendMessage()
        ┌────────────────────────────┐
        │ API Call: chatApi.sendMsg() │
        └────────────┬───────────────┘
                     │
        ┌────────────▼───────────────┐
        │ axios.post(/api/chat)      │
        │ { message: "Qual o preço..." }
        └────────────┬───────────────┘
                     │
                     ▼ HTTP POST
┌─────────────────────────────────────────────────────────────┐
│ Backend: Express receives request                           │
└────────────┬──────────────────────────────────────────────┘
             │
             ▼ Router: /api/chat (POST)
    ┌────────────────────────┐
    │ ChatController         │
    │ .processar()           │
    └────────┬───────────────┘
             │
      ┌──────┴──────────────┐
      │                     │
      ▼                     ▼
  ┌────────────┐    ┌──────────────────────┐
  │ nlp.js     │    │ validarMensagem()    │
  │ interpret  │    │ ✓ Pass validation    │
  │ Mensagem   │    └──────────────────────┘
  └────┬───────┘
       │
       ▼ interpretacao.tipo = "preco"
    ┌──────────────────────┐
    │ queries.js           │
    │ buscarPrecos()       │
    └────┬─────────────────┘
         │
         ▼ SQL Query
    ┌──────────────────────────────────────┐
    │ SELECT p.nome, e.nome, pr.preco...   │
    │ FROM precos JOIN produtos...         │
    │ WHERE p.nome LIKE '%leite%'          │
    └────┬──────────────────────────────────┘
         │
         ▼ MySQL Connection Pool
    ┌──────────────────────┐
    │ Database Execution   │
    │ Returns 3 results    │
    └────┬─────────────────┘
         │
         ▼ formatarRespostaBusca()
    ┌──────────────────────────────┐
    │ "💰 Encontrei 3 opções..."   │
    └────┬─────────────────────────┘
         │
         ▼ res.json({ mensagem, tipo, confianca, ... })
        ┌────────────────────────┐
        │ HTTP 200 OK + JSON     │
        └────────┬───────────────┘
                 │
                 ▼ HTTP Response
┌─────────────────────────────────────────────────────────────┐
│ Frontend: Receive response                                  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼ ChatWindow.jsx
            setMessages([...botMessage])
            setIsLoading(false)
                 │
                 ▼ Re-render ChatMessage
    ┌────────────────────────────────────┐
    │ Display bot response with emojis   │
    │ Show confidence & result count     │
    └────────────────────────────────────┘
```

---

## Padrões de Design

### 1. **MVC (Model-View-Controller)**

```javascript
// Model (queries.js)
const buscarPrecos = async (produto) => {
  const query = `SELECT * FROM precos WHERE...`;
  return pool.query(query);
};

// View (ChatMessage.jsx)
<div className="message-content">
  {props.mensagem}
</div>

// Controller (chat.js routes)
ChatController.processar = async (req, res) => {
  const dados = await buscarPrecos(req.body.message);
  res.json(formatarResposta(dados));
};
```

### 2. **Singleton Pattern**

```javascript
// db/connection.js
const pool = mysql.createPool({
  // Única instância compartilhada
});

module.exports = pool; // Exported uma única vez
```

### 3. **Factory Pattern**

```javascript
// api/chatApi.js
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

// Factory de cliente HTTP
export default axiosInstance;
```

### 4. **Observer Pattern**

```javascript
// React Hooks
const [messages, setMessages] = useState([]);
// setMessages triggers re-render → observa changes

useEffect(() => {
  scrollToBottom(); // Observer: messages changed → scroll
}, [messages]);
```

### 5. **Strategy Pattern**

```javascript
// nlp.js - estratégias diferentes por tipo de query
const estrategias = {
  preco: () => buscarPrecos(),
  localizacao: () => buscarEstabelecimentos(),
  comparacao: () => compararPrecos()
};

// Usar estratégia conforme interpretação
estrategias[interpretacao.tipo]();
```

---

## Decisões Técnicas

### 1. **Por que Express.js?**
- ✅ Simples e leve
- ✅ Middleware ecosystem robusto
- ✅ Comunidade grande
- ❌ Não type-safe (migrarar TypeScript em v2)

### 2. **Por que MySQL (não NoSQL)?**
- ✅ Dados estruturados (preços, produtos)
- ✅ Relacionamentos claros (preço ↔ produto ↔ loja)
- ✅ Queries complexas otimizadas
- ✅ ACID transactions

### 3. **Por que NLP simples (não LLM)?**
- ✅ MVP rápido
- ✅ Sem custos de API
- ✅ Controle total
- ✅ Low latency (~50ms)
- 🔄 Upgrade para OpenAI/Hugging Face em v2

### 4. **Por que Axios (não Fetch API)?**
- ✅ Interceptors para handling global
- ✅ Timeout automático
- ✅ Request/response transformation
- ✅ CancelToken para abort requests

### 5. **Por que PropTypes (não TypeScript)?**
- ✅ Setup rápido sem compilação
- ✅ Zero overhead em produção
- ✅ Feedback em development
- 🔄 Migração TypeScript planejada

---

## Performance

### Backend Otimizações

| Otimização | Implementação |
|-----------|--------------|
| **Connection Pooling** | mysql2 `connectionLimit: 10` |
| **Database Indexes** | Índices em nome, cidade, produto_id |
| **Query Optimization** | LIMIT 100, prepared statements |
| **Caching** | Redis (planeado v1.5) |
| **Compression** | gzip middleware (opcional) |
| **Load Balancing** | PM2 cluster mode (futuro) |

### Frontend Otimizações

| Otimização | Implementação |
|-----------|--------------|
| **Code Splitting** | React.lazy + Suspense (futuro) |
| **Memoization** | useCallback para handlers |
| **Virtual Lists** | React-window para mensagens (futuro) |
| **Image Optimization** | Placeholder imgs, lazy load |
| **Bundle Size** | Tree-shaking, minification |
| **Caching** | localStorage para histórico |

### Benchmark (Esperado)

```
Métrica                  | Target | Status
─────────────────────────┼────────┼────────
Chat Response Time       | <500ms | ✅ ~300ms
Database Query Time      | <200ms | ✅ ~100ms
Frontend Render         | <100ms | ✅ ~50ms
Bundle Size Frontend    | <200kb | ✅ ~150kb
Memory Backend          | <100mb | ✅ ~50mb
```

---

## Segurança

### Backend

| Medida | Implementação |
|-------|---------------|
| **SQL Injection** | Prepared statements (mysql2) |
| **CORS** | Whitelist de origens permitidas |
| **Input Validation** | validators.js - sanitização |
| **Rate Limiting** | express-rate-limit (futuro) |
| **Error Messages** | Genéricas em produção |
| **HTTPS** | SSL/TLS em deployment |
| **Environment Vars** | .env não versionado |

### Frontend

| Medida | Implementação |
|-------|---------------|
| **XSS Protection** | React escapa HTML por padrão |
| **CSRF Tokens** | Implementar se necessário |
| **Secure Headers** | Helmet middleware (backend) |
| **API URL** | Via .env (não hardcoded) |
| **Sensitive Data** | Não armazenar em localStorage |

### Exemplo de Request Seguro

```javascript
// ✅ BOM: Prepared statement
const query = "SELECT * FROM produtos WHERE nome LIKE ?";
const [results] = await pool.query(query, [`%${userInput}%`]);

// ❌ RUIM: SQL Injection risk
const query = `SELECT * FROM produtos WHERE nome LIKE '%${userInput}%'`;
```

---

## Escalabilidade

### Curto Prazo (v1.0)
- ✅ Single server backend
- ✅ MySQL local com backups

### Médio Prazo (v1.5)
- 🔄 Load balancer (nginx)
- 🔄 Redis para cache
- 🔄 Database replication

### Longo Prazo (v2.0)
- 🔄 Kubernetes deployment
- 🔄 Microserviços (NLP separado)
- 🔄 Elasticsearch para busca
- 🔄 CDN para static assets

---

## Stack de Desenvolvimento

```json
{
  "backend": {
    "node": "14+",
    "express": "4.18",
    "mysql2": "3.6",
    "nodemon": "3.0"
  },
  "frontend": {
    "react": "18.2",
    "axios": "1.6",
    "react-scripts": "5.0"
  },
  "devOps": {
    "git": "latest",
    "docker": "opcional (futuro)",
    "github-actions": "CI/CD (futuro)"
  }
}
```

---

**Última atualização**: 30 de Abril de 2026  
**Versão da Arquitetura**: 1.0.0

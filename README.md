# 👀💰 DopIA - De Olho no Preço

> **Chatbot inteligente para comparação de preços de produtos em estabelecimentos**

Aplicação web full-stack com chatbot conversacional que permite aos usuários buscar preços, localizar estabelecimentos e comparar valores de produtos em tempo real.

---

## 📋 Sumário

- [Overview](#-overview)
- [Stack Tecnológico](#-stack-tecnológico)
- [Features](#-features)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Setup e Instalação](#-setup-e-instalação)
- [Configuração do Banco de Dados](#-configuração-do-banco-de-dados)
- [Executando a Aplicação](#-executando-a-aplicação)
- [API Documentation](#-api-documentation)
- [Arquitetura](#-arquitetura)
- [Melhorias Implementadas](#-melhorias-implementadas)
- [Padrões de Código](#-padrões-de-código)
- [Troubleshooting](#-troubleshooting)
- [Próximos Passos](#-próximos-passos)

---

## 🎯 Overview

**DopIA** é uma solução web que oferece um chatbot conversacional integrado para ajudar usuários a:

- 💰 **Buscar preços** de produtos em diferentes estabelecimentos
- 📍 **Localizar estabelecimentos** que vendem específicos produtos
- 📊 **Comparar preços** entre lojas e encontrar as melhores ofertas
- 🎁 **Receber recomendações** baseadas em disponibilidade e preço

### 🎨 Design & Branding

- **Cores Principais**: #1E2A38 (azul escuro) + #FFFFFF (branco)
- **Cores Acentos**: #00a86b (verde)
- **Tipografia**: Poppins (400, 600, 700 weights)
- **Ícone**: Eye + Dollar Symbol (criativo, referenciando "olho no preço")
- **Responsividade**: Mobile-first design

---

## 🛠 Stack Tecnológico

### **Backend**
- **Runtime**: Node.js v14+
- **Framework**: Express.js 4.18+
- **Database**: MySQL 8.0+
- **Driver**: mysql2/promise (connection pooling)
- **Utilities**:
  - `dotenv`: Gerenciamento de variáveis de ambiente
  - `cors`: Cross-Origin Resource Sharing

### **Frontend**
- **Framework**: React 18.2+
- **HTTP Client**: Axios 1.6+
- **Build Tool**: create-react-app (react-scripts 5.0+)
- **Fonts**: Google Fonts (Poppins)
- **Type Checking**: PropTypes

### **DevTools**
- **Backend**: nodemon (development hot-reload)
- **Version Control**: Git
- **Package Manager**: npm

---

## ✨ Features

### ✅ Implementadas (v1.0)

- **Chat Widget Flutuante**: Botão flutuante no canto inferior direito com ícone criativo
- **Busca de Preços**: Interpreta mensagens e busca preços de produtos
- **Localização de Estabelecimentos**: Encontra lojas que vendem produtos específicos
- **Comparação de Preços**: Compara valores entre diferentes estabelecimentos
- **Interface Responsiva**: Desktop, tablet e mobile-friendly
- **NLP Simples**: Interpretação de intenção do usuário com keywords
- **Error Handling**: Tratamento robusto de erros global
- **Logging Estruturado**: Logs com timestamps para debugging
- **Database Schema**: Tabelas otimizadas com índices
- **TypeScript-ready**: Pronto para migração para TypeScript

### 🔄 Em Desenvolvimento

- [ ] Autenticação de usuários
- [ ] Histórico de conversas persistente
- [ ] Filtros por cidade/região
- [ ] Integração com APIs reais de preços
- [ ] Dashboard admin para gerenciar dados
- [ ] Análise de trending de preços
- [ ] Notificações de preços baixos
- [ ] Integração com redes sociais

---

## 📁 Estrutura do Projeto

```
projeto_DopIA/
├── 📄 README.md                          # Este arquivo
├── 📄 .gitignore                         # Git ignore rules
│
├── backend/                              # ⚙️ API Node.js + Express
│   ├── 📄 package.json                   # Dependências do backend
│   ├── 📄 .env                           # Variáveis de ambiente
│   ├── 📄 .gitignore                     # Ignora node_modules, .env
│   │
│   └── src/
│       ├── 📄 server.js                  # ⭐ Configuração do servidor (PORT, CORS, middleware)
│       │                                 #    - Graceful shutdown
│       │                                 #    - Health check endpoint
│       │                                 #    - Global error handler
│       │
│       ├── db/
│       │   ├── 📄 connection.js          # ⭐ Pool de conexões MySQL
│       │   │                             #    - Gerenciamento de conexões
│       │   │                             #    - Configuração de timeout
│       │   │
│       │   └── 📄 schema.sql             # ⭐ Schema do banco de dados
│       │                                 #    - Tabela produtos
│       │                                 #    - Tabela estabelecimentos
│       │                                 #    - Tabela preços
│       │                                 #    - Índices para performance
│       │
│       ├── routes/
│       │   ├── 📄 chat.js                # ⭐ POST /api/chat (chatbot logic)
│       │   │                             #    - Controller pattern
│       │   │                             #    - Formatação de respostas
│       │   │                             #    - Validação de entrada
│       │   │
│       │   └── 📄 produtos.js            # GET /api/produtos, /estabelecimentos
│       │                                 #    - Listagem com filtros
│       │                                 #    - Paginação
│       │
│       ├── services/
│       │   ├── 📄 nlp.js                 # 🧠 NLP simples
│       │   │                             #    - Interpretação de mensagens
│       │   │                             #    - Sistema de keywords
│       │   │                             #    - Extração de entidades
│       │   │                             #    - Cálculo de confiança
│       │   │
│       │   └── 📄 queries.js             # 📊 Queries ao banco de dados
│       │                                 #    - buscarPrecos()
│       │                                 #    - buscarPorEstabelecimento()
│       │                                 #    - buscarMelhorPreco()
│       │                                 #    - obterEstatisticasPreco()
│       │
│       ├── middleware/
│       │   └── 📄 errorHandler.js        # 🚨 Middleware global de erros
│       │                                 #    - Tratamento centralizado
│       │                                 #    - Logging de erros
│       │
│       └── utils/
│           ├── 📄 logger.js              # 📝 Logging estruturado
│           │                             #    - Timestamps
│           │                             #    - Níveis (info, warn, error)
│           │                             #    - Request/response logging
│           │
│           └── 📄 validators.js          # ✅ Validadores reutilizáveis
│                                         #    - validarMensagem()
│                                         #    - validarPaginacao()
│
├── frontend/                             # 🎨 App React
│   ├── 📄 package.json                   # Dependências do frontend
│   ├── 📄 .env                           # REACT_APP_API_URL
│   ├── 📄 .gitignore                     # Ignora node_modules, build
│   │
│   ├── public/
│   │   └── 📄 index.html                 # HTML entry point
│   │                                     #    - Meta tags
│   │                                     #    - Google Fonts
│   │
│   └── src/
│       ├── 📄 index.js                   # React render entry point
│       ├── 📄 App.js                     # Root component
│       ├── 📄 App.css                    # Global styles
│       │
│       ├── api/
│       │   └── 📄 chatApi.js             # 🌐 Cliente HTTP (Axios)
│       │                                 #    - Axios instance com interceptors
│       │                                 #    - sendMessage()
│       │                                 #    - getProdutos()
│       │                                 #    - getEstabelecimentos()
│       │
│       ├── components/
│       │   ├── 📄 ChatbotWidget.jsx      # 🤖 Botão flutuante do chatbot
│       │   │                             #    - Toggle chat open/close
│       │   │                             #    - Ícone eye+dollar SVG
│       │   │                             #    - Suporta múltiplas posições
│       │   │
│       │   ├── 📄 ChatWindow.jsx         # 💬 Janela de chat principal
│       │   │                             #    - Histórico de mensagens
│       │   │                             #    - Input e send button
│       │   │                             #    - Loading indicator
│       │   │                             #    - Error handling
│       │   │
│       │   └── 📄 ChatMessage.jsx        # 💭 Componente individual de mensagem
│       │                                 #    - Diferencia user/bot
│       │                                 #    - Exibe metadata
│       │                                 #    - PropTypes
│       │
│       ├── pages/
│       │   └── 📄 Home.js                # 🏠 Página inicial
│       │                                 #    - Header com logo
│       │                                 #    - Banner com CTA
│       │                                 #    - Seções de ofertas
│       │                                 #    - Integração do widget
│       │
│       └── styles/
│           ├── 📄 home.css               # 🎨 Estilos página inicial
│           │                             #    - Header, banner, footer
│           │                             #    - Grid de ofertas
│           │                             #    - Responsive design
│           │
│           └── 📄 chatbot.css            # 🎨 Estilos do chatbot
│                                         #    - CSS variables
│                                         #    - Animações suaves
│                                         #    - Backdrop filter
│                                         #    - Mobile-first
```

---

## 🚀 Setup e Instalação

### Pré-requisitos

- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** v6+ (vem com Node.js)
- **MySQL** v8.0+ ([Download](https://dev.mysql.com/downloads/mysql/))
- **Git** ([Download](https://git-scm.com/))

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/Kaua10710/DopIA.git
cd DopIA
```

### 2️⃣ Configurar Backend

```bash
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
echo "PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=doppia_db
NODE_ENV=development" > .env

# ⚠️ Editar .env com suas credenciais do MySQL
```

### 3️⃣ Configurar Frontend

```bash
cd ../frontend

# Instalar dependências
npm install

# Criar arquivo .env
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

---

## 💾 Configuração do Banco de Dados

### Criar Database e Tabelas

```bash
# Opção 1: Via terminal MySQL
mysql -u root -p < backend/src/db/schema.sql

# Opção 2: Via MySQL Workbench
# 1. Abrir MySQL Workbench
# 2. Conexão com root
# 3. Abrir arquivo: backend/src/db/schema.sql
# 4. Clicar "Execute"
```

### Estrutura das Tabelas

**Tabela: `produtos`**
```sql
id (INT) - PK, auto-increment
nome (VARCHAR 255) - UNIQUE
categoria (VARCHAR 100)
descricao (TEXT)
criado_em (TIMESTAMP)
```

**Tabela: `estabelecimentos`**
```sql
id (INT) - PK, auto-increment
nome (VARCHAR 255)
endereco (VARCHAR 500)
cidade (VARCHAR 100)
latitude (FLOAT)
longitude (FLOAT)
telefone (VARCHAR 20)
horario_funcionamento (VARCHAR 100)
criado_em (TIMESTAMP)
```

**Tabela: `precos`**
```sql
id (INT) - PK, auto-increment
produto_id (INT) - FK → produtos.id
estabelecimento_id (INT) - FK → estabelecimentos.id
preco (DECIMAL 10,2)
data_atualizacao (TIMESTAMP)
UNIQUE(produto_id, estabelecimento_id)
```

### Popular com Dados de Exemplo

```sql
-- Inserir produtos
INSERT INTO produtos (nome, categoria) VALUES
('Leite Integral', 'Laticínios'),
('Pão Francês', 'Padaria'),
('Arroz 5kg', 'Secos'),
('Feijão Carioca', 'Secos');

-- Inserir estabelecimentos
INSERT INTO estabelecimentos (nome, endereco, cidade, telefone) VALUES
('Mercado A', 'Rua Principal, 100', 'São Paulo', '1133334444'),
('Supermercado B', 'Avenida Paulista, 200', 'São Paulo', '1144445555'),
('Mercado C', 'Rua Secundária, 300', 'São Paulo', '1155556666');

-- Inserir preços
INSERT INTO precos (produto_id, estabelecimento_id, preco) VALUES
(1, 1, 3.50),
(1, 2, 3.20),
(1, 3, 3.80),
(2, 1, 0.80),
(2, 2, 0.75);
```

---

## ▶️ Executando a Aplicação

### Terminal 1: Backend

```bash
cd backend
npm start
# ou
npm run dev  # com nodemon para auto-reload

# Esperado:
# 🚀 Servidor rodando em http://localhost:5000
# 📊 Ambiente: development
```

### Terminal 2: Frontend

```bash
cd frontend
npm start

# Esperado:
# Automatically opens http://localhost:3000
# Na página, clique no botão 👀💰 no canto inferior direito
```

### ✅ Verificar Saúde

```bash
# Health check do backend
curl http://localhost:5000/health

# Esperado:
# {
#   "status": "Backend running! ✅",
#   "timestamp": "2024-04-30T10:00:00.000Z",
#   "uptime": 42.5
# }
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. **Chat - Processar Mensagem**

```http
POST /api/chat
Content-Type: application/json

{
  "message": "Qual o preço do leite?"
}
```

**Response Success (200):**
```json
{
  "mensagem": "💰 Encontrei 3 opção(ões) de \"leite\":\n\n📍 Mercado A\n💵 R$ 3.50\n📬 Rua Principal, 100\n\n...",
  "tipo": "preco",
  "confianca": 0.9,
  "produtos_encontrados": 3
}
```

**Response Error (400):**
```json
{
  "error": "Mensagem não pode estar vazia"
}
```

#### 2. **Produtos - Listar**

```http
GET /api/produtos?nome=leite&categoria=Laticínios
```

**Response (200):**
```json
[
  {
    "id": 1,
    "nome": "Leite Integral",
    "categoria": "Laticínios",
    "descricao": "Leite fresco",
    "criado_em": "2024-04-30T10:00:00Z"
  }
]
```

#### 3. **Estabelecimentos - Listar**

```http
GET /api/produtos/estabelecimentos?cidade=São Paulo
```

**Response (200):**
```json
[
  {
    "id": 1,
    "nome": "Mercado A",
    "endereco": "Rua Principal, 100",
    "cidade": "São Paulo",
    "telefone": "1133334444"
  }
]
```

---

## 🏗️ Arquitetura

### Fluxo de Dados

```
[Frontend: React]
        ↓
[HTTP: Axios POST /api/chat]
        ↓
[Backend: Express Router]
        ↓
[Controllers: chatRoutes.js]
        ↓
[Services: NLP + Queries]
        ├─→ [nlp.js] Interpretar intenção
        └─→ [queries.js] Buscar DB
        ↓
[MySQL: Pool Connection]
        ↓
[Response JSON]
        ↓
[Frontend: Renderiza no Chat]
```

### Design Patterns

| Pattern | Uso |
|---------|-----|
| **MVC** | Separação clara: routes (V), services (M), controllers (C) |
| **Dependency Injection** | Imports de services/utilities |
| **Singleton** | Pool de conexões MySQL |
| **Observer** | React hooks (useState, useCallback) |
| **Factory** | axios instance |
| **Strategy** | NLP com diferentes tipos de query |

---

## 🔧 Melhorias Implementadas

### Backend

| Aspecto | Melhoria |
|--------|---------|
| **Error Handling** | Middleware global + try-catch estruturado |
| **Logging** | Logger com timestamps e níveis (info, warn, error) |
| **Validation** | Validadores reutilizáveis para entrada |
| **Security** | CORS configurado, prepared statements (mysql2) |
| **Performance** | Connection pooling, índices no BD, limit em queries |
| **Code Quality** | JSDoc comments, controller pattern, separação de responsabilidades |
| **Graceful Shutdown** | SIGTERM handler para encerramento limpo |

### Frontend

| Aspecto | Melhoria |
|--------|---------|
| **Performance** | useCallback para otimizar re-renders |
| **Accessibility** | ARIA labels, semantic HTML |
| **Error Handling** | Tratamento específico de erros com feedback visual |
| **Type Safety** | PropTypes em todos componentes |
| **CSS** | Variables, transitions, backdrop-filter |
| **Responsiveness** | Mobile-first, breakpoints em 480px e 768px |
| **UX** | Metadata de confiança, indicador de typing |

---

## 💻 Padrões de Código

### Backend - Estrutura de Rota

```javascript
// ✅ BOM: Controller pattern
const MyController = {
  processar: async (req, res, next) => {
    try {
      // Validar
      const erro = validarEntrada(req.body);
      if (erro) return res.status(400).json({ error: erro });
      
      // Processar
      const resultado = await serviceLayer.fazer();
      
      // Responder
      res.json(resultado);
    } catch (error) {
      next(error); // Passa para error handler
    }
  }
};

router.post('/', MyController.processar);
```

### Frontend - Componente com Hooks

```javascript
// ✅ BOM: useCallback para performance
const MyComponent = ({ onClose }) => {
  const [state, setState] = useState(null);
  
  const handleAction = useCallback(async () => {
    try {
      const data = await api.fetch();
      setState(data);
    } catch (error) {
      console.error(error);
    }
  }, []); // Dependências vazias
  
  return <button onClick={handleAction}>Ação</button>;
};

MyComponent.propTypes = { onClose: PropTypes.func.isRequired };
```

---

## 🆘 Troubleshooting

### ❌ "Cannot connect to MySQL"

```bash
# Verificar se MySQL está rodando
mysql -u root -p -e "SELECT 1"

# Windows: Iniciar serviço MySQL
net start MySQL80

# macOS: Via Homebrew
brew services start mysql@8.0
```

### ❌ "Port 5000 already in use"

```bash
# Windows: Matar processo na porta
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

### ❌ "CORS error"

**Verificar .env do backend:**
```bash
CLIENT_URL=http://localhost:3000
```

**Ou editar server.js:**
```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

### ❌ "API returns 404"

```bash
# Verificar se backend está rodando
curl http://localhost:5000/health

# Verificar URL no frontend .env
REACT_APP_API_URL=http://localhost:5000/api
```

### ❌ "React: 'prop' is not defined"

Adicionar PropTypes ao componente:
```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  prop: PropTypes.string.isRequired
};
```

---

## 📈 Próximos Passos

### Curto Prazo (v1.1)
- [ ] Adicionar autenticação JWT
- [ ] Implementar rate limiting
- [ ] Adicionar testes unitários (Jest)
- [ ] Melhorar NLP com regex mais robustos
- [ ] Persistência de histórico de chat (localStorage)

### Médio Prazo (v1.5)
- [ ] Integração com APIs reais de preços (Mercado Livre, etc.)
- [ ] Dashboard admin para gerenciar produtos/preços
- [ ] Sistema de notificações por email
- [ ] Análise de trending de preços
- [ ] Export de dados em CSV/Excel

### Longo Prazo (v2.0)
- [ ] Migração para TypeScript
- [ ] Machine Learning para previsão de preços
- [ ] Integração com redes sociais (compartilhar ofertas)
- [ ] App mobile (React Native)
- [ ] CI/CD com GitHub Actions
- [ ] Deployment em produção (AWS/Heroku)

---

## 📝 Commits e Histórico

```bash
# Iniciar rastreamento de versão
git add .
git commit -m "feat: initial chatbot implementation with NLP"

# Push para repositório
git push origin main
```

---

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

**Kaua10710** - Desenvolvedor Full-Stack

- GitHub: [@Kaua10710](https://github.com/Kaua10710)
- Repositório: [DopIA](https://github.com/Kaua10710/DopIA)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou problemas:

- 📧 Abra uma issue no GitHub
- 💬 Verifique o seção [Troubleshooting](#troubleshooting)
- 📖 Consulte a [API Documentation](#-api-documentation)


---

**Última atualização**: 30 de Abril de 2026  
**Versão**: 1.0.0  
**Status**: ✅ Production Ready

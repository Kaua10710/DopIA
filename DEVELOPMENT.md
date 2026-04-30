# 🔧 Guia de Desenvolvimento - DopIA

Instruções para configurar o ambiente de desenvolvimento local.

## Pré-requisitos

- **Node.js**: v14+ ([Download](https://nodejs.org/))
- **npm**: v6+ (vem com Node.js)
- **MySQL**: v8.0+ ([Download](https://dev.mysql.com/downloads/mysql/))
- **Git**: ([Download](https://git-scm.com/))
- **VSCode** (recomendado): ([Download](https://code.visualstudio.com/))

## Setup Inicial

### 1. Clonar e Navegar

```bash
git clone https://github.com/Kaua10710/DopIA.git
cd DopIA
```

### 2. Verificar Node.js e npm

```bash
node --version  # Deve ser v14+
npm --version   # Deve ser v6+
```

### 3. Instalar MySQL

**Windows:**
```bash
# Baixe o installer em https://dev.mysql.com/downloads/mysql/
# Execute o .msi e siga as instruções
# Verifique se está rodando:
mysql --version
```

**macOS (com Homebrew):**
```bash
brew install mysql@8.0
brew services start mysql@8.0
mysql --version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mysql-server
sudo service mysql start
mysql --version
```

## Backend Setup

### 1. Navegue para Backend

```bash
cd backend
```

### 2. Instale as Dependências

```bash
npm install
```

Isso irá instalar:
- `express` - Framework web
- `mysql2` - Driver MySQL
- `dotenv` - Gerenciador de env vars
- `cors` - CORS middleware
- `nodemon` - Hot-reload (dev)

### 3. Crie o Arquivo .env

```bash
# Windows
echo PORT=5000 > .env
echo DB_HOST=localhost >> .env
echo DB_USER=root >> .env
echo DB_PASSWORD=sua_senha_aqui >> .env
echo DB_NAME=doppia_db >> .env
echo NODE_ENV=development >> .env

# macOS/Linux
cat > .env << EOF
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=doppia_db
NODE_ENV=development
EOF
```

⚠️ **Edite o .env com suas credenciais do MySQL**

### 4. Configure o Banco de Dados

```bash
# Acesse o MySQL
mysql -u root -p

# Digite sua senha, depois execute:
CREATE DATABASE doppia_db;
EXIT;

# Execute o schema
mysql -u root -p doppia_db < src/db/schema.sql
```

### 5. Inicie o Backend

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Ou modo produção
npm start
```

Esperado:
```
🚀 Servidor rodando em http://localhost:5000
📊 Ambiente: development
```

### 6. Teste o Backend

```bash
# Em outro terminal
curl http://localhost:5000/health

# Esperado:
# {"status":"Backend running! ✅","timestamp":"...","uptime":...}
```

## Frontend Setup

### 1. Em novo terminal, navegue para Frontend

```bash
cd frontend
```

### 2. Instale as Dependências

```bash
npm install
```

Isso irá instalar:
- `react` - Framework UI
- `axios` - HTTP client
- `react-scripts` - Build tools

### 3. Crie o Arquivo .env

```bash
# Windows
echo REACT_APP_API_URL=http://localhost:5000/api > .env

# macOS/Linux
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 4. Inicie o Frontend

```bash
npm start
```

Esperado:
```
Compiled successfully!
You can now view doppia in the browser at http://localhost:3000
```

### 5. Teste o Frontend

- Abra http://localhost:3000
- Clique no botão 👀💰 no canto inferior direito
- Digite: "Qual o preço do leite?"
- Você deve ver a resposta do chatbot

## Estrutura de Desenvolvimento

### Árvore de Arquivos para Editar

```
backend/
├── src/
│   ├── server.js              ← Configurações gerais
│   ├── routes/
│   │   ├── chat.js            ← Lógica do chatbot
│   │   └── produtos.js        ← APIs de produtos
│   ├── services/
│   │   ├── nlp.js             ← Inteligência (keywords)
│   │   └── queries.js         ← Banco de dados
│   ├── db/
│   │   ├── connection.js      ← Pool MySQL
│   │   └── schema.sql         ← Estrutura BD
│   ├── utils/
│   │   ├── logger.js          ← Logs
│   │   └── validators.js      ← Validação
│   └── middleware/
│       └── errorHandler.js    ← Erros global

frontend/
├── src/
│   ├── api/
│   │   └── chatApi.js         ← Cliente HTTP
│   ├── components/
│   │   ├── ChatbotWidget.jsx  ← Botão flutuante
│   │   ├── ChatWindow.jsx     ← Janela de chat
│   │   └── ChatMessage.jsx    ← Mensagem individual
│   ├── pages/
│   │   └── Home.js            ← Página inicial
│   ├── styles/
│   │   ├── home.css           ← Estilos Home
│   │   └── chatbot.css        ← Estilos Chat
│   └── App.js                 ← Root component
```

## Fluxo de Desenvolvimento

### Adicionar Nova Feature

#### 1. Backend (NLP/Queries)

Edite `backend/src/services/nlp.js`:
```javascript
// Adicione novo tipo de intenção
const tipos = {
  preco: 'buscar preço',
  promocoes: 'buscar promoções'  // ← Novo tipo
};

const keywords = {
  promocoes: ['promoção', 'desconto', 'oferta', 'black friday']  // ← Keywords
};
```

Edite `backend/src/services/queries.js`:
```javascript
// Adicione nova função de query
const buscarPromocoes = async (cidade) => {
  const [results] = await pool.query(
    `SELECT * FROM precos WHERE ...`
  );
  return results;
};

module.exports = {
  // ... outras funções
  buscarPromocoes  // ← Exporte
};
```

#### 2. Backend (Routes)

Edite `backend/src/routes/chat.js`:
```javascript
// Adicione caso na interpretação
case 'promocoes':
  const promocoes = await buscarPromocoes();
  return formatarRespostaPromocoes(promocoes);
```

#### 3. Frontend (UI)

Edite `frontend/src/components/ChatMessage.jsx`:
```javascript
// Se precisar de nova formatação especial
const renderMetadata = (metadata) => {
  if (metadata.tipo === 'promocoes') {
    return <span className="promo-badge">💰</span>;
  }
};
```

#### 4. Teste Localmente

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start

# Terminal 3: Teste manual
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Quais promoções têm hoje?"}'
```

### Debug de Issues

#### Backend

**Verificar Logs:**
```bash
# Logs devem aparecer no console
# Formato: [LEVEL] timestamp - mensagem

# Exemplo de erro
[ERROR] 2026-04-30T10:30:45.123Z - Failed to connect to database: ECONNREFUSED

# Solução: Verificar se MySQL está rodando
```

**Debugar com Node Inspector:**
```bash
# Terminal
node --inspect src/server.js

# VSCode: Run → Open Configurations → Node
# Coloque breakpoint e F5
```

#### Frontend

**Verificar Console:**
```bash
# Abra DevTools (F12)
# Veja aba Console para erros

# Common errors:
# - "Cannot POST /api/chat" → Backend não está rodando
# - "CORS error" → Verificar CORS no backend
# - "404 on GET" → Verificar URL em .env
```

**React DevTools Extension:**
```bash
# Instale em Chrome
# https://chrome.google.com/webstore/detail/react-developer-tools/
# Permite inspecionar components e hooks
```

## Boas Práticas

### Commits

```bash
# ✅ BOM: Mensagem descritiva
git add .
git commit -m "feat(nlp): adicionar suporte a busca de promoções"

# ✅ BOM: Pequenos commits frequentes
git add src/services/nlp.js
git commit -m "feat(nlp): adicionar keywords de promoções"
git add src/routes/chat.js
git commit -m "feat(routes): integrar busca de promoções no chat"

# ❌ RUIM: Mensagens genéricas
git commit -m "alterações"
git commit -m "fix"
```

### Code Review Pessoal

Antes de fazer commit:
```javascript
// ✅ Existe comentário explicando lógica complexa?
// ✅ Variáveis têm nomes descritivos?
// ✅ Sem console.log() deixado por acidente?
// ✅ Erros são tratados com try-catch?
// ✅ Não tem hardcoded values (.env é usado)?
```

## Troubleshooting

### "npm install" lento

```bash
# Use npm cache clean
npm cache clean --force
npm install
```

### Porta 5000 já está em uso

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### MySQL "Access denied"

```bash
# Resetar senha
mysql -u root
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'nova_senha';
mysql> FLUSH PRIVILEGES;
```

### Frontend não conecta no Backend

```bash
# Verifique .env
cat frontend/.env
# Deve ter: REACT_APP_API_URL=http://localhost:5000/api

# Verifique se Backend está rodando
curl http://localhost:5000/health
# Se erro: iniciar backend em outro terminal
```

## Próximos Recursos

- [README.md](./README.md) - Instruções completas
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Padrões técnicos
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guia de contribuição
- [API Documentation](./README.md#-api-documentation) - Endpoints

---

**Última atualização**: 30 de Abril de 2026  
**Versão**: 1.0.0

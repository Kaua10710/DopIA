# ⚡ Quick Start - DopIA

Comece em **3 minutos**!

---

## 1️⃣ Instale Dependências

```bash
# Backend
cd backend
npm install

# Frontend (em outro terminal/pasta)
cd frontend
npm install
```

---

## 2️⃣ Configure Banco de Dados

```bash
# Backend
cd backend

# Crie arquivo .env
cat > .env << EOF
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=doppia_db
NODE_ENV=development
EOF

# Configure MySQL
mysql -u root -p
# Digite sua senha, depois:
CREATE DATABASE doppia_db;
EXIT;

# Execute schema
mysql -u root -p doppia_db < src/db/schema.sql
```

---

## 3️⃣ Inicie a Aplicação

**Terminal 1: Backend**
```bash
cd backend
npm run dev
# Esperado: 🚀 Servidor rodando em http://localhost:5000
```

**Terminal 2: Frontend**
```bash
cd frontend
npm start
# Esperado: Abre http://localhost:3000 automaticamente
```

---

## 4️⃣ Teste o Chat

1. Na página, clique no botão 👀💰 (canto inferior direito)
2. Digite: `"Qual o preço do leite?"`
3. Veja a resposta do chatbot! 💬

---

## 📚 Próximos Passos

### Para Desenvolvedores
```bash
# Ler documentação
cat DEVELOPMENT.md

# Explorar código
code backend/src/server.js
code frontend/src/components/ChatbotWidget.jsx
```

### Para Contribuidores
```bash
# Ler guia de contribuição
cat CONTRIBUTING.md

# Criar branch para nova feature
git checkout -b feature/sua-feature
```

### Para Deployment
```bash
# Ler guia de deploy
cat DEPLOYMENT.md

# Ou documentação completa
cat README.md
```

---

## 🆘 Problemas?

### "Cannot connect to MySQL"
```bash
# Verificar se MySQL está rodando
mysql -u root -p -e "SELECT 1"

# Windows: Iniciar serviço
net start MySQL80
```

### "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### "API not responding"
```bash
# Verificar health
curl http://localhost:5000/health

# Verificar logs do backend
# Veja o terminal onde npm run dev está rodando
```

---

## 📖 Documentação Completa

- **[README.md](./README.md)** - Visão geral completa
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Setup detalhado
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Como funciona
- **[DOCS.md](./DOCS.md)** - Índice de docs

---

## 🚀 Deploy

```bash
# Local production
npm run build  # Frontend
npm start      # Backend

# Para servidor
cat DEPLOYMENT.md
```

---

## 💡 Dicas

- 📝 Salve suas mudanças em .env em local seguro
- 🔄 Use `git add . && git commit -m "seu-commit"` para versionar
- 📊 Verifique logs em tempo real: `pm2 logs` (com PM2)
- 🧪 Teste endpoints com Postman ou curl

---

**Pronto!** 🎉

Agora você tem DopIA rodando localmente. 

Próximo passo: Leia [README.md](./README.md) ou [DEVELOPMENT.md](./DEVELOPMENT.md) para mais detalhes!

---

**Última atualização**: 30 de Abril de 2026  
**Versão**: 1.0.0

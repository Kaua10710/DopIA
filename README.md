# DopIA - Chatbot de Comparação de Preços

Aplicação web completa com chatbot para comparação de preços de produtos em estabelecimentos.

## 📁 Estrutura do Projeto

```
projeto_DopIA/
├── backend/          # Servidor Node.js + Express
│   ├── src/
│   │   ├── server.js
│   │   ├── db/
│   │   ├── routes/
│   │   └── services/
│   ├── package.json
│   └── .env
│
├── frontend/         # App React
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── api/
│   ├── package.json
│   └── .env
```

## 🚀 Setup Rápido

### Backend

```bash
cd backend
npm install
# Configure .env com dados do MySQL
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 📋 Funcionalidades

✅ Buscar preços de produtos  
✅ Encontrar estabelecimentos  
✅ Comparar preços  
✅ Interface responsiva (mobile-friendly)  
✅ Chat flutuante com ícone criativo

## 🎨 Design

- Cores: #1E2A38 (azul escuro) + #FFFFFF (branco)
- Font: Poppins SemiBold
- Ícone: Eye + Dollar Symbol

## 📝 Próximos Passos

1. Popular banco de dados com produtos e estabelecimentos
2. Testar fluxos de chat
3. Otimizar performance das queries

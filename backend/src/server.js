const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const produtosRoutes = require('./routes/produtos');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// ========== MIDDLEWARE ==========
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(logger.middleware);

// ========== HEALTH CHECK ==========
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Backend running! ✅',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ========== ROUTES ==========
app.use('/api/chat', chatRoutes);
app.use('/api/produtos', produtosRoutes);

// ========== 404 HANDLER ==========
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.path
  });
});

// ========== ERROR HANDLER ==========
app.use(errorHandler);

// ========== SERVER START ==========
const server = app.listen(PORT, () => {
  logger.info(`🚀 Servidor rodando em http://localhost:${PORT}`);
  logger.info(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

// ========== GRACEFUL SHUTDOWN ==========
process.on('SIGTERM', () => {
  logger.info('SIGTERM recebido. Encerrando servidor gracefully...');
  server.close(() => {
    logger.info('Servidor encerrado');
    process.exit(0);
  });
});

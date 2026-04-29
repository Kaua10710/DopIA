/**
 * Utilitários de logging
 */
const logger = {
  info: (message) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  },
  
  error: (message, error) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
  },
  
  warn: (message) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  },
  
  middleware: (req, res, next) => {
    const startTime = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const color = res.statusCode >= 400 ? '❌' : '✅';
      console.log(
        `${color} [${req.method}] ${req.path} - ${res.statusCode} (${duration}ms)`
      );
    });
    
    next();
  }
};

module.exports = logger;

# 🚀 Deployment Guide - DopIA

Guia passo a passo para fazer deploy da aplicação DopIA em produção.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Deployment Local](#deployment-local)
- [Deployment em Servidor](#deployment-em-servidor)
- [Docker Deployment (futuro)](#docker-deployment-futuro)
- [CI/CD Pipeline](#cicd-pipeline)

---

## Pré-requisitos

### Sistema
- Node.js v14+
- MySQL 8.0+
- Git
- PM2 (para process management)

### Accounts (para cloud deployment)
- GitHub
- Heroku (opcional)
- AWS/DigitalOcean (opcional)

---

## Deployment Local

### 1. Prepare o Ambiente

```bash
# Clone o repositório
git clone https://github.com/Kaua10710/DopIA.git
cd DopIA

# Instale dependências globais
npm install -g pm2
```

### 2. Configure Backend

```bash
cd backend

# Instale dependências
npm install

# Edite .env para produção
cat > .env << EOF
PORT=5000
DB_HOST=localhost
DB_USER=doppia_app
DB_PASSWORD=senha_super_segura
DB_NAME=doppia_db
NODE_ENV=production
EOF

# Crie database
mysql -u root -p << SQL
CREATE DATABASE doppia_db;
CREATE USER 'doppia_app'@'localhost' IDENTIFIED BY 'senha_super_segura';
GRANT ALL PRIVILEGES ON doppia_db.* TO 'doppia_app'@'localhost';
FLUSH PRIVILEGES;
SQL

# Execute schema
mysql -u doppia_app -p doppia_db < src/db/schema.sql
```

### 3. Configure Frontend

```bash
cd ../frontend

# Instale dependências
npm install

# Build para produção
npm run build

# Edite .env para produção
echo "REACT_APP_API_URL=http://seu-dominio.com/api" > .env
```

### 4. Deploy com PM2

```bash
# Backend
cd backend
pm2 start src/server.js --name "doppia-backend"

# Frontend (servir com nginx ou similar)
cd ../frontend
pm2 start "npm start" --name "doppia-frontend"

# Salvar config PM2
pm2 save

# Auto-start na reboot
pm2 startup
```

### 5. Verificar Status

```bash
# Listar processos
pm2 list

# Monitorar logs
pm2 logs doppia-backend
pm2 logs doppia-frontend

# Acessar aplicação
# Backend: http://localhost:5000/health
# Frontend: http://localhost:3000
```

---

## Deployment em Servidor

### 1. Configurar Servidor (Ubuntu 22.04)

```bash
# SSH no servidor
ssh root@seu-servidor.com

# Update packages
apt-get update && apt-get upgrade -y

# Instale Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Instale MySQL
apt-get install -y mysql-server

# Instale nginx
apt-get install -y nginx

# Instale Git
apt-get install -y git
```

### 2. Setup da Aplicação

```bash
# Crie diretório da app
mkdir -p /var/www/doppia
cd /var/www/doppia

# Clone repositório
git clone https://github.com/Kaua10710/DopIA.git .

# Instale dependências globais
npm install -g pm2
```

### 3. Configure Nginx Reverse Proxy

```bash
# Crie arquivo de config
sudo nano /etc/nginx/sites-available/doppia
```

Adicione:

```nginx
upstream backend {
  server 127.0.0.1:5000;
}

server {
  listen 80;
  server_name seu-dominio.com www.seu-dominio.com;

  # Redirecionar para HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name seu-dominio.com www.seu-dominio.com;

  # SSL Certificate (use Let's Encrypt)
  ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

  # Logs
  access_log /var/log/nginx/doppia_access.log;
  error_log /var/log/nginx/doppia_error.log;

  # Frontend
  location / {
    root /var/www/doppia/frontend/build;
    try_files $uri $uri/ /index.html;
  }

  # Backend API
  location /api/ {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }

  # Gzip compression
  gzip on;
  gzip_types text/plain text/css text/javascript application/json;
  gzip_min_length 1000;
}
```

Habilite:
```bash
sudo ln -s /etc/nginx/sites-available/doppia /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

### 4. SSL com Let's Encrypt

```bash
# Instale Certbot
apt-get install -y certbot python3-certbot-nginx

# Gere certificado
certbot certonly --nginx -d seu-dominio.com -d www.seu-dominio.com

# Renovação automática
systemctl enable certbot.timer
```

### 5. Deploy Backend

```bash
cd /var/www/doppia/backend

# Instale dependências
npm install --production

# Configure .env
cat > .env << EOF
PORT=5000
DB_HOST=localhost
DB_USER=doppia_app
DB_PASSWORD=senha_super_segura
DB_NAME=doppia_db
NODE_ENV=production
EOF

# Inicie com PM2
pm2 start src/server.js --name "doppia-backend" --env production

# Salve configuração
pm2 save
pm2 startup
```

### 6. Deploy Frontend

```bash
cd /var/www/doppia/frontend

# Build para produção
npm run build

# .env para produção
echo "REACT_APP_API_URL=https://seu-dominio.com/api" > .env
npm run build
```

---

## Docker Deployment (Futuro)

Placeholder para Docker support em v1.5

```dockerfile
# Será implementado assim

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 5000
CMD ["npm", "start"]
```

---

## CI/CD Pipeline

### GitHub Actions (Automático)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy via SSH
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/doppia
          git pull origin main
          npm install
          npm run build
          pm2 restart doppia-backend
```

Configure secrets no GitHub:
- `HOST`: IP do servidor
- `USERNAME`: Usuário SSH
- `SSH_KEY`: Chave SSH privada

---

## Monitoramento e Manutenção

### Health Check

```bash
# Verificar saúde da aplicação
curl https://seu-dominio.com/health

# Monitorar logs
pm2 logs doppia-backend

# Monitorar sistema
pm2 monitor
```

### Backups

```bash
# Backup do banco de dados (daily)
0 2 * * * mysqldump -u doppia_app -p<senha> doppia_db | gzip > /backups/doppia_$(date +\%Y\%m\%d).sql.gz

# Backup do código (weekly)
0 3 * * 0 tar -czf /backups/doppia_$(date +\%Y\%m\%d).tar.gz /var/www/doppia
```

### Logs e Monitoring

```bash
# Instale ferramentas de logging
npm install --save-dev winston

# Configure alertas no PM2
pm2 install pm2-auto-restart
pm2 install pm2-notifier
```

---

## Troubleshooting

### Erro 502 Bad Gateway

```bash
# Verificar se backend está rodando
pm2 status

# Reiniciar backend
pm2 restart doppia-backend

# Verificar logs
pm2 logs doppia-backend
```

### Lentidão

```bash
# Monitorar CPU/Memory
pm2 monitor

# Ver queries lentas (MySQL)
mysql> SET GLOBAL slow_query_log = 'ON';
mysql> SET GLOBAL long_query_time = 2;
```

### Certificado SSL expirou

```bash
# Renovar com Certbot
certbot renew

# Renovação manual se necessário
certbot certonly --force-renewal -d seu-dominio.com
```

---

## Post-Deployment Checklist

- [ ] HTTPS funcionando
- [ ] API respondendo (health check)
- [ ] Frontend carregando sem erros
- [ ] Chat funcionando
- [ ] Logs sendo gravados
- [ ] Backups automatizados
- [ ] SSL certificado válido
- [ ] PM2 auto-start configurado
- [ ] Monitoramento ativo

---

## Rollback

Se algo der errado:

```bash
# Volte para versão anterior
git revert HEAD
git push origin main

# Ou faça checkout de uma tag
git checkout v1.0.0
npm run build

# Reinicie aplicação
pm2 restart doppia-backend
```

---

**Última atualização**: 30 de Abril de 2026  
**Versão**: 1.0.0  
**Status**: ⚠️ Consulte SECURITY.md antes de fazer deploy

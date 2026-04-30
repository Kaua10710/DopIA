# 🔒 Segurança - DopIA

Política de segurança, boas práticas e orientações para relatar vulnerabilidades.

## 🛡️ Segurança em Desenvolvimento

### Backend

#### 1. SQL Injection Prevention

```javascript
// ✅ BOM: Prepared statements
const query = "SELECT * FROM produtos WHERE nome LIKE ?";
const [results] = await pool.query(query, [`%${userInput}%`]);

// ❌ RUIM: Concatenação direta
const query = `SELECT * FROM produtos WHERE nome LIKE '%${userInput}%'`;
```

#### 2. Input Validation

```javascript
// ✅ BOM: Validar sempre
const validarMensagem = (msg) => {
  if (!msg || msg.length < 1 || msg.length > 500) {
    return 'Mensagem inválida';
  }
  // Sanitizar para remover caracteres especiais perigosos
  return msg.trim().replace(/[<>"']/g, '');
};
```

#### 3. Environment Variables

```bash
# ✅ BOM: Usar .env
PORT=5000
DB_PASSWORD=senha_super_segura
NODE_ENV=production

# ❌ RUIM: Hardcoded
const DB_PASSWORD = 'senha_super_segura'; // NO!
```

#### 4. CORS Configuration

```javascript
// ✅ BOM: Whitelist específica
app.use(cors({
  origin: process.env.CLIENT_URL, // Usar .env
  credentials: true
}));

// ❌ RUIM: Permitir tudo
app.use(cors({ origin: '*' })); // Inseguro!
```

#### 5. Error Handling

```javascript
// ✅ BOM: Não expor detalhes de erro
if (error) {
  logger.error(`Database error: ${error.message}`);
  res.status(500).json({ error: 'Erro ao processar solicitação' });
}

// ❌ RUIM: Expor detalhes de erro
res.status(500).json({ error: error.message, stack: error.stack });
```

### Frontend

#### 1. XSS Prevention

```javascript
// ✅ BOM: React escapa HTML
<div>{userMessage}</div> // Automaticamente escapado

// ❌ RUIM: innerHTML direto
<div dangerouslySetInnerHTML={{ __html: userMessage }} />
```

#### 2. Secure API Calls

```javascript
// ✅ BOM: HTTPS em produção
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Via .env
  timeout: 10000
});

// ❌ RUIM: Hardcoded URL
const API_URL = 'http://insecure.com'; // HTTP!
```

#### 3. Avoiding Sensitive Data in localStorage

```javascript
// ✅ BOM: Apenas dados não-sensíveis
localStorage.setItem('chatHistory', JSON.stringify(messages));

// ❌ RUIM: Armazenar tokens
localStorage.setItem('authToken', jwtToken); // Vulnerável!
```

### Database

#### 1. Strong Credentials

```bash
# ✅ BOM: Senha forte
DB_PASSWORD=P@ssw0rd!#$%Secure123

# ❌ RUIM: Senha fraca
DB_PASSWORD=123456
```

#### 2. Least Privilege

```sql
-- ✅ BOM: Usuário com permissões limitadas
CREATE USER 'doppia_app'@'localhost' IDENTIFIED BY 'senha_forte';
GRANT SELECT, INSERT, UPDATE ON doppia_db.* TO 'doppia_app'@'localhost';
FLUSH PRIVILEGES;

-- ❌ RUIM: Usar root para tudo
-- Nunca faça isso em produção!
```

#### 3. Backups

```bash
# ✅ BOM: Fazer backups regulares
mysqldump -u root -p doppia_db > backup_$(date +%Y%m%d).sql

# ❌ RUIM: Sem backups
# Armazenar em local seguro!
```

---

## 🔑 Autenticação (Planejado v1.1)

### JWT Token Strategy

```javascript
// v1.1: Será implementado assim

// Backend: Gerar token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Frontend: Armazenar em memória (não localStorage)
let authToken = null;

// Backend: Verificar token
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token necessário' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido' });
  }
};
```

---

## 🚨 Relatando Vulnerabilidades

### Política de Divulgação Responsável

Se você descobrir uma vulnerabilidade de segurança, **não crie uma issue pública**. Em vez disso:

1. **Não publique** a vulnerabilidade publicamente
2. **Envie um email** para: [email de segurança - será adicionado]
3. **Aguarde resposta** dentro de 48 horas
4. **Trabalhe conosco** para confirmar e corrigir

### Escopo de Segurança

✅ **In scope** (reportar):
- Injeção SQL
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Autenticação/Autorização quebradas
- Exposição de dados sensíveis

❌ **Out of scope** (não reportar):
- Spelling errors
- UI/UX issues
- Self-XSS
- Content Security Policy bypass
- Missing security headers (não-crítico)

---

## 🔐 Deployment Checklist

Antes de fazer deploy em produção:

- [ ] Variáveis de ambiente configuradas (.env em local seguro)
- [ ] JWT_SECRET é forte e aleatório
- [ ] CORS está restrito a domínio específico
- [ ] HTTPS/SSL certificado instalado
- [ ] Database backups automatizados
- [ ] Logs monitorizados
- [ ] Rate limiting ativado
- [ ] Headers de segurança configurados

---

## 📚 Referências de Segurança

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://nodejs.org/en/docs/guides/security/)
- [React Security](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [MySQL Security Manual](https://dev.mysql.com/doc/refman/8.0/en/security.html)

---

## 🔄 Security Updates

Monitore atualizações de segurança:

```bash
# Verificar vulnerabilidades
npm audit

# Atualizar packages
npm audit fix
npm update

# Notificações do GitHub
# Ative "Security alerts" nas settings do repositório
```

---

**Última atualização**: 30 de Abril de 2026  
**Versão**: 1.0.0  
**Status**: ⚠️ Consulte antes de usar em produção crítica

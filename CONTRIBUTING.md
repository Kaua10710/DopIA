# 🤝 Guia de Contribuição - DopIA

Obrigado por se interessar em contribuir para o DopIA! Este guia descreve como contribuir ao projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Processo de Pull Request](#processo-de-pull-request)
- [Estilo de Código](#estilo-de-código)
- [Commit Messages](#commit-messages)
- [Relatando Bugs](#relatando-bugs)
- [Sugerindo Enhancements](#sugerindo-enhancements)

---

## 📜 Código de Conduta

Esperamos que todos os contribuidores sigam um código de conduta respeitoso:

- ✅ Seja respeitoso com diferentes opiniões
- ✅ Aceite críticas construtivas
- ✅ Foque no que é melhor para a comunidade
- ✅ Mostre empatia com outros membros

---

## 🤝 Como Contribuir

### 1. Fork o Repositório

```bash
# Na página do GitHub, clique em "Fork"
```

### 2. Clone seu Fork Localmente

```bash
git clone https://github.com/seu-usuario/DopIA.git
cd DopIA
```

### 3. Crie uma Branch para sua Feature

```bash
# Feature nova
git checkout -b feature/descricao-feature

# Bug fix
git checkout -b fix/descricao-bug

# Documentação
git checkout -b docs/descricao-mudanca
```

### 4. Faça suas Mudanças

Veja as seções abaixo para padrões de código e commits.

### 5. Teste suas Mudanças

```bash
# Backend
cd backend
npm test  # (quando tiver testes)

# Frontend
cd frontend
npm test  # (quando tiver testes)
```

### 6. Commit com Mensagens Claras

```bash
git add .
git commit -m "feat: adicionar novo feature"
```

### 7. Push para sua Branch

```bash
git push origin feature/descricao-feature
```

### 8. Crie um Pull Request

No GitHub, clique em "New Pull Request" e descreva suas mudanças.

---

## 📝 Processo de Pull Request

### Checklist antes de submeter PR

- [ ] Código segue o estilo do projeto
- [ ] Comentários JSDoc adicionados (funções novas)
- [ ] PropTypes adicionados (componentes novos)
- [ ] Sem console.log() ou código de debug
- [ ] Testado localmente
- [ ] Sem conflitos com branch main

### Template de PR

```markdown
## Descrição
[Descreva brevemente o que foi alterado]

## Tipo de Mudança
- [ ] Bug fix (correção não quebra)
- [ ] Feature nova (nova funcionalidade)
- [ ] Breaking change (quebra compatibilidade)
- [ ] Documentação

## Como Testar?
[Descreva os passos para testar a mudança]

## Screenshots (se aplicável)
[Cole capturas de tela mostrando a mudança]

## Relacionado a Issue
Closes #[número-da-issue]
```

---

## 💻 Estilo de Código

### JavaScript/Node.js

```javascript
// ✅ BOM: camelCase, comentários úteis, const/let
const buscarDados = async (id) => {
  try {
    const resultado = await database.query(`SELECT * FROM usuarios WHERE id = ?`, [id]);
    return resultado;
  } catch (error) {
    logger.error(`Erro ao buscar dados: ${error.message}`);
    throw new Error('Falha ao buscar dados');
  }
};

// ❌ RUIM: var, nomes ruins, sem comments
var x = database.query(`SELECT * FROM usuarios WHERE id = ${id}`);
```

### React/JSX

```javascript
// ✅ BOM: PropTypes, useCallback, semantic JSX
const MyComponent = ({ onClose, title }) => {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    // ... lógica
    setLoading(false);
  }, []);
  
  return (
    <div className="component" role="main">
      <h1>{title}</h1>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Carregando...' : 'Enviar'}
      </button>
    </div>
  );
};

MyComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};
```

### CSS

```css
/* ✅ BOM: Variáveis, nomes claros, mobile-first */
:root {
  --primary-color: #1E2A38;
  --transition: 0.3s ease;
}

.button {
  background: var(--primary-color);
  transition: all var(--transition);
  padding: 10px 20px;
  border: none;
}

.button:hover {
  opacity: 0.8;
}

/* Mobile first */
@media (max-width: 480px) {
  .button {
    width: 100%;
  }
}
```

---

## 💬 Commit Messages

Seguir padrão **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: Nova feature
- **fix**: Bug fix
- **docs**: Mudanças de documentação
- **style**: Mudanças de formatação (sem lógica)
- **refactor**: Refatoração de código
- **perf**: Melhoria de performance
- **test**: Adicionar/atualizar testes
- **chore**: Mudanças em build, deps, etc

### Exemplos

```bash
# ✅ BOM
git commit -m "feat(chat): adicionar suporte a comparação de preços"
git commit -m "fix(nlp): corrigir interpretação de produtos com acentuação"
git commit -m "docs(readme): atualizar instruções de setup"
git commit -m "refactor(backend): otimizar queries com índices"

# ❌ RUIM
git commit -m "alterações"
git commit -m "WIP"
git commit -m "fix bug"
```

---

## 🐛 Relatando Bugs

### Template de Issue

```markdown
## Descrição
[Descreva claramente o bug]

## Passos para Reproduzir
1. Ir para...
2. Clicar em...
3. Observar erro...

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que realmente aconteceu]

## Environment
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari]
- Backend: [Rodando em localhost:5000?]
- Frontend: [Rodando em localhost:3000?]

## Screenshots
[Se aplicável, adicione capturas de tela]

## Logs de Erro
\`\`\`
[Cole qualquer mensagem de erro relevante]
\`\`\`
```

---

## ✨ Sugerindo Enhancements

### Template de Feature Request

```markdown
## Descrição
[Descreva a feature proposta de forma clara]

## Problema que Resolve
[Qual problema do usuário isso resolve?]

## Solução Proposta
[Descreva como seria implementado]

## Alternativas Consideradas
[Outras abordagens pensadas]

## Contexto Adicional
[Screenshots, links, notas importantes]
```

---

## 📚 Recursos Úteis

### Documentação Interna
- [README.md](./README.md) - Visão geral do projeto
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detalhes técnicos
- [API Documentation](./README.md#-api-documentation) - Endpoints disponíveis

### Ferramentas Recomendadas
- [VSCode](https://code.visualstudio.com/) - Editor
- [Postman](https://www.postman.com/) - Testar APIs
- [Git Desktop](https://desktop.github.com/) - GUI para Git

### Links Úteis
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MySQL Docs](https://dev.mysql.com/doc/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ❓ Dúvidas?

- 📧 Abra uma issue com tag `question`
- 💬 Veja issues abertas para respostas
- 📖 Consulte a [documentação](./README.md)

---

## 🎉 Obrigado!

Suas contribuições ajudam a tornar o DopIA melhor para todos!

---

**Última atualização**: 30 de Abril de 2026  
**Versão**: 1.0.0

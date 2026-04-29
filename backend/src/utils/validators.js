/**
 * Validadores de entrada
 */

const validarMensagem = (message) => {
  if (!message) {
    return 'Mensagem não pode estar vazia';
  }

  const msg = String(message).trim();

  if (msg.length === 0) {
    return 'Mensagem não pode estar vazia';
  }

  if (msg.length > 500) {
    return 'Mensagem é muito longa (máximo 500 caracteres)';
  }

  return null; // Sem erros
};

const validarPaginacao = (page, limit) => {
  const p = parseInt(page) || 1;
  const l = parseInt(limit) || 10;

  if (p < 1) return { error: 'Página deve ser >= 1' };
  if (l < 1 || l > 100) return { error: 'Limite deve estar entre 1 e 100' };

  return { page: p, limit: l };
};

module.exports = {
  validarMensagem,
  validarPaginacao
};

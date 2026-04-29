const express = require('express');
const router = express.Router();
const { interpretarMensagem } = require('../services/nlp');
const { buscarPrecos, buscarPorEstabelecimento } = require('../services/queries');
const { validarMensagem } = require('../utils/validators');
const logger = require('../utils/logger');

const ChatController = {
  /**
   * POST /api/chat
   * Processa mensagem do usuário e retorna resposta
   */
  processar: async (req, res, next) => {
    try {
      const { message } = req.body;

      // Validação
      const erro = validarMensagem(message);
      if (erro) {
        return res.status(400).json({ error: erro });
      }

      // Interpretar mensagem
      const interpretacao = interpretarMensagem(message);

      if (interpretacao.confianca < 0.3) {
        return res.json({
          mensagem: gerarSaudacao(),
          tipo: 'desconhecido',
          produtos_encontrados: 0
        });
      }

      // Buscar dados conforme tipo de consulta
      let resposta = '';
      let dados = [];

      switch (interpretacao.tipo) {
        case 'preco':
          if (interpretacao.indicio) {
            dados = await buscarPrecos(interpretacao.indicio);
            resposta = formatarRespostaBusca(dados, interpretacao.indicio, 'preco');
          }
          break;

        case 'localizacao':
          if (interpretacao.indicio) {
            dados = await buscarPorEstabelecimento(interpretacao.indicio);
            resposta = formatarRespostaBusca(dados, interpretacao.indicio, 'localizacao');
          }
          break;

        case 'comparacao':
          if (interpretacao.indicio) {
            dados = await buscarPrecos(interpretacao.indicio);
            resposta = formatarComparacao(dados, interpretacao.indicio);
          }
          break;

        default:
          resposta = gerarSaudacao();
      }

      logger.info(`Chat: ${interpretacao.tipo} - Encontrados ${dados.length} resultados`);

      res.json({
        mensagem: resposta,
        tipo: interpretacao.tipo,
        confianca: interpretacao.confianca,
        produtos_encontrados: dados.length
      });

    } catch (error) {
      logger.error('Erro ao processar chat', error);
      next(error);
    }
  }
};

// ========== FORMATADORES ==========

const formatarRespostaBusca = (dados, produto, tipo) => {
  if (dados.length === 0) {
    return `Desculpe, não encontrei "${produto}" em nosso banco de dados. Tente outro produto!`;
  }

  if (tipo === 'preco') {
    let resposta = `💰 Encontrei ${dados.length} opção(ões) de "${produto}":\n\n`;
    dados.forEach(item => {
      resposta += `📍 ${item.estabelecimento} (${item.cidade})\n`;
      resposta += `💵 R$ ${parseFloat(item.preco).toFixed(2)}\n`;
      resposta += `📬 ${item.endereco}\n\n`;
    });
    return resposta;
  }

  if (tipo === 'localizacao') {
    let resposta = `📍 Encontrei "${produto}" nos seguintes locais:\n\n`;
    const estabelecimentosUnicos = new Set();

    dados.forEach(item => {
      if (!estabelecimentosUnicos.has(item.estabelecimento)) {
        estabelecimentosUnicos.add(item.estabelecimento);
        resposta += `🏪 ${item.estabelecimento}\n`;
        resposta += `📍 ${item.endereco}, ${item.cidade}\n`;
        resposta += `📞 ${item.telefone || 'Não informado'}\n\n`;
      }
    });
    return resposta;
  }

  return 'Desculpe, não consegui processar sua solicitação.';
};

const formatarComparacao = (dados, produto) => {
  if (dados.length < 2) {
    return `Preciso de mais dados para comparar "${produto}". Tente outro produto!`;
  }

  let resposta = `📊 Comparação de preços para "${produto}":\n\n`;
  const melhorPreco = dados[0].preco;

  dados.forEach((item, index) => {
    const emoji = index === 0 ? '✅ MELHOR' : '❌';
    const economia = ((item.preco - melhorPreco) / melhorPreco * 100).toFixed(1);
    resposta += `${emoji} - ${item.estabelecimento}: R$ ${parseFloat(item.preco).toFixed(2)}`;
    if (index > 0) resposta += ` (+${economia}%)`;
    resposta += `\n`;
  });

  return resposta;
};

const gerarSaudacao = () => {
  return `Olá! 👀💰 Sou o assistente DopIA. Posso ajudar você a:\n
✅ Buscar preços de produtos
✅ Encontrar estabelecimentos
✅ Comparar preços entre lojas\n
Tente perguntar: "Qual o preço do pão?" ou "Onde encontro leite?"`;
};

// ========== ROUTES ==========
router.post('/', ChatController.processar);

module.exports = router;

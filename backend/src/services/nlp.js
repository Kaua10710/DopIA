/**
 * Serviço NLP - Interpretação de mensagens do usuário
 * Identifica tipos de consulta e extrai produtos-chave
 */

const KEYWORDS = {
  preco: ['preço', 'quanto custa', 'qual o valor', 'valor', 'custo'],
  localizacao: ['onde', 'localiza', 'mercado', 'estabelecimento', 'loja', 'supermercado', 'endereço'],
  comparacao: ['compare', 'comparação', 'qual', 'barato', 'mais barato', 'mais caro', 'diferença'],
  recomendacao: ['recomend', 'sugest', 'melhor', 'pior', 'legal']
};

const STOPWORDS = [
  'preço', 'valor', 'quanto', 'custa', 'custe', 'onde', 'localiza',
  'mercado', 'loja', 'estabelecimento', 'compare', 'qual', 'barato',
  'mais', 'recomend', 'sugest', 'melhor', 'pior', 'do', 'de', 'em',
  'o', 'a', 'os', 'as', 'e', 'ou', 'que', 'um', 'uma', 'uns', 'umas',
  '?', 'encontro', 'tem', 'vende', 'há', 'tem', 'há', 'é', 'são',
  'esse', 'esse', 'esse', 'nesse', 'nesse', 'nesse'
];

/**
 * Interpreta mensagem e identifica tipo de consulta
 * @param {string} mensagem - Mensagem do usuário
 * @returns {Object} - { tipo, confianca, indicio }
 */
const interpretarMensagem = (mensagem) => {
  const msg = String(mensagem).toLowerCase().trim();

  let tipoDetectado = 'desconhecido';
  let confiancaMaxima = 0;

  // Iterar sobre cada tipo e calcular confiança
  for (const [tipo, keywords] of Object.entries(KEYWORDS)) {
    const ocorrencias = keywords.filter(kw => msg.includes(kw)).length;
    const confianca = ocorrencias > 0 ? Math.min(ocorrencias / 2, 0.95) : 0;

    if (confianca > confiancaMaxima) {
      confiancaMaxima = confianca;
      tipoDetectado = tipo;
    }
  }

  // Se confiança < 0.3, não tenho certeza
  if (confiancaMaxima < 0.3) {
    return {
      tipo: 'desconhecido',
      confianca: confiancaMaxima,
      indicio: null
    };
  }

  return {
    tipo: tipoDetectado,
    confianca: Math.round(confiancaMaxima * 100) / 100,
    indicio: extrairNomeProduto(msg)
  };
};

/**
 * Extrai nome do produto da mensagem
 * @param {string} mensagem - Mensagem processada
 * @returns {string|null} - Nome do produto ou null
 */
const extrairNomeProduto = (mensagem) => {
  const palavras = mensagem
    .split(/\s+/)
    .filter(p => {
      const limpo = p.toLowerCase().replace(/[^a-záéíóúâêãõç]/g, '');
      return !STOPWORDS.includes(limpo) && limpo.length > 2;
    })
    .slice(0, 5); // Limitar a 5 palavras

  return palavras.length > 0 ? palavras.join(' ') : null;
};

module.exports = {
  interpretarMensagem,
  extrairNomeProduto
};

const pool = require('../db/connection');
const logger = require('../utils/logger');

/**
 * Busca preços de um produto em diversos estabelecimentos
 * @param {string} nomeProduto - Nome ou parte do nome do produto
 * @param {number} limit - Número máximo de resultados (default: 10)
 * @returns {Promise<Array>} - Array de preços encontrados
 */
const buscarPrecos = async (nomeProduto, limit = 10) => {
  try {
    if (!nomeProduto || nomeProduto.trim().length === 0) {
      return [];
    }

    const query = `
      SELECT 
        p.id as produto_id,
        p.nome as produto,
        e.id as estabelecimento_id,
        e.nome as estabelecimento,
        e.endereco,
        e.cidade,
        pr.preco,
        pr.data_atualizacao
      FROM precos pr
      INNER JOIN produtos p ON pr.produto_id = p.id
      INNER JOIN estabelecimentos e ON pr.estabelecimento_id = e.id
      WHERE p.nome LIKE ?
      ORDER BY pr.preco ASC
      LIMIT ?
    `;
    
    const [results] = await pool.query(query, [
      `%${nomeProduto}%`,
      Math.min(limit, 100) // Máximo 100 resultados
    ]);

    logger.info(`Busca de preços: "${nomeProduto}" - ${results.length} resultados`);
    return results;

  } catch (error) {
    logger.error(`Erro ao buscar preços para "${nomeProduto}"`, error);
    throw new Error('Erro ao buscar preços');
  }
};

/**
 * Busca estabelecimentos que vendem um produto
 * @param {string} nomeProduto - Nome ou parte do nome do produto
 * @param {string|null} cidade - Filtro opcional por cidade
 * @returns {Promise<Array>} - Array de estabelecimentos
 */
const buscarPorEstabelecimento = async (nomeProduto, cidade = null) => {
  try {
    if (!nomeProduto || nomeProduto.trim().length === 0) {
      return [];
    }

    let query = `
      SELECT 
        e.id as estabelecimento_id,
        e.nome as estabelecimento,
        e.endereco,
        e.cidade,
        e.telefone,
        e.latitude,
        e.longitude,
        p.id as produto_id,
        p.nome as produto,
        pr.preco
      FROM precos pr
      INNER JOIN produtos p ON pr.produto_id = p.id
      INNER JOIN estabelecimentos e ON pr.estabelecimento_id = e.id
      WHERE p.nome LIKE ?
    `;
    
    const params = [`%${nomeProduto}%`];
    
    if (cidade && cidade.trim().length > 0) {
      query += ` AND e.cidade LIKE ?`;
      params.push(`%${cidade}%`);
    }
    
    query += ` ORDER BY e.nome, pr.preco ASC`;
    
    const [results] = await pool.query(query, params);

    logger.info(`Busca de estabelecimentos: "${nomeProduto}" ${cidade ? `em ${cidade}` : ''} - ${results.length} resultados`);
    return results;

  } catch (error) {
    logger.error(`Erro ao buscar estabelecimentos para "${nomeProduto}"`, error);
    throw new Error('Erro ao buscar estabelecimentos');
  }
};

/**
 * Busca o melhor preço de um produto
 * @param {string} nomeProduto - Nome ou parte do nome do produto
 * @returns {Promise<Object|null>} - Resultado com melhor preço ou null
 */
const buscarMelhorPreco = async (nomeProduto) => {
  try {
    if (!nomeProduto || nomeProduto.trim().length === 0) {
      return null;
    }

    const query = `
      SELECT 
        p.id as produto_id,
        p.nome as produto,
        e.id as estabelecimento_id,
        e.nome as estabelecimento,
        e.endereco,
        e.cidade,
        pr.preco,
        pr.data_atualizacao
      FROM precos pr
      INNER JOIN produtos p ON pr.produto_id = p.id
      INNER JOIN estabelecimentos e ON pr.estabelecimento_id = e.id
      WHERE p.nome LIKE ?
      ORDER BY pr.preco ASC
      LIMIT 1
    `;
    
    const [results] = await pool.query(query, [`%${nomeProduto}%`]);
    return results[0] || null;

  } catch (error) {
    logger.error(`Erro ao buscar melhor preço para "${nomeProduto}"`, error);
    throw new Error('Erro ao buscar melhor preço');
  }
};

/**
 * Calcula estatísticas de preço de um produto
 * @param {string} nomeProduto - Nome ou parte do nome do produto
 * @returns {Promise<Object|null>} - Estatísticas (min, max, media, quantidade)
 */
const obterEstatisticasPreco = async (nomeProduto) => {
  try {
    if (!nomeProduto || nomeProduto.trim().length === 0) {
      return null;
    }

    const query = `
      SELECT 
        p.nome as produto,
        COUNT(*) as quantidade,
        MIN(pr.preco) as preco_minimo,
        MAX(pr.preco) as preco_maximo,
        ROUND(AVG(pr.preco), 2) as preco_media
      FROM precos pr
      INNER JOIN produtos p ON pr.produto_id = p.id
      WHERE p.nome LIKE ?
      GROUP BY p.id, p.nome
    `;
    
    const [results] = await pool.query(query, [`%${nomeProduto}%`]);
    return results[0] || null;

  } catch (error) {
    logger.error(`Erro ao obter estatísticas para "${nomeProduto}"`, error);
    throw new Error('Erro ao obter estatísticas');
  }
};

module.exports = {
  buscarPrecos,
  buscarPorEstabelecimento,
  buscarMelhorPreco,
  obterEstatisticasPreco
};

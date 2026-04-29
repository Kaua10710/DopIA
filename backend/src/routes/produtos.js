const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

/**
 * GET /api/produtos
 * Lista produtos com filtros opcionais
 */
router.get('/', async (req, res) => {
  try {
    const { categoria, nome } = req.query;
    let query = 'SELECT * FROM produtos WHERE 1=1';
    const params = [];

    if (nome) {
      query += ' AND nome LIKE ?';
      params.push(`%${nome}%`);
    }
    if (categoria) {
      query += ' AND categoria LIKE ?';
      params.push(`%${categoria}%`);
    }

    const [results] = await pool.query(query, params);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/produtos/estabelecimentos
 * Lista estabelecimentos com filtros opcionais
 */
router.get('/estabelecimentos', async (req, res) => {
  try {
    const { cidade } = req.query;
    let query = 'SELECT id, nome, endereco, cidade, telefone FROM estabelecimentos WHERE 1=1';
    const params = [];

    if (cidade) {
      query += ' AND cidade LIKE ?';
      params.push(`%${cidade}%`);
    }

    const [results] = await pool.query(query, params);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

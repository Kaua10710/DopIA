-- Criar banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS doppia_db;
USE doppia_db;

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE,
  categoria VARCHAR(100),
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Estabelecimentos (Mercados, Supermercados)
CREATE TABLE IF NOT EXISTS estabelecimentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  endereco VARCHAR(500),
  cidade VARCHAR(100),
  latitude FLOAT,
  longitude FLOAT,
  telefone VARCHAR(20),
  horario_funcionamento VARCHAR(100),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Preços
CREATE TABLE IF NOT EXISTS precos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT NOT NULL,
  estabelecimento_id INT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (produto_id) REFERENCES produtos(id),
  FOREIGN KEY (estabelecimento_id) REFERENCES estabelecimentos(id),
  UNIQUE KEY unique_preco (produto_id, estabelecimento_id)
);

-- Índices para performance
CREATE INDEX idx_produto_nome ON produtos(nome);
CREATE INDEX idx_estabelecimento_cidade ON estabelecimentos(cidade);
CREATE INDEX idx_preco_produto ON precos(produto_id);
CREATE INDEX idx_preco_estabelecimento ON precos(estabelecimento_id);

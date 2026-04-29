import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configurar timeout padrão
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

// Interceptor para tratamento de erros
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

const chatApi = {
  /**
   * Envia mensagem para o chatbot
   * @param {string} message - Mensagem do usuário
   * @returns {Promise<Object>} - Resposta do servidor
   */
  sendMessage: async (message) => {
    try {
      const response = await axiosInstance.post('/chat', { message });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return {
        mensagem: '❌ Erro ao conectar ao servidor. Verifique se o servidor está rodando.',
        tipo: 'erro',
        produtos_encontrados: 0
      };
    }
  },

  /**
   * Busca produtos com filtros opcionais
   * @param {string|null} nome - Nome do produto para filtrar
   * @param {string|null} categoria - Categoria do produto
   * @returns {Promise<Array>} - Lista de produtos
   */
  getProdutos: async (nome = null, categoria = null) => {
    try {
      const params = new URLSearchParams();
      if (nome) params.append('nome', nome);
      if (categoria) params.append('categoria', categoria);

      const url = `/produtos${params.toString() ? '?' + params.toString() : ''}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  },

  /**
   * Busca estabelecimentos com filtro opcional por cidade
   * @param {string|null} cidade - Cidade para filtrar
   * @returns {Promise<Array>} - Lista de estabelecimentos
   */
  getEstabelecimentos: async (cidade = null) => {
    try {
      const params = cidade ? `?cidade=${cidade}` : '';
      const response = await axiosInstance.get(`/produtos/estabelecimentos${params}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estabelecimentos:', error);
      return [];
    }
  }
};

export default chatApi;

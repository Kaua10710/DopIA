import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import chatApi from '../api/chatApi';
import '../styles/chatbot.css';

const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '👀💰 Olá! Sou o assistente DopIA. Como posso ajudar você a economizar?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const messageIdRef = useRef(1);

  // Auto-scroll para última mensagem
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Limpar erro após 3 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSendMessage = useCallback(async () => {
    const messageText = inputValue.trim();
    if (!messageText || isLoading) return;

    // Adicionar mensagem do usuário
    const userMessage = {
      id: ++messageIdRef.current,
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Buscar resposta do bot
      const response = await chatApi.sendMessage(messageText);

      if (response.tipo === 'erro' || !response.mensagem) {
        setError('Erro ao processar sua mensagem');
        return;
      }

      const botMessage = {
        id: ++messageIdRef.current,
        text: response.mensagem,
        isUser: false,
        timestamp: new Date(),
        metadata: {
          tipo: response.tipo,
          confianca: response.confianca,
          produtosEncontrados: response.produtos_encontrados
        }
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      console.error('Erro na comunicação:', err);
      setError('Erro ao conectar ao servidor');
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage, isLoading]);

  const handleClearChat = useCallback(() => {
    setMessages([{
      id: 1,
      text: '👀💰 Olá! Sou o assistente DopIA. Como posso ajudar você a economizar?',
      isUser: false,
      timestamp: new Date()
    }]);
    messageIdRef.current = 1;
  }, []);

  return (
    <>
      {isOpen && (
        <div className="chat-overlay" onClick={onClose}></div>
      )}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-title">
            <span className="chat-icon">👀💰</span>
            <span>DopIA - De olho no preço</span>
          </div>
          <div className="chat-header-actions">
            <button 
              className="clear-btn" 
              onClick={handleClearChat}
              title="Limpar conversa"
              aria-label="Limpar histórico do chat"
            >
              🔄
            </button>
            <button 
              className="close-btn" 
              onClick={onClose}
              title="Fechar chat"
              aria-label="Fechar chat DopIA"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              mensagem={msg.text}
              isUser={msg.isUser}
              metadata={msg.metadata}
            />
          ))}
          {isLoading && (
            <div className="chat-message bot">
              <div className="message-content typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          {error && (
            <div className="chat-message bot error">
              <div className="message-content">
                {error}
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Pergunte sobre preços ou estabelecimentos..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            autoFocus={isOpen}
          />
          <button
            className="send-btn"
            onClick={handleSendMessage}
            disabled={isLoading || inputValue.trim() === ''}
            title="Enviar mensagem"
            aria-label="Enviar mensagem"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
};

ChatWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

ChatWindow.defaultProps = {
  isOpen: false
};

export default ChatWindow;

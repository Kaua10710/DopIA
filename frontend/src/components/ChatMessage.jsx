import React from 'react';
import PropTypes from 'prop-types';
import '../styles/chatbot.css';

const ChatMessage = ({ mensagem, isUser = false, metadata = null }) => {
  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
      <div className="message-content">
        {mensagem}
      </div>
      {metadata && !isUser && (
        <div className="message-metadata">
          {metadata.confianca && (
            <span className="confidence">
              Confiança: {(metadata.confianca * 100).toFixed(0)}%
            </span>
          )}
          {metadata.produtosEncontrados !== undefined && (
            <span className="count">
              {metadata.produtosEncontrados} resultado(s)
            </span>
          )}
        </div>
      )}
    </div>
  );
};

ChatMessage.propTypes = {
  mensagem: PropTypes.string.isRequired,
  isUser: PropTypes.bool,
  metadata: PropTypes.shape({
    tipo: PropTypes.string,
    confianca: PropTypes.number,
    produtosEncontrados: PropTypes.number
  })
};

ChatMessage.defaultProps = {
  isUser: false,
  metadata: null
};

export default ChatMessage;

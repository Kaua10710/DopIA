import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ChatWindow from './ChatWindow';
import '../styles/chatbot.css';

const ChatbotWidget = ({ position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        className={`chatbot-button ${position}`}
        onClick={toggleChat}
        title="Abrir assistente DopIA"
        aria-label="Abrir chat DopIA"
        aria-pressed={isOpen}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2"
          role="img"
          aria-hidden="true"
        >
          {/* Olho esquerdo */}
          <circle cx="7" cy="12" r="4" />
          <path d="M1 12c0 0 2-4 6-4s6 4 6 4-2 4-6 4-6-4-6-4" />
          
          {/* Olho direito */}
          <circle cx="17" cy="12" r="4" />
          <path d="M11 12c0 0 2-4 6-4s6 4 6 4-2 4-6 4-6-4-6-4" />
          
          {/* Símbolo do dólar */}
          <g transform="translate(19, 12)">
            <path 
              d="M 0,-3 L 0,3 M -1,-2 L 1,-2 L 1,0 L -1,0 L -1,2 L 1,2" 
              stroke="white" 
              strokeWidth="1" 
              fill="none"
            />
          </g>
        </svg>
      </button>

      <ChatWindow isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

ChatbotWidget.propTypes = {
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left'])
};

ChatbotWidget.defaultProps = {
  position: 'bottom-right'
};

export default ChatbotWidget;

import React from 'react';
import ChatbotWidget from '../components/ChatbotWidget';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">👀💰</span>
            <h1>DopIA</h1>
          </div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#mercados">Mercados</a>
            <a href="#preco">Preços</a>
            <a href="#contact">Contato</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <section className="banner">
          <div className="banner-content">
            <h2>De olho no preço</h2>
            <p>Encontre os melhores preços de supermercados e estabelecimentos próximos a você</p>
            <button className="cta-button">Começar</button>
          </div>
          <div className="banner-image">
            {/* Logo visual */}
            <div className="logo-visual">
              <div className="eye">
                <div className="iris"></div>
              </div>
              <div className="dollar-symbol">$</div>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="featured">
          <h3>Melhores ofertas</h3>
          <div className="offers-grid">
            <div className="offer-card">
              <img src="https://via.placeholder.com/200x150?text=Oferta+1" alt="Oferta" />
              <h4>Produto 1</h4>
              <p className="price">R$ 10.00</p>
              <p className="store">Mercado A</p>
            </div>
            <div className="offer-card">
              <img src="https://via.placeholder.com/200x150?text=Oferta+2" alt="Oferta" />
              <h4>Produto 2</h4>
              <p className="price">R$ 15.00</p>
              <p className="store">Mercado B</p>
            </div>
            <div className="offer-card">
              <img src="https://via.placeholder.com/200x150?text=Oferta+3" alt="Oferta" />
              <h4>Produto 3</h4>
              <p className="price">R$ 12.00</p>
              <p className="store">Mercado C</p>
            </div>
          </div>
        </section>

        {/* Supermercados Section */}
        <section className="supermarkets">
          <h3>Supermercados próximos</h3>
          <p>Clique nos ícones para ver sua localização</p>
          <div className="supermarkets-grid">
            <div className="supermarket-card">
              <div className="supermarket-icon">🏪</div>
              <h4>Real</h4>
            </div>
            <div className="supermarket-card">
              <div className="supermarket-icon">🏬</div>
              <h4>Tatuapé</h4>
            </div>
            <div className="supermarket-card">
              <div className="supermarket-icon">🛒</div>
              <h4>Carrefour</h4>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 DopIA. Todos os direitos reservados.</p>
      </footer>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default Home;

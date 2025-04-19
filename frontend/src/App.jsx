import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <header className="text-center">
        <h1 className="display-4 mb-4 text-danger">🍕 Pizzaria Genuínos</h1>
        <p className="lead mb-5">Bem-vindo! Escolha o que deseja fazer:</p>

        <div className="d-flex flex-column gap-3">
          <a href="/realizar-pedido" className="btn btn-primary btn-lg">
            Fazer Pedido
          </a>
          <a href="/produtos" className="btn btn-success btn-lg">
            Gerenciar Produtos
          </a>
          <a href="/cadastro-cliente" className="btn btn-warning btn-lg text-white">
            Registrar Cliente
          </a>
        </div>
      </header>

      <footer className="mt-5 text-muted">
        <small>&copy; {new Date().getFullYear()} Pizzaria Genuínos. Todos os direitos reservados.</small>
      </footer>
    </div>
  );
}

export default App;

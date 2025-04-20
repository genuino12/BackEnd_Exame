import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormularioCliente from './formularios/formularioclientes';
import FormularioProduto from './formularios/formularioprodutos'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <header className="text-center">
          <h1 className="display-4 mb-4 text-danger">🍕 Pizzaria Genuínos</h1>
          <p className="lead mb-5">Bem-vindo! Escolha o que deseja fazer:</p>

          <div className="d-flex flex-column gap-3">
            <Link to="/realizar-pedido" className="btn btn-primary btn-lg">
              Fazer Pedido
            </Link>
            <Link to="/produtos" className="btn btn-success btn-lg">
              Gerenciar Produtos
            </Link>
            <Link to="/Formulario-Cliente" className="btn btn-warning btn-lg text-white">
              Registrar Cliente
            </Link>
            {/* Adicionando link para o formulário de produtos */}
            <Link to="/Formulario-Produto" className="btn btn-info btn-lg text-white">
              Cadastrar Produto
            </Link>
          </div>
        </header>

        <footer className="mt-5 text-muted">
          <small>&copy; {new Date().getFullYear()} Pizzaria Genuínos. Todos os direitos reservados.</small>
        </footer>
      </div>

      {/* Definindo as rotas */}
      <Routes>
        <Route path="/Formulario-Cliente" element={<FormularioCliente />} />
        <Route path="/Formulario-Produto" element={<FormularioProduto />} />
      </Routes>
    </Router>
  );
}

export default App;

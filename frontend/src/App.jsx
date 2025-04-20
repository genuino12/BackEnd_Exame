
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import FormularioCliente from './formularios/formularioclientes';
import FormularioProduto from './formularios/formularioprodutos';
import FormularioPedido from './formularios/formulariopedido';
import ClienteServico from './serviços/clientes';
import ProdutoServico from './serviços/produtos';
import PedidoServico from './serviços/pedidos';
import ListaClientes from './tabelas/listacliente';
import ListaPedidos from './tabelas/listapedido'; 
import './App.css';

const clienteServico = new ClienteServico();
const produtoServico = new ProdutoServico();
const pedidoServico = new PedidoServico();

function App() {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  // Carregar dados iniciais
  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const dadosClientes = await clienteServico.buscarClientes();
        setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };

    const carregarProdutos = async () => {
      try {
        const dadosProdutos = await produtoServico.buscarProdutos();
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    const carregarPedidos = async () => {
      try {
        const dadosPedidos = await pedidoServico.buscarPedidos();
        setPedidos(Array.isArray(dadosPedidos) ? dadosPedidos : []);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    };

    carregarClientes();
    carregarProdutos();
    carregarPedidos();
  }, []);

  return (
    <Router>
      <Navbar bg="danger" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-white">
            <h3>Pizzaria Genuínos</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/realizar-pedido" className="text-white">
                Fazer Pedido
              </Nav.Link>
              <Nav.Link as={Link} to="/Formulario-Produto" className="text-white">
                Registrar Produto
              </Nav.Link>
              <Nav.Link as={Link} to="/Formulario-Cliente" className="text-white">
                Registrar Cliente
              </Nav.Link>
              <Nav.Link as={Link} to="/Lista-Clientes" className="text-white">
                Lista de Clientes
              </Nav.Link>
              <Nav.Link as={Link} to="/visualizar-pedidos" className="text-white">
                Visualizar Pedidos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Routes>
          <Route
            path="/Formulario-Cliente"
            element={<FormularioCliente clientes={clientes} />}
          />
          <Route
            path="/Formulario-Produto"
            element={<FormularioProduto produtos={produtos} />}
          />
          <Route
            path="/realizar-pedido"
            element={<FormularioPedido clientes={clientes} produtos={produtos} pedidos={pedidos} />}
          />
          <Route
            path="/Lista-Clientes"
            element={<ListaClientes clientes={clientes} />}
          />
          <Route
            path="/visualizar-pedidos"
            element={<ListaPedidos />} // Rota atualizada para visualizar pedidos
          />
          <Route path="*" element={<div>Página não encontrada!</div>} />
        </Routes>
      </Container>

      <footer className="mt-5 text-center text-muted">
        <small>&copy; {new Date().getFullYear()} Pizzaria Genuínos. Todos os direitos reservados.</small>
      </footer>
    </Router>
  );
}

export default App;

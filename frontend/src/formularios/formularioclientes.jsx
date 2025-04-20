import React, { useState } from 'react';
import { Button, Form, Alert, Nav, Container, Navbar, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CadastrarCliente = ({ adicionarCliente }) => {
  const [formData, setFormData] = useState({
    Nome: '',
    Telefone: '',
    Endereco: '',
    CPF: '', 
  });

  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  // Validação do formulário
  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.Nome) novosErros.Nome = 'O nome é obrigatório.';
    if (!formData.Telefone || formData.Telefone.length < 10) {
      novosErros.Telefone = 'Digite um telefone válido.';
    }
    if (!formData.Endereco) novosErros.Endereco = 'O endereço é obrigatório.';
    
    // Validação do CPF (simples)
    if (!formData.CPF || formData.CPF.length !== 11) {
      novosErros.CPF = 'O CPF deve ter 11 dígitos.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const Envio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      try {
        const novoCliente = {
          nome: formData.Nome,
          telefone: formData.Telefone,
          endereco: formData.Endereco,
          cpf: formData.CPF, 
        };
        await adicionarCliente(novoCliente);
        setFormData({
          Nome: '',
          Telefone: '',
          Endereco: '',
          CPF: '', 
        });
        setErros({});
        setSucesso(true);
        setTimeout(() => setSucesso(false), 3000);
      } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cadastrar Cliente</h2>
      <Navbar bg="" variant="" className="justify-content-center">
        <Container>
          <Col className="d-flex justify-content-center">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/clientes">
                <Button variant="dark">Lista de Clientes</Button>
              </Nav.Link>
            </Nav>
          </Col>
        </Container>
      </Navbar>

      {sucesso && <Alert variant="success">Cliente cadastrado com sucesso!</Alert>}
      {Object.keys(erros).length > 0 && (
        <Alert variant="danger">Corrija os erros antes de enviar o formulário.</Alert>
      )}

      <Form onSubmit={Envio}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do cliente"
            value={formData.Nome}
            onChange={(e) => setFormData({ ...formData, Nome: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTelefone">
          <Form.Label>Telefone:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o telefone do cliente"
            value={formData.Telefone}
            onChange={(e) => setFormData({ ...formData, Telefone: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEndereco">
          <Form.Label>Endereço:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o endereço do cliente"
            value={formData.Endereco}
            onChange={(e) => setFormData({ ...formData, Endereco: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCPF">
          <Form.Label>CPF:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF do cliente"
            value={formData.CPF}
            onChange={(e) => setFormData({ ...formData, CPF: e.target.value })}
            required
          />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
        <Button variant="danger" type="reset">
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default CadastrarCliente;

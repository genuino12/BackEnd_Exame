import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormularioCliente = ({ adicionarCliente }) => {
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
        await adicionarCliente(novoCliente); // Chama a função para adicionar cliente
        setFormData({
          Nome: '',
          Telefone: '',
          Endereco: '',
          CPF: '', 
        });
        setErros({});
        setSucesso(true);
        setTimeout(() => setSucesso(false), 3000); // Sucesso por 3 segundos
      } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
      }
    }
  };

  // Função para limpar o formulário
  const handleReset = () => {
    setFormData({
      Nome: '',
      Telefone: '',
      Endereco: '',
      CPF: '',
    });
    setErros({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h2>Cadastrar Cliente</h2>

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
            onChange={handleChange}
            name="Nome"
            isInvalid={!!erros.Nome}
          />
          <Form.Control.Feedback type="invalid">{erros.Nome}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formTelefone">
          <Form.Label>Telefone:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o telefone do cliente"
            value={formData.Telefone}
            onChange={handleChange}
            name="Telefone"
            isInvalid={!!erros.Telefone}
          />
          <Form.Control.Feedback type="invalid">{erros.Telefone}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEndereco">
          <Form.Label>Endereço:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o endereço do cliente"
            value={formData.Endereco}
            onChange={handleChange}
            name="Endereco"
            isInvalid={!!erros.Endereco}
          />
          <Form.Control.Feedback type="invalid">{erros.Endereco}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCPF">
          <Form.Label>CPF:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CPF do cliente"
            value={formData.CPF}
            onChange={handleChange}
            name="CPF"
            isInvalid={!!erros.CPF}
          />
          <Form.Control.Feedback type="invalid">{erros.CPF}</Form.Control.Feedback>
        </Form.Group>

        <br />
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
        <Button variant="danger" type="button" onClick={handleReset} className="ms-2">
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default FormularioCliente;

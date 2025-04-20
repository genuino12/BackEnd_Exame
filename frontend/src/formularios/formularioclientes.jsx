import React, { useState } from 'react';

function FormularioCliente({ onSubmit }) {
  const [cliente, setCliente] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    cpf: '',
  });

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const validar = () => {
    const novosErros = {};

    if (!cliente.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório.';
    }

    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!telefoneRegex.test(cliente.telefone)) {
      novosErros.telefone = 'Telefone inválido. Use o formato (11) 91234-5678.';
    }

    if (!cliente.endereco.trim()) {
      novosErros.endereco = 'Endereço é obrigatório.';
    }

    const cpfLimpo = cliente.cpf.replace(/\D/g, '');
    if (!/^\d{11}$/.test(cpfLimpo)) {
      novosErros.cpf = 'CPF deve conter 11 dígitos numéricos.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      if (onSubmit) onSubmit(cliente);

      console.log('Cliente registrado:', cliente);

      setCliente({
        nome: '',
        telefone: '',
        endereco: '',
        cpf: '',
      });
      setErros({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">Registrar Cliente</h2>

      <div className="mb-3">
        <label className="form-label">Nome:</label>
        <input
          type="text"
          className={`form-control ${erros.nome ? 'is-invalid' : ''}`}
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          placeholder="Ex: João da Silva"
        />
        {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Telefone:</label>
        <input
          type="tel"
          className={`form-control ${erros.telefone ? 'is-invalid' : ''}`}
          name="telefone"
          value={cliente.telefone}
          onChange={handleChange}
          placeholder="Ex: (11) 91234-5678"
        />
        {erros.telefone && <div className="invalid-feedback">{erros.telefone}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Endereço:</label>
        <input
          type="text"
          className={`form-control ${erros.endereco ? 'is-invalid' : ''}`}
          name="endereco"
          value={cliente.endereco}
          onChange={handleChange}
          placeholder="Ex: Rua das Pizzas, 123"
        />
        {erros.endereco && <div className="invalid-feedback">{erros.endereco}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">CPF:</label>
        <input
          type="text"
          className={`form-control ${erros.cpf ? 'is-invalid' : ''}`}
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
          placeholder="Ex: 123.456.789-00"
        />
        {erros.cpf && <div className="invalid-feedback">{erros.cpf}</div>}
      </div>

      <button type="submit" className="btn btn-warning text-white">
        Registrar
      </button>
    </form>
  );
}

export default FormularioCliente;

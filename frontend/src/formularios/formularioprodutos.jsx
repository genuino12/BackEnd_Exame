import React, { useState } from 'react';

function FormularioProduto({ onSubmit }) {
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
  });

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const validar = () => {
    const novosErros = {};

    if (!produto.nome.trim()) {
      novosErros.nome = 'Nome do produto é obrigatório.';
    }

    const precoRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!precoRegex.test(produto.preco)) {
      novosErros.preco = 'Preço inválido. Use o formato 10.99.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validar()) {
      try {
        // Supondo que você tenha uma função para enviar ao backend
        const produtoCriado = await onSubmit(produto);
        console.log('Produto registrado:', produtoCriado);
        setProduto({
          nome: '',
          preco: '',
        });
        setErros({});
      } catch (error) {
        console.error('Erro ao cadastrar o produto:', error);
      }
    }
  };

  const handleReset = () => {
    setProduto({
      nome: '',
      preco: '',
    });
    setErros({});
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">Cadastrar Produto</h2>

      <div className="mb-3">
        <label className="form-label">Nome do Produto:</label>
        <input
          type="text"
          className={`form-control ${erros.nome ? 'is-invalid' : ''}`}
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          placeholder="Ex: Pizza de calabresa"
        />
        {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Preço:</label>
        <input
          type="text"
          className={`form-control ${erros.preco ? 'is-invalid' : ''}`}
          name="preco"
          value={produto.preco}
          onChange={handleChange}
          placeholder="Ex: 30.50"
        />
        {erros.preco && <div className="invalid-feedback">{erros.preco}</div>}
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary text-white me-2">
          Cadastrar Produto
        </button>
        <button type="button" onClick={handleReset} className="btn btn-danger">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormularioProduto;

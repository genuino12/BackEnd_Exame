import React, { useState, useEffect } from 'react';

function FormularioPedido({ onSubmit }) {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState({
    cliente_id: '',
    produtos: [],
    data_pedido: new Date().toISOString().slice(0, 16), // yyyy-MM-ddTHH:mm
  });

  const [erros, setErros] = useState({});

  // Simulação de fetch de dados
  useEffect(() => {
    // Substituir com chamada real (ex: fetch("/api/clientes"))
    setClientes([
      { id: 1, nome: 'João Silva' },
      { id: 2, nome: 'Maria Oliveira' },
    ]);

    setProdutos([
      { id: 1, nome: 'Pizza Calabresa' },
      { id: 2, nome: 'Pizza Quatro Queijos' },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido({ ...pedido, [name]: value });
  };

  const handleProdutosChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const valores = options.map((opt) => Number(opt.value));
    setPedido({ ...pedido, produtos: valores });
  };

  const validar = () => {
    const novosErros = {};
    if (!pedido.cliente_id) {
      novosErros.cliente_id = 'Selecione um cliente.';
    }
    if (pedido.produtos.length === 0) {
      novosErros.produtos = 'Selecione pelo menos um produto.';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      if (onSubmit) onSubmit(pedido);
      console.log('Pedido registrado:', pedido);

      // Reset
      setPedido({
        cliente_id: '',
        produtos: [],
        data_pedido: new Date().toISOString().slice(0, 16),
      });
      setErros({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">Fazer Pedido</h2>

      <div className="mb-3">
        <label className="form-label">Cliente:</label>
        <select
          className={`form-select ${erros.cliente_id ? 'is-invalid' : ''}`}
          name="cliente_id"
          value={pedido.cliente_id}
          onChange={handleChange}
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
        {erros.cliente_id && <div className="invalid-feedback">{erros.cliente_id}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Produtos:</label>
        <select
          multiple
          className={`form-select ${erros.produtos ? 'is-invalid' : ''}`}
          value={pedido.produtos}
          onChange={handleProdutosChange}
        >
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
        {erros.produtos && <div className="invalid-feedback d-block">{erros.produtos}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Data do Pedido:</label>
        <input
          type="datetime-local"
          className="form-control"
          name="data_pedido"
          value={pedido.data_pedido}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Registrar Pedido
      </button>
    </form>
  );
}

export default FormularioPedido;

import React, { useState } from 'react';

function FormularioPedido({ onSubmit }) {
  const [clientes, setClientes] = useState([]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);

  const [pedido, setPedido] = useState({
    cliente_id: '',
    produtos: [],
    data_pedido: new Date().toISOString().slice(0, 16),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido({ ...pedido, [name]: value });
  };

  const handleProdutosChange = (e) => {
    const valores = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
    setPedido({ ...pedido, produtos: valores });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dadosFinais = {
      cliente_id: Number(pedido.cliente_id),
      produtos: pedido.produtos,
      data_pedido: pedido.data_pedido,
    };

    if (onSubmit) onSubmit(dadosFinais);
    console.log('Pedido enviado:', dadosFinais);

    setPedido({
      cliente_id: '',
      produtos: [],
      data_pedido: new Date().toISOString().slice(0, 16),
    });
  };

  const handleVisualizarPedido = () => {
    console.log('Visualizando pedido:', pedido);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">Novo Pedido</h2>

      <div className="mb-3">
        <label className="form-label">Cliente:</label>
        <select
          className="form-select"
          name="cliente_id"
          value={pedido.cliente_id}
          onChange={handleChange}
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Produtos:</label>
        <select
          className="form-select"
          multiple
          value={pedido.produtos}
          onChange={handleProdutosChange}
        >
          {produtosDisponiveis.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Data do Pedido:</label>
        <input
          type="text"
          className="form-control"
          value="Será registrada automaticamente"
          disabled
        />
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary me-2">
          Fazer Pedido
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleVisualizarPedido}
        >
          Visualizar Pedido
        </button>
      </div>
    </form>
  );
}

export default FormularioPedido;

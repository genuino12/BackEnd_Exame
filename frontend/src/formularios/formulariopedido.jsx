import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormularioPedido({ onSubmit, clientes = [], produtos = [] }) {
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
      data_pedido: pedido.data_pedido, // Não mudando data_pedido
    };

    if (onSubmit) onSubmit(dadosFinais);
    console.log('Pedido enviado:', dadosFinais);

    // Resetando os campos, mas mantendo o data_pedido
    setPedido({
      cliente_id: '',
      produtos: [],
      data_pedido: new Date().toISOString().slice(0, 16), // Mantendo a data atual
    });
  };

  const handleReset = () => {
    setPedido({
      cliente_id: '',
      produtos: [],
      data_pedido: new Date().toISOString().slice(0, 16), // Mantendo a data atual
    });
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
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))
          ) : (
            <option disabled>Nenhum cliente disponível</option>
          )}
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
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))
          ) : (
            <option disabled>Nenhum produto disponível</option>
          )}
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
        <Button
          variant="primary"
          type="submit"
          disabled={!pedido.cliente_id || pedido.produtos.length === 0}
        >
          Fazer Pedido
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={handleReset}
          className="ms-2"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export default FormularioPedido;

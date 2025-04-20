const API = "http://localhost:4000";

class PedidoServico {
  // Buscar pedidos com base em um filtro (ex: nome do cliente, status etc.)
  async buscarPedidos(filtro) {
    try {
      if (!filtro) filtro = "";

      const response = await fetch(`${API}/pedidos/buscarPedidos?filtro=${filtro}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar pedidos: ${response.statusText}`);
      }

      const pedidos = await response.json();
      return pedidos;
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw error;
    }
  }

  // Obter um pedido específico pelo ID
  async obterPedidoPorId(id) {
    try {
      const response = await fetch(`${API}/pedidos/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao obter pedido: ${response.statusText}`);
      }

      const pedido = await response.json();
      return pedido;
    } catch (error) {
      console.error(`Erro ao obter pedido com ID ${id}:`, error);
      throw error;
    }
  }

  // Inserir um novo pedido
  async inserirPedido(novoPedido) {
    try {
      const response = await fetch(`${API}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoPedido),
      });

      console.log("Pedido enviado para API:", novoPedido);

      if (!response.ok) {
        const erro = await response.json();
        console.error("Erro da API ao inserir pedido:", erro);
        throw new Error(`Erro ao adicionar pedido: ${erro.message || response.statusText}`);
      }

      const pedidoCriado = await response.json();
      return pedidoCriado;
    } catch (error) {
      console.error("Erro ao inserir pedido:", error);
      throw error;
    }
  }

  // Atualizar um pedido existente
  async atualizarPedido(id, pedidoAtualizado) {
    try {
      const response = await fetch(`${API}/pedidos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoAtualizado),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar pedido: ${response.statusText}`);
      }

      const pedido = await response.json();
      return pedido;
    } catch (error) {
      console.error(`Erro ao atualizar pedido com ID ${id}:`, error);
      throw error;
    }
  }

  // Deletar um pedido pelo ID
  async deletarPedido(id) {
    try {
      const response = await fetch(`${API}/pedidos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar pedido: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error(`Erro ao deletar pedido com ID ${id}:`, error);
      throw error;
    }
  }
}

export default PedidoServico;

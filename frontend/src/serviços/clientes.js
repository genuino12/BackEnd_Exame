const API = "http://localhost:4000";

class ClienteServico {
  async buscarClientes(filtro) {
    try {
      if (filtro === undefined) {
        filtro = "";
      }

      const response = await fetch(`${API}/clientes/buscarcliente?nome=${filtro}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar clientes: ${response.statusText}`);
      }

      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Erro ao obter clientes:", error);
      throw error;
    }
  }

  async obterClientePorId(id) {
    try {
      const response = await fetch(`${API}/clientes/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar cliente: ${response.statusText}`);
      }

      const cliente = await response.json();
      return cliente;
    } catch (error) {
      console.error(`Erro ao obter cliente com ID ${id}:`, error);
      throw error;
    }
  }

  async inserirCliente(novoCliente) {
    try {
      const response = await fetch(`${API}/clientes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCliente),
      });

      console.log("Dados enviados para a API:", novoCliente);

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Detalhes do erro da API:", errorDetails);
        throw new Error(`Erro ao adicionar cliente: ${errorDetails.message || response.statusText}`);
      }

      const clienteCriado = await response.json();
      return clienteCriado;
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      throw error;
    }
  }

  async atualizarCliente(id, clienteAtualizado) {
    try {
      const response = await fetch(`${API}/clientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteAtualizado),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar cliente: ${response.statusText}`);
      }

      const cliente = await response.json();
      return cliente;
    } catch (error) {
      console.error(`Erro ao atualizar cliente com ID ${id}:`, error);
      throw error;
    }
  }

  async deletarCliente(id) {
    try {
      const response = await fetch(`${API}/clientes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar cliente: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error(`Erro ao deletar cliente com ID ${id}:`, error);
      throw error;
    }
  }
}

export default ClienteServico;

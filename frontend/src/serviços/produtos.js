const API = "http://localhost:4000";

class ProdutoServico {
  // Método para buscar produtos com base em um filtro (por nome)
  async buscarProdutos(filtro) {
    try {
      if (filtro === undefined) {
        filtro = "";
      }

      const response = await fetch(`${API}/produtos/buscarProduto?nome=${filtro}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
      }

      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
      throw error;
    }
  }

  // Método para obter um produto pelo seu ID
  async obterProdutoPorId(id) {
    try {
      const response = await fetch(`${API}/produtos/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar produto: ${response.statusText}`);
      }

      const produto = await response.json();
      return produto;
    } catch (error) {
      console.error(`Erro ao obter produto com ID ${id}:`, error);
      throw error;
    }
  }

  // Método para adicionar um novo produto
  async inserirProduto(novoProduto) {
    try {
      const response = await fetch(`${API}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoProduto),
      });

      console.log("Dados enviados para a API:", novoProduto);

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Detalhes do erro da API:", errorDetails);
        throw new Error(`Erro ao adicionar produto: ${errorDetails.message || response.statusText}`);
      }

      const produtoCriado = await response.json();
      return produtoCriado;
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      throw error;
    }
  }

  // Método para atualizar as informações de um produto
  async atualizarProduto(id, produtoAtualizado) {
    try {
      const response = await fetch(`${API}/produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoAtualizado),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar produto: ${response.statusText}`);
      }

      const produto = await response.json();
      return produto;
    } catch (error) {
      console.error(`Erro ao atualizar produto com ID ${id}:`, error);
      throw error;
    }
  }

  // Método para deletar um produto
  async deletarProduto(id) {
    try {
      const response = await fetch(`${API}/produtos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar produto: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error(`Erro ao deletar produto com ID ${id}:`, error);
      throw error;
    }
  }
}

export default ProdutoServico;

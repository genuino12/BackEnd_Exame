import pool from '../config/db.js';

class pedidoDao {
    // Método para inserir um novo pedido
    async inserir(pedido) {
        const query = `INSERT INTO pedidos (cliente_id, produtos, data_pedido)
                       VALUES (?, ?, ?)`;

        const cliente_id = pedido.cliente_id;
        const produtos = pedido.produtos;
        const data_pedido = pedido.data_pedido;

        console.log('Dados recebidos para inserção', {
            cliente_id,
            produtos,
            data_pedido
        });

        if (!cliente_id || !produtos || !data_pedido) {
            throw new Error('Todos os campos são obrigatórios.');
        }

        try {
            const [result] = await pool.execute(query, [
                cliente_id || null,
                produtos || null,
                data_pedido || null
            ]);

            return result.insertId; // Retorna o ID do pedido inserido
        } catch (error) {
            console.error('Erro ao inserir pedido:', {
                mensagem: error.message,
                stack: error.stack,
                dados: { cliente_id, produtos, data_pedido }
            });
            throw error;
        }
    }

    // Método para buscar pedidos, pode buscar todos ou filtrar por nome de cliente
    async buscarPedidos(cliente_id) {
        if (!cliente_id || cliente_id.trim() === "" || cliente_id === null) {
            const query = `SELECT * FROM pedidos`;
            const [rows] = await pool.execute(query);
            return rows; // Retorna todos os pedidos
        } else {
            const query = `SELECT * FROM pedidos WHERE cliente_id = ?`;
            const [rows] = await pool.execute(query, [cliente_id]);
            return rows; // Retorna os pedidos de um cliente específico
        }
    }

    // Método para buscar pedido por ID
    async buscarPorid(id) {
        const query = `SELECT * FROM pedidos WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0]; // Retorna o primeiro resultado ou null
    }

    // Método para deletar um pedido
    async deletar(id) {
        const query = `DELETE FROM pedidos WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows; // Retorna a confirmação da exclusão
    }

    // Método para atualizar um pedido
    async atualizar(id, pedido) {
        let { cliente_id, produtos, data_pedido } = pedido;

        // Definindo valores default se não forem fornecidos
        cliente_id = cliente_id !== undefined ? cliente_id : pedido.cliente_id;
        produtos = produtos !== undefined ? produtos : pedido.produtos;
        data_pedido = data_pedido !== undefined ? data_pedido : pedido.data_pedido;

        const query = `
            UPDATE pedidos SET cliente_id = ?, produtos = ?, data_pedido = ? WHERE id = ?`;

        const [result] = await pool.execute(query, [cliente_id, produtos, data_pedido, id]);

        if (result.affectedRows === 0) {
            throw new Error('Pedido não encontrado ou não foi possível atualizar.');
        }

        return result; // Retorna a confirmação da atualização
    }
}

export default pedidoDao;

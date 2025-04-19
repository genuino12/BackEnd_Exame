import pool from '../config/db.js';

class produtoDao {
    // Método para inserir um novo produto
    async inserir(produto) {
        const query = 'INSERT INTO produtos (nome, preco) VALUES (?, ?)';
        const [result] = await pool.execute(query, [produto.nome, produto.preco]);
        return result.insertId;
    }

    // Método para buscar todos os produtos
    async buscarProdutos() {
        const query = 'SELECT * FROM produtos';
        const [rows] = await pool.execute(query);
        return rows;
    }

    // Método para buscar um produto por ID
    async buscarPorid(id) {
        const query = 'SELECT * FROM produtos WHERE id = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0]; // Retorna o produto com o ID correspondente
    }

    // Método para atualizar um produto
    async atualizar(id, produto) {
        const query = 'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?';
        const [result] = await pool.execute(query, [produto.nome, produto.preco, id]);
        return result.affectedRows > 0;
    }

    // Método para deletar um produto
    async deletar(id) {
        const query = 'DELETE FROM produtos WHERE id = ?';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    }
}

export default produtoDao;

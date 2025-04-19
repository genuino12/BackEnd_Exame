import pool from '../config/db.js';

class clienteDao{
    async inserir(cliente){
        const query = `iNSERT INTO clientes (nome,telefone,endereco, cpf)
        value (?,?,?,?)`;

        const nome = cliente.nome;
        const telefone = cliente.telefone;
        const endereco = cliente.endereco;
        const cpf = cliente.cpf;

        console.log('Dados recebidos para inserção', {
            nome,
            telefone,
            endereco,
            cpf
        });
        if (!nome || !telefone || !endereco || !cpf) {
            throw new Error ('todos campos são obrigatórios.');
        }
        try {
            const [result] = await pool.execute(query, [
                nome || null,
                telefone || null,
                endereco || null,
                cpf || null
            ]);

            return result.insertId;
        } catch (error) {
            console.error ('erro ao inserir cliente:', {
                mensagem: error.message,
                stack: error.stack,
                dados: {nome,telefone, endereco, cpf}
            });
            throw error;
        }
    }
    async buscarcliente(cliente) {
        if (!cliente || cliente.trim() === "" || cliente === null) {
            const query = `SELECT * FROM clientes`;
            const [rows] = await pool.execute(query);
            return rows;
        } else {
            const query = `SELECT * FROM clientes WHERE nome LIKE ? `;
            const [rows] = await pool.execute(query, [`%${cliente}%`]);
            return rows
        }
    }
   async buscarPorid(id) {
     const query = `SELECT * FROM clientes WHERE id = ?`;
     const [rows] = await pool.execute(query, [id]);
    return rows[0];
   }
   async deletar(id){
    const query = `DELETE FROM clientes WHERE id = ?`;
    const [rows] = await pool.execute(query,[id]);
    return rows;
   }
   async atualizar (id,cliente){
    let { nome,telefone,endereco,cpf} = cliente;

    nome = nome !==undefined ? nome: cliente.nome;
    telefone = telefone !==undefined ? telefone: cliente.telefone;
    endereco = endereco !==undefined ? endereco: cliente.endereco;
    cpf = cpf !==undefined ? cpf: cliente.cpf

    const query = `
    UPDATE clientes SET nome = ?, telefone = ?, endereco = ?, cpf = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [nome,telefone,endereco,cpf, id]);
    if (result.affectedRows === 0 ) {
        throw new error ('nome não encontrado ou não foi possivel atualizar');
    }
    return result;
   }
  }

  export default clienteDao;
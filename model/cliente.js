import clienteDao from '../Persistencia/clienteDao.js';

class clienteModel {
    #id;
    #nome;
    #telefone;
    #endereco;
    #cpf;

    constructor(id,nome,telefone,endereco,cpf) {
        this.#id = id;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#endereco = endereco;
        this.#cpf = cpf;
    }
    get id(){
        return this.#id;
    }
    get nome(){
        return this.#nome;
    }
    get telefone(){
        return this.#telefone;
    }
    get endereco(){
        return this.#endereco;
    }
    get cpf(){
        return this.#cpf;
    }

    set id(value) {
        this.#id = value;
    }
    set nome(value) {
        this.#nome = value;
    }
    set telefone(value) {
        this.#telefone = value;
    }
    set endereco(value) {
        this.#endereco = value;
    }
    set cpf(value) {
        this.#cpf = value;
    }
    
toJSON(){
    return {
        id: this.#id,
        nome: this.#nome,
        telefone: this.#telefone,
        endereco: this.#endereco,
        cpf: this.#cpf
    };
}

static async Criar(clienteData) {
    const dao = new clienteDao();
    const cliente = new clienteModel(
        clienteData.id,
        clienteData.nome,
        clienteData.telefone,
        clienteData.endereco,
        clienteData.cpf
    );
    const InsertId = await dao.inserir(cliente);
    cliente.id = InsertId;
    return cliente.toJSON();
}
static async buscarcliente(cliente){
    try {
        const dao = new clienteDao();
        const rows = await dao.buscarcliente(cliente);

        if (!Array.isArray(rows)){
            throw new Error("O método buscarcliente não retornou um array."); 
        }

        return rows.map((row) => new clienteModel(
            row.id,
            row.nome,
            row.telefone,
            row.endereco,
            row.cpf
        ));
    } catch (error) {
        console.error("erro ao buscar Cliente:", error);
        throw new Error("Não foi possível buscar os clientes.");
    }
}

async deletar(){
    const dao = new clienteDao();
    return await dao.deletar(this.#id);
}
async atualizar(){
    const dao = new clienteDao();
    return await dao.atualizar(this.#id, this);
}
static async buscarPorid(id){
    const dao = new clienteDao();
    const data = await dao.buscarPorid(id);
    if (!data) return null;
    return new clienteModel(
        data.id,
        data.nome,
        data.telefone,
        data.endereco,
        data.cpf
    );
}
}
export default clienteModel;
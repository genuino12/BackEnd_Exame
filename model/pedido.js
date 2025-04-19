import pedidoDao from '../Persistencia/pedidoDao.js';

class pedidoModel {
    #id;
    #cliente_id;
    #produtos;
    #data_pedido;

    constructor(id, cliente_id, produtos, data_pedido) {
        this.#id = id;
        this.#cliente_id = cliente_id;
        this.#produtos = produtos;
        this.#data_pedido = data_pedido;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get cliente_id() {
        return this.#cliente_id;
    }

    get produtos() {
        return this.#produtos;
    }

    get data_pedido() {
        return this.#data_pedido;
    }

    // Setters
    set id(value) {
        this.#id = value;
    }

    set cliente_id(value) {
        this.#cliente_id = value;
    }

    set produtos(value) {
        this.#produtos = value;
    }

    set data_pedido(value) {
        this.#data_pedido = value;
    }

    // Método para converter o objeto para JSON
    toJSON() {
        return {
            id: this.#id,
            cliente_id: this.#cliente_id,
            produtos: this.#produtos,
            data_pedido: this.#data_pedido
        };
    }

    // Método estático para criar um pedido
    static async Criar(pedidoData) {
        const dao = new pedidoDao();
        const pedido = new pedidoModel(
            pedidoData.id,
            pedidoData.cliente_id,
            pedidoData.produtos,
            pedidoData.data_pedido
        );
        const InsertId = await dao.inserir(pedido);
        pedido.id = InsertId;
        return pedido.toJSON();
    }

    // Método para deletar o pedido
    async deletar() {
        const dao = new pedidoDao();
        return await dao.deletar(this.#id);
    }

    // Método para atualizar um pedido
    async atualizar() {
        const dao = new pedidoDao();
        return await dao.atualizar(this.#id, this);
    }

    // Método estático para buscar pedido por ID
    static async buscarPorid(id) {
        const dao = new pedidoDao();
        const data = await dao.buscarPorid(id);
        if (!data) return null;
        return new pedidoModel(
            data.id,
            data.cliente_id,
            data.produtos,
            data.data_pedido
        );
    }

    // Método estático para buscar pedidos
    static async buscarPedidos(cliente_id) {
        try {
            const dao = new pedidoDao();
            const rows = await dao.buscarPedidos(cliente_id);
            if (!Array.isArray(rows)) {
                throw new Error("O método buscarPedidos não retornou um array.");
            }
            return rows.map((row) => new pedidoModel(
                row.id,
                row.cliente_id,
                row.produtos,
                row.data_pedido
            ));
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            throw new Error("Não foi possível buscar os pedidos.");
        }
    }
}

export default pedidoModel;

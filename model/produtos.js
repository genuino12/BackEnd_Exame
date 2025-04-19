import produtoDao from '../Persistencia/produtosDao.js';

class produtoModel {
    #id;
    #nome;
    #preco;

    constructor(id, nome, preco) {
        this.#id = id;
        this.#nome = nome;
        this.#preco = preco;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    get preco() {
        return this.#preco;
    }

    // Setters
    set id(value) {
        this.#id = value;
    }

    set nome(value) {
        this.#nome = value;
    }

    set preco(value) {
        this.#preco = value;
    }

    // Método para converter o objeto para JSON
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            preco: this.#preco
        };
    }

    // Método estático para criar um produto
    static async Criar(produtoData) {
        const dao = new produtoDao();
        const produto = new produtoModel(
            produtoData.id,
            produtoData.nome,
            produtoData.preco
        );
        const InsertId = await dao.inserir(produto);
        produto.id = InsertId;
        return produto.toJSON();
    }

    // Método para deletar o produto
    async deletar() {
        const dao = new produtoDao();
        return await dao.deletar(this.#id);
    }

    // Método para atualizar um produto
    async atualizar() {
        const dao = new produtoDao();
        return await dao.atualizar(this.#id, this);
    }

    // Método estático para buscar produto por ID
    static async buscarPorid(id) {
        const dao = new produtoDao();
        const data = await dao.buscarPorid(id);
        if (!data) return null;
        return new produtoModel(
            data.id,
            data.nome,
            data.preco
        );
    }

    // Método estático para buscar todos os produtos
    static async buscarProdutos() {
        try {
            const dao = new produtoDao();
            const rows = await dao.buscarProdutos();
            if (!Array.isArray(rows)) {
                throw new Error("O método buscarProdutos não retornou um array.");
            }
            return rows.map((row) => new produtoModel(
                row.id,
                row.nome,
                row.preco
            ));
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw new Error("Não foi possível buscar os produtos.");
        }
    }
}

export default produtoModel;

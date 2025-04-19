import produtoModel from "../model/produtos.js";

class produtoController {
    // Método para inserir um novo produto
    async inserir(req, res) {
        try {
            const { nome, preco } = req.body;
            const produtoData = { nome, preco };
            const produto = await produtoModel.Criar(produtoData);
            res.status(201).json({
                message: 'Produto Inserido com Sucesso',
                data: produto
            });
        } catch (error) {
            res.status(500).json({
                message: "Não foi possível inserir produto",
                error: error.message
            });
        }
    }

    // Método para deletar um produto
    async deletar(req, res) {
        try {
            console.log('ID recebido para Exclusão:', req.params.id);
            const { id } = req.params;
            const produto = await produtoModel.buscarPorid(id);

            if (!produto) {
                console.log('Produto não encontrado:', id);
                return res.status(404).json({
                    message: 'Produto não encontrado',
                });
            }
            await produto.deletar(id);
            console.log('Produto Excluído com sucesso', id);
            res.status(200).json({
                message: 'Produto excluído com sucesso'
            });
        } catch (error) {
            console.error('Erro ao excluir produto', error);
            res.status(500).json({
                message: 'Erro ao excluir produto',
                error: error.message,
            });
        }
    }

    // Método para buscar um produto por ID
    async buscarPorid(req, res) {
        try {
            const { id } = req.params;
            const produto = await produtoModel.buscarPorid(id);

            if (!produto) {
                return res.status(404).json({
                    message: 'Produto não encontrado',
                });
            }
            res.status(200).json({
                message: 'Produto encontrado com sucesso',
                data: produto
            });

        } catch (error) {
            console.error('Erro ao buscar produto por id', error);
            res.status(500).json({
                message: 'Erro ao buscar produto por id',
                error: error.message
            });
        }
    }

    // Método para buscar todos os produtos
    async buscarProdutos(req, res) {
        try {
            const produtos = await produtoModel.buscarProdutos();

            if (produtos.length === 0) {
                return res.status(404).json({
                    message: 'Nenhum produto encontrado',
                });
            }
            res.status(200).json({
                message: 'Produtos encontrados com sucesso',
                data: produtos
            });
        } catch (error) {
            console.error('Erro ao buscar produtos', error);
            res.status(500).json({
                message: 'Erro ao buscar produtos',
                error: error.message
            });
        }
    }

    // Método para atualizar um produto
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco } = req.body;

            const produto = await produtoModel.buscarPorid(id);
            if (!produto) {
                return res.status(404).json({
                    message: 'Produto não encontrado',
                });
            }

            produto.nome = nome ?? produto.nome;
            produto.preco = preco ?? produto.preco;

            const resultadoAtualizacao = await produto.atualizar(id, produto);
            if (resultadoAtualizacao) {
                return res.status(200).json({
                    message: 'Produto atualizado com sucesso',
                    data: produto
                });
            } else {
                return res.status(500).json({
                    message: 'Erro ao tentar atualizar produto no banco de dados.'
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({
                message: 'Erro ao atualizar produto',
                error: error.message
            });
        }
    }
}

export default new produtoController();

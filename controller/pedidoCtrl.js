import pedidoModel from "../model/pedido.js";

class pedidoController {
    // Método para inserir um novo pedido
    async inserir(req, res) {
        try {
            const { cliente_id, produtos, data_pedido } = req.body;
            const pedidoData = { cliente_id, produtos, data_pedido };
            const pedido = await pedidoModel.Criar(pedidoData);
            res.status(201).json({
                message: 'Pedido Inserido com Sucesso',
                data: pedido
            });
        } catch (error) {
            res.status(500).json({
                message: "Não foi possível inserir pedido",
                error: error.message
            });
        }
    }

    // Método para deletar um pedido
    async deletar(req, res) {
        try {
            console.log('ID recebido para Exclusão:', req.params.id);
            const { id } = req.params;
            const pedido = await pedidoModel.buscarPorid(id);

            if (!pedido) {
                console.log('Pedido não encontrado:', id);
                return res.status(404).json({
                    message: 'Pedido não encontrado',
                });
            }
            await pedido.deletar(id);
            console.log('Pedido Excluído com sucesso', id);
            res.status(200).json({
                message: 'Pedido excluído com sucesso'
            });
        } catch (error) {
            console.error('Erro ao excluir pedido', error);
            res.status(500).json({
                message: 'Erro ao excluir pedido',
                error: error.message,
            });
        }
    }

    // Método para buscar um pedido por ID
    async buscarPorid(req, res) {
        try {
            const { id } = req.params;
            const pedido = await pedidoModel.buscarPorid(id);

            if (!pedido) {
                return res.status(404).json({
                    message: 'Pedido não encontrado',
                });
            }
            res.status(200).json({
                message: 'Pedido encontrado com sucesso',
                data: pedido
            });

        } catch (error) {
            console.error('Erro ao buscar pedido por id', error);
            res.status(500).json({
                message: 'Erro ao buscar pedido por id',
                error: error.message
            });
        }
    }

    // Método para buscar pedidos (com filtro de cliente)
    async buscarPedidos(req, res) {
        try {
            const { cliente_id } = req.query;
            const pedidos = await pedidoModel.buscarPedidos(cliente_id);

            if (pedidos.length === 0) {
                return res.status(404).json({
                    message: 'Nenhum pedido encontrado',
                });
            }
            res.status(200).json({
                message: 'Pedidos encontrados com sucesso',
                data: pedidos
            });
        } catch (error) {
            console.error('Erro ao buscar pedidos', error);
            res.status(500).json({
                message: 'Erro ao buscar pedidos',
                error: error.message
            });
        }
    }

    // Método para atualizar um pedido
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { cliente_id, produtos, data_pedido } = req.body;

            const pedido = await pedidoModel.buscarPorid(id);
            if (!pedido) {
                return res.status(404).json({
                    message: 'Pedido não encontrado',
                });
            }

            pedido.cliente_id = cliente_id ?? pedido.cliente_id;
            pedido.produtos = produtos ?? pedido.produtos;
            pedido.data_pedido = data_pedido ?? pedido.data_pedido;

            const resultadoAtualizacao = await pedido.atualizar(id, pedido);
            if (resultadoAtualizacao) {
                return res.status(200).json({
                    message: 'Pedido atualizado com sucesso',
                    data: pedido
                });
            } else {
                return res.status(500).json({
                    message: 'Erro ao tentar atualizar pedido no banco de dados.'
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            res.status(500).json({
                message: 'Erro ao atualizar pedido',
                error: error.message
            });
        }
    }
}

export default new pedidoController();

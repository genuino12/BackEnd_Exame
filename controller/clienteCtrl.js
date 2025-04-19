import{ json } from "express";
import clienteModel from "../model/cliente.js";

class clienteController {
    async inserir(req, res) {
        try {
            const {nome,telefone,endereco,cpf} = req.body;
            const clienteData = { nome,telefone,endereco,cpf};
            const cliente = await clienteModel.Criar(clienteData);
            res.status(201).json({
                message: 'Cliente Inserido com Sucesso',
                data: cliente
            });
        } catch (error) {
            res.status(500).json({
                message: "Não foi possivel inserir cliente",
                error: error.message
            });
        }
    }
    async deletar(req,res) {
        try {
            console.log('ID recebido para Exclusão:', req.params.id);
            const {id} = req.params;
            const cliente = await clienteModel.buscarPorid(id);

            if (!cliente) {
                console.log('cliente não encontrado:', id);
                return res.status(404).json({
                    message: 'Cliente não encontrado',
                });
            }
            await cliente.deletar();
            console.log('Cliente Excludo com sucesso', id);
            res.status(200).json ({
                message: 'cliente excluido com sucesso'
            });
        } catch (error) {
            console.error ('erro ao excluir cliente', error);
            res.status(500).json({
                message: 'erro ao excluir cliente',
                error: error.message,
            });
        }
    }
    async buscarPorid(req,res) {
        try {
            const { id } = req.params;
            const cliente = await clienteModel.buscarPorid(id);

            if (!cliente){
                return res.status(404).json ({
                    message: 'cliente não encontrado',
                });
            }
            res.status(200).json ({
                message: 'cliente encontrado com sucesso',
                data: cliente.toJSON(),
            });

        } catch (error) {
            console.error('erro ao buscar cliente por id', error);
            res.status(500).json({
                message: 'erro ao busca cliente por id',
                error: error.message
            });
            
        }
    }
    async buscarcliente(req, res) {
        try {
            const { cliente } = req.query;
            const resultado = await clienteModel.buscarcliente(cliente);
            if (resultado.length === 0){
                return res.status(404).json({
                    message: 'cliente não encontrado',
                });
            }
            res.status(200).json ({
                message: 'cliente encontrado com sucesso',
                data: resultado.map(c => c.toJSON(),)
            });
        } catch (error) {
           console.error('erro ao busca cliente', error);
           res.status(500).json({
            message: 'erro ao busca cliente por flitro',
            erro: error.message
           });
        }
    }
    async atualizar (req, res){
        try {
            const { id } = req.params;
            const {nome, telefone, endereco, cpf} = req.body;

            const cliente = await clienteModel.buscarPorid(id);
            if (!cliente) {
                return res.status(404).json({
                    message: 'cliente não enontrado',
                });
            }
            cliente.nome = nome ?? cliente.nome;
            cliente.telefone = telefone ?? cliente.telefone;
            cliente.endereco = endereco ?? cliente.endereco;
            cliente.cpf = cpf ?? cliente.cpf;

            const resultadoAtualização = await cliente.atualizar();
            if (resultadoAtualização){
                return res.status(200).json({
                    message: 'cliente atulizado com sucesso',
                    data: cliente.toJSON(),
                });
            }else {
                return res.status(500).json({
                    message: 'erro ao tentar atualizar cliente no banco de dados.'
                });
            }
        } catch (error) {
            console.error('erro ao atualizar cliente:', error);
             res.status(500),json({
                message: 'erro ao atualizar cliente',
                erro: error.message
            });
        }
    }
}

export default new clienteController(); 
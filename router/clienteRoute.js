import express from 'express';
import clienteController from '../controller/clienteCtrl.js';  
const router = express.Router();

router.post('/', clienteController.inserir);
router.delete('/:id', clienteController.deletar);
router.put('/:id', clienteController.atualizar);
router.get('/buscarPorid/:id', clienteController.buscarPorid);
router.get('/buscarcliente/', clienteController.buscarcliente);

export default router;
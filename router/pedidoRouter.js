import express from 'express';
import pedidoControllerr from '../controller/pedidoCtrl.js';  
const router = express.Router();

router.post('/', pedidoControllerr.inserir);
router.delete('/:id', pedidoControllerr.deletar);
router.put('/:id', pedidoControllerr.atualizar);
router.get('/buscarPorid/:id', pedidoControllerr.buscarPorid);
router.get('/buscarPedidos/', pedidoControllerr.buscarPedidos);

export default router;
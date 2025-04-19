import express from 'express';
import produtoController from '../controller/produtosCtrl.js';  
const router = express.Router();

router.post('/', produtoController.inserir);
router.delete('/:id', produtoController.deletar);
router.put('/:id', produtoController.atualizar);
router.get('/buscarPorid/:id', produtoController.buscarPorid);
router.get('/buscarProdutos/', produtoController.buscarProdutos);

export default router;
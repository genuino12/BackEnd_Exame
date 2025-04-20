import express from 'express';
import cors from 'cors';
import clienteRoute from './router/clienteRoute.js';
import pedidoRouter from './router/pedidoRouter.js';
import produtosRouter from './router/produtosRouter.js';


const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
}));

app.use(express.json());
app.use('/clientes', clienteRoute);
app.use('/pedidos', pedidoRouter );
app.use ('/produtos', produtosRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
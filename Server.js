import express from 'express';
import cors from 'cors';
import clienteRoute from './router/clienteRoute.js';


const app = express();

app.use('/clientes', clienteRoute)

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
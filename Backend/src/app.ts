import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import rideRoutes from './routes/rideRoutes';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', rideRoutes);

// Inicializa a conexão com o MySQL via TypeORM e, depois, inicia o servidor
AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao MySQL com sucesso");
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no MySQL:", err);
  });

export default app;

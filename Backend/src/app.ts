import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rideRoutes from './routes/rideRoutes';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

// Conecta ao banco de dados MongoDB
mongoose.connect('mongodb+srv://sebastiaofilho2301:jVAbKTxNkko4wb0e@users.i82u18s.mongodb.net/', {
  
}).then(() => {
  console.log('Conectado ao MongoDB com sucesso');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Rotas
app.use('/api', rideRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
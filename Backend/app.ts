import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rideRoutes from './src/routes/rideRoutes';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.MONGO_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Rotas
app.use('/api', rideRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
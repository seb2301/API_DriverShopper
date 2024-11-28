import { Router } from 'express';
import { Request, Response } from 'express';
import { estimateRide, confirmRideController, } from '../controllers/rideController';
export const getRideHistoryController = async (req: Request, res: Response) => {
  
};

const router = Router();

// Estimar Viagem
router.post('/ride/estimate', async (req, res) => {
  try {
    await estimateRide(req, res);
  } catch (error) {
    console.error('Erro ao estimar viagem:', error);
    res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'Erro ao processar a solicitação.' });
  }
});

// Confirmar Viagem
router.patch('/ride/confirm', async (req, res) => {
  try {
    await confirmRideController(req, res);
  } catch (error) {
    console.error('Erro ao confirmar viagem:', error);
    res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'Erro ao processar a solicitação.' });
  }
});

// Obter Histórico de Viagens
router.get('/ride/:customer_id', async (req, res) => {
  try {
    await getRideHistoryController(req, res);
  } catch (error) {
    console.error('Erro ao obter histórico de viagens:', error);
    res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'Erro ao processar a solicitação.' });
  }
});

export default router;
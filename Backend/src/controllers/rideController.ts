import { Request, Response } from 'express';
import { calculateRideEstimate, confirmRide, getRideHistory } from '../services/rideService';
import Driver from '../models/driverModel';

export const estimateRide = async (req: Request, res: Response) => {
  try {
    const { customer_id, origin, destination } = req.body;

    if (!customer_id || !origin || !destination) {
      return res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Dados inválidos' });
    }

    const drivers = await Driver.find();


    return res.status(200).json({
      options: drivers,
      origin: { latitude: 0, longitude: 0 },
      destination: { latitude: 0, longitude: 0 },
      distance: 10,
      duration: '20 mins',
    });
  } catch (error) {
    return res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'Erro interno do servidor' });
  }
};

export const confirmRideController = async (req: Request, res: Response) => {
  try {
    const rideData = req.body;
    if (!rideData.customer_id || !rideData.origin || !rideData.destination || !rideData.driver) {
      return res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Todos os campos são obrigatórios.' });
    }
    
    const confirmation = await confirmRide(rideData);
    res.status(200).json(confirmation);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Motorista não encontrado') {
        res.status(404).json({ error_code: 'DRIVER_NOT_FOUND', error_description: 'Motorista não encontrado.' });
      } else if (error.message === 'Quilometragem inválida para o motorista') {
        res.status(406).json({ error_code: 'INVALID_DISTANCE', error_description: 'Quilometragem inválida para o motorista' });
      } else {
        res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Erro ao confirmar a viagem.' });
      }
    } else {
      res.status(500).json({ error_code: 'UNKNOWN_ERROR', error_description: 'Erro desconhecido ao confirmar a viagem.' });
    }
  }
}
export const getRideHistoryController = async (req: Request, res: Response) => {
  try {
    const { customer_id } = req.params;
    const { driver_id } = req.query;
    if (!customer_id) {
      return res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'ID do cliente é obrigatório.' });
    }
    const history = await getRideHistory(customer_id, driver_id as string);
    if (!history.length) {
      return res.status(404).json({ error_code: 'NO_RIDES_FOUND', error_description: 'Nenhum registro encontrado.' });
    }
    res.status(200).json({ customer_id, rides: history });
  } catch (error) {
    res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'Erro ao obter histórico de viagens.' });
  }

}

export default { estimateRide, confirmRideController, getRideHistoryController };
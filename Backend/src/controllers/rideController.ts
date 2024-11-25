import { Request, Response } from 'express';
import { calculateRideEstimate, confirmRide, getRideHistory } from '../services/rideService';
export const estimateRide = async (req: Request, res: Response) => {
  try {
    const { customer_id, origin, destination } = req.body;
    if (!customer_id || !origin || !destination) {
      return res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Todos os campos são obrigatórios.' });
    }
    if (origin === destination) {
      return res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'A origem e o destino não podem ser iguais.' });
    }
    const estimate = await calculateRideEstimate(customer_id, origin, destination);
    res.status(200).json(estimate);
  } catch (error) {
    res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'Erro ao estimar a viagem.' });
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
    if (error.message === 'Motorista não encontrado') {
      res.status(404).json({ error_code: 'DRIVER_NOT_FOUND', error_description: 'Motorista não encontrado.' });
    } else if (error.message === 'Quilometragem inválida para o motorista') {
      res.status(406).json({ error_code: 'INVALID_DISTANCE', error_description: 'Quilometragem inválida para o motorista.' });
    } else {
      res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Erro ao confirmar a viagem.' });
    }
  }
};

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
};
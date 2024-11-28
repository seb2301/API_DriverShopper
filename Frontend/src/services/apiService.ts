import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

const estimateRide = (data: { customer_id: string; origin: string; destination: string }) => {
  return api.post('/ride/estimate', data);
};

const getRideHistory = (customerId: string) => {
  return api.get(`/ride/${customerId}`);
};

export default {
  estimateRide,
  getRideHistory,
};
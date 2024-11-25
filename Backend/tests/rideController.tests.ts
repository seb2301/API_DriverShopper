import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || '');
});
//beforeAll(async () => {
  //await mongoose.connect(process.env.MONGO_URI_TEST || '', {
  //  useNewUrlParser: true,
 //   useUnifiedTopology: true,
 // });
//});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Ride Controller', () => {
  it('Deve retornar estimativa de viagem', async () => {
    const response = await request(app)
      .post('/api/ride/estimate')
      .send({
        customer_id: '123',
        origin: 'Ponto A',
        destination: 'Ponto B',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('options');
  });

  it('Deve retornar erro ao confirmar viagem com dados inválidos', async () => {
    const response = await request(app)
      .patch('/api/ride/confirm')
      .send({
        customer_id: '',
        origin: '',
        destination: '',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
  });
});
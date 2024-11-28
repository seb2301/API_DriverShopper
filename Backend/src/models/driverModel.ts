import mongoose, { Schema, Document } from 'mongoose';

// Definição da interface para o Driver
type DriverDocument = Document & {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  rate: number;
  minKm: number;
  photoUrl: string;
  vehiclePhotoUrl: string;
};

// Definição do schema do motorista
const DriverSchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  vehicle: { type: String, required: true },
  review: {
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  },
  rate: { type: Number, required: true },
  minKm: { type: Number, required: true },
  photoUrl: { type: String, required: true },
  vehiclePhotoUrl: { type: String, required: true }
});

const Driver = mongoose.model<DriverDocument>('Driver', DriverSchema);

export default Driver;

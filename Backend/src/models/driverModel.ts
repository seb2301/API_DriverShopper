import mongoose, { Schema, Document } from 'mongoose';

export interface IDriver extends Document {
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  ratePerKm: number;
  minDistance: number;
}

const DriverSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  vehicle: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  ratePerKm: { type: Number, required: true },
  minDistance: { type: Number, required: true },
});

export const DriverModel = mongoose.model<IDriver>('Driver', DriverSchema);
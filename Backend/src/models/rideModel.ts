import mongoose, { Schema, Document } from 'mongoose';

export interface IRide extends Document {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: string;
    name: string;
  };
  value: number;
  date: Date;
}

const RideSchema: Schema = new Schema({
  customer_id: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
  driver: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
});

export const RideModel = mongoose.model<IRide>('Ride', RideSchema);
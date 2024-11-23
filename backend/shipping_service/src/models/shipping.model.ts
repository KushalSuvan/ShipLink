export class Shipping {
  constructor(
    public readonly merchantId: string,
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
}

import mongoose, { Schema } from 'mongoose';

const shipmentSchema = new Schema({});

export const Shipment = mongoose.model("Shipment", shipmentSchema);

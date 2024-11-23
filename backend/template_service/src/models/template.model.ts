import mongoose, { Schema } from 'mongoose';
import {
  ITemplate,
  Currency,
  ProductType,
  PackingType,
  TemperatureControl,
} from '../interfaces/template.interface';

const templateSchema = new Schema<ITemplate>({
  templateName: { type: String, required: true },
  productId: { type: String, required: true },
  dimensions: {
    length: { type: Number, required: true },
    breadth: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  weight: { type: Number, required: true },
  commercialInvoiceUri: { type: String, required: true },
  certificateOfOriginUri: { type: String, required: true },
  exportDeclarationUri: { type: String, required: true },
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  declaredValue: { type: Number, required: true },
  currency: { type: Number, enum: Object.values(Currency), required: true },
  category: { type: Number, enum: Object.values(ProductType), required: true },
  packingType: {
    type: Number,
    enum: Object.values(PackingType),
    required: true,
  },
  temperatureControl: {
    type: Number,
    enum: Object.values(TemperatureControl),
    required: true,
  },
  carrier: String,
  insurance: Boolean,
  other: {
    fragile: Boolean,
    hazardous: Boolean,
    humidity: Boolean,
    oversized: Boolean,
  },
});

export const Template = mongoose.model('Template', templateSchema);

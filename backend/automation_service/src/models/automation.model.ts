import mongoose, { Schema } from 'mongoose';
import {
  IAutomation,
  Currency,
  ProductType,
  PackingType,
  TemperatureControl,
} from '../interfaces/automation.interface';

const automationSchema = new Schema<IAutomation>({
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
  safetyDataSheetUri: { type: String, required: true },
  productPhotosUri: { type: String, required: true },
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  declaredValue: { type: Number, required: true },
  currency: { type: String, required: true },
  category: { type: String, required: true },
  packingType: {
    type: String,
    required: true,
  },
  temperatureControl: {
    type: String,
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

export const Automation = mongoose.model('Automation', automationSchema);

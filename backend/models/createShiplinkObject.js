const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryDays: { type: String, required: true },
    maxWeight: { type: String, required: true },
    insurance: { type: String, required: true },
    rating: { type: Number, required: true },
    specialHandling: { type: [String], required: true },
    logo: { type: String, required: true }, // Represents the URL to the company logo
  });


// Define schema for createShiplinkObject
const createShiplinkObjectSchema = new mongoose.Schema({
  ObjectTemplateName: { type: String, required: true },
  AmazonProductID: { type: Number, required: true },
  ShiplinkID: {type: Number, required: true},
  Length: { type: Number, required: true },
  Breadth: { type: Number, required: true },
  Height: { type: Number, required: true },
  Weight: { type: Number, required: true },
  ProductName: { type: String, required: true },
  ProductDescription: { type: String, required: true },
  DeclaredValue: { type: Number, required: true },
  Currency: { type: String, required: true },
  PackagingType: { type: String, required: true },
  Temperature: { type: String },
  FragileItem: { type: Boolean, default: false },
  Hazardous: { type: Boolean, default: false },
  HumidityControl: { type: Boolean, default: false },
  Perishable: { type: Boolean, default: false },
  Biohazard: { type: Boolean, default: false },
  Oversized: { type: Boolean, default: false },
  Carrier_Content: {type: carrierSchema, required: true}, 
});

const Carrier = mongoose.model('Carrier', carrierSchema);
const CreateShiplinkObject = mongoose.model('createShiplinkObjectSchema', createShiplinkObjectSchema);

module.exports = { Carrier, CreateShiplinkObject };

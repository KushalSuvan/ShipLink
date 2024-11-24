type Dimensions = {
  length: Number;
  breadth: Number;
  height: Number;
};

enum ProductType {
  Food,
  Clothing,
  Electronics,
}

enum Currency {
  USD,
  GBP,
  INR,
  EUR,
}

enum PackingType {
  Box,
  Envelope,
  Pallet,
}

enum TemperatureControl {
  Ambient,
  Refrigerated,
  Frozen,
}

type MiscellaneousRequirements = {
  fragile: Boolean;
  hazardous: Boolean;
  humidity: Boolean;
  oversized: Boolean;
};

interface IAutomation {
  templateName: String;
  productId: String;
  dimensions: Dimensions;
  weight: Number;
  commercialInvoiceUri: String;
  certificateOfOriginUri: String;
  exportDeclarationUri: String;
  safetyDataSheetUri: String;
  productPhotosUri: String;
  productName: String;
  productDescription: String;
  declaredValue: Number;
  currency: String;
  category: String;
  packingType: String;
  temperatureControl: String;
  carrier: String;
  insurance: Boolean;
  other: MiscellaneousRequirements;
}

export {
  IAutomation,
  Dimensions,
  Currency,
  ProductType,
  PackingType,
  TemperatureControl,
  MiscellaneousRequirements,
};

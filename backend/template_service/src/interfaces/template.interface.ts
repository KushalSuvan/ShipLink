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

interface ITemplate {
  templateName: String;
  productId: String;
  dimensions: Dimensions;
  weight: Number;
  commercialInvoiceUri: String;
  certificateOfOriginUri: String;
  exportDeclarationUri: String;
  productName: String;
  productDescription: String;
  declaredValue: Number;
  currency: Currency;
  category: ProductType;
  packingType: PackingType;
  temperatureControl: TemperatureControl;
  carrier: String;
  insurance: Boolean;
  other: MiscellaneousRequirements;
}

export {
  ITemplate,
  Dimensions,
  Currency,
  ProductType,
  PackingType,
  TemperatureControl,
  MiscellaneousRequirements,
};

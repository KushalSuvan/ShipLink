import mongoose from 'mongoose';
import { Template } from '../models/template.model';
import { asyncHandler } from '../utils/asyncHandler';
import { uploadToS3 } from '../utils/s3';
import path from 'path';
import { Request } from 'express';

const createTemplate = asyncHandler(async (req, res, next) => {
  const merchantId = req.user?.merchantId;

  const {
    templateName,
    productId,
    length,
    breadth,
    height,
    weight,
    productName,
    productDescription,
    declaredValue,
    currency,
    packingType,
    temperature,
    carrier_company,
    fragile,
    hazardous,
    humidity,
    perishable,
    biohazard,
    oversized,
  } = req.body;

  interface CustomRequest extends Request {
    files?: {
      [fieldname: string]: Express.Multer.File[];
    };
  }

  const customRequest = req as CustomRequest;

  type DocumentTypeKey =
    | 'commercial_invoice'
    | 'certificate_of_origin'
    | 'export_declaration'
    | 'product_photos'
    | 'safety_data_sheet';

  // Upload the files to S3
  const Uri: Record<string, string> = {
    commercial_invoice: 'commercialInvoiceUri',
    certificate_of_origin: 'certificateOfOriginUri',
    export_declaration: 'exportDeclarationUri',
    product_photos: 'productPhotosUri',
    safety_data_sheet: 'safetyDataSheetUri',
  };

  const UriValues: Record<string, string> = {
    commercialInvoiceUri: '',
    certificateOfOriginUri: '',
    exportDeclarationUri: '',
    productPhotosUri: '',
    safetyDataSheetUri: '',
  };

  for (const file in customRequest.files) {
    // console.log(customRequest.files?.[file]);
    const filename = `./public/temp/${req.user?.merchantId}-${productId}-${customRequest.files[file][0].fieldname}${path.extname(customRequest.files[file][0].originalname)}`;
    // console.log(filename)
    try {
      const response = await uploadToS3(filename);
      UriValues[Uri[customRequest.files[file][0].fieldname]] =
        response['Location'];
      // console.log(response['Location'])
    } catch (err) {
      console.error(`❌  Couldn't upload ${filename} to S3`);
      console.error(err);

      res.send('Failed to upload template');
    }
  }

  const template = new Template({
    templateName: templateName,
    productId: productId,
    dimensions: { length: length, breadth: breadth, height: height },
    weight: weight,
    commercialInvoiceUri: UriValues.commercialInvoiceUri,
    certificateOfOriginUri: UriValues.certificateOfOriginUri,
    exportDeclarationUri: UriValues.exportDeclarationUri,
    productPhotosUri: UriValues.productPhotosUri,
    safetyDataSheetUri: UriValues.safetyDataSheetUri,
    productName: productName,
    productDescription: productDescription,
    declaredValue: declaredValue,
    currency: currency,
    packingType: packingType,
    temperatureControl: temperature,
    carrier: carrier_company,
    other: {
      fragile: fragile == 'on' ? true : false,
      hazardous: hazardous == 'on' ? true : false,
      humidity: humidity == 'on' ? true : false,
      perishable: perishable == 'on' ? true : false,
      biohazard: biohazard == 'on' ? true : false,
      oversized: oversized == 'on' ? true : false,
    },
  });

  try {
    await template.save();
    console.log(`✅  Template created successfully`);
  } catch (err) {
    console.error(`⚠️  Failed to create template`);
    console.error(err);
  }

  res.json({ response: '200 OK' });
});

export { createTemplate };

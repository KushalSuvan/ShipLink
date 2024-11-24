import express from 'express';
import bodyParser from 'body-parser';
import { verifyJwt } from '../middlewares/auth.middleware';
import { createTemplate } from '../controllers/template.controller';
import { upload } from '../middlewares/multer.middleware';

const router = express.Router();

router.use(verifyJwt);

router.route('/').post(
  upload.fields([
    {
      name: 'commercial_invoice',
      maxCount: 1,
    },
    {
      name: 'certificate_of_origin',
      maxCount: 1,
    },
    {
      name: 'export_declaration',
      maxCount: 1,
    },
    {
      name: 'safety_data_sheet',
      maxCount: 1,
    },
    {
      name: 'product_photos',
      maxCount: 1,
    },
  ]),
  createTemplate,
);

export default router;

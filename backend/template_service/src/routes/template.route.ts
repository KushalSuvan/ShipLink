import express, { Request, Response, NextFunction } from 'express';
import { TemplateService } from '../services/template.service';
import { TemplateRepository } from '../repositories/template.repository';
import { Template } from '../models/template.model';
import bodyParser from 'body-parser';

const service = new TemplateService(new TemplateRepository());
const router = express.Router();

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log(`GET /`);
  console.log(`${req.body}`);
  res.json({
    'Table Names': await service.getTemplate(''),
  });
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { merchantId, accessToken, refreshToken } = req.body;

  if (!(merchantId && accessToken && refreshToken)) {
    res.status(400).json({
      error: `Required ${!merchantId ? 'merchantId' : ''}${!accessToken ? ', accessToken, ' : ''}${!refreshToken ? ', refreshToken' : ''}`,
    });

    return;
  }

  const template: Template = {
    merchantId: merchantId,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  try {
    const response = await service.createTemplate(template);

    res.status(200).json({
      updates: await response,
    });
  } catch (e) {
    console.error("ERROR: Couldn't create template");
    console.error(e);

    res.status(500).send('Internal Server Error');
  }
});

router.post(
  '/template',
  async (req: Request, res: Response, next: NextFunction) => {
    const { merchantId, accessToken, refreshToken } = req.body;

    if (!(merchantId && accessToken && refreshToken)) {
      res.status(400).json({
        error: `Required ${!merchantId ? 'merchantId' : ''}${!accessToken ? ', accessToken, ' : ''}${!refreshToken ? ', refreshToken' : ''}`,
      });

      return;
    }

    const template: Template = {
      merchantId: merchantId,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    try {
      const response = await service.createTemplate(template);

      res.status(200).json({
        updates: await response,
      });
    } catch (e) {
      console.error("ERROR: Couldn't create user");
      console.error(e);

      res.status(500).send('Internal Server Error');
    }
  },
);

export default router;

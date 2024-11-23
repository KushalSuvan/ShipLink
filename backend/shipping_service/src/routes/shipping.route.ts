import express, { Request, Response, NextFunction } from 'express';
import { ShippingService } from '../services/shipping.service';
import { ShippingRepository } from '../repositories/shipping.repository';
import { Shipping } from '../models/shipping.model';
import bodyParser from 'body-parser';

const service = new ShippingService(new ShippingRepository());
const router = express.Router();

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log(`GET /`);
  console.log(`${req.body}`);
  res.json({
    'Table Names': await service.getShipping(''),
  });
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const {
    objectId,
    pickupAddress,
    deliveryAddress,
    pickupDate,
    deliveryDate,
    carrier,
  } = req.body;

  if (
    !(
      objectId &&
      pickupAddress &&
      deliveryAddress &&
      pickupDate &&
      deliveryDate &&
      carrier
    )
  ) {
    res.status(400).json({
      error: `Required ${!objectId ? 'objectId' : ''}${!pickupAddress ? ', pickupAddress, ' : ''}${!deliveryDate ? ', deliveryDate' : ''}`,
    });

    return;
  }

  const shipping: Shipping = {
    merchantId: '',
    accessToken: '',
    refreshToken: '',
  };

  try {
    const response = await service.createShipping(shipping);

    res.status(200).json({
      updates: await response,
    });
  } catch (e) {
    console.error("ERROR: Couldn't create shipping");
    console.error(e);

    res.status(500).send('Internal Server Error');
  }
});

router.post(
  '/shipping',
  async (req: Request, res: Response, next: NextFunction) => {
    const { merchantId, accessToken, refreshToken } = req.body;

    if (!(merchantId && accessToken && refreshToken)) {
      res.status(400).json({
        error: `Required ${!merchantId ? 'merchantId' : ''}${!accessToken ? ', accessToken, ' : ''}${!refreshToken ? ', refreshToken' : ''}`,
      });

      return;
    }

    const shipping: Shipping = {
      merchantId: merchantId,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    try {
      const response = await service.createShipping(shipping);

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

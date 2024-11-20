import express, { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';

const service = new UserService(new UserRepository());
const router = express.Router();

router.use(express.json());

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    'Table Names': await service.getUser(''),
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

  const user: User = {
    merchantId: merchantId,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  try {
    const response = await service.createUser(user);

    res.status(200).json({
      updates: await response,
    });
  } catch (e) {
    console.error("ERROR: Couldn't create user");
    console.error(e);

    res.status(500).send('Internal Server Error');
  }
});

export default router;

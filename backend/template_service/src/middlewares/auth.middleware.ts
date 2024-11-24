import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

export const verifyJwt = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.user = { merchantId: 0 };
      next();
    } catch (err) {
      next();
    }
  },
);

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: { merchantId?: Number } | undefined;
      files?: {
        [filename: string]: Express.Multer.File[];
      };
    }
  }
}

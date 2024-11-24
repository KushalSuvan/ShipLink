import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncHandler = (
  handler: RequestHandler,
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch((err) => next(err));
};

export { asyncHandler };

import express, { Request, Response, NextFunction } from 'express';
import { default as authRouter } from './routes/auth.route';
const app = express();

app.use('/auth', authRouter);

app.get('/', (_: Request, res: Response, next: NextFunction) => {
  res.json({
    response: 'Hello, Vatar',
  });

  next();
});

app.on('uncaughtException', (e) => console.error(e));

export default app;
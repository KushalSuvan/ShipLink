import express, { Request, Response, NextFunction } from 'express';
import { default as authRouter } from './routes/template.route';
const app = express();

app.use('/template', authRouter);

app.get('/', (_: Request, res: Response, next: NextFunction) => {
  res.json({
    response: 'Hello, Vatar',
  });

  next();
});

app.on('uncaughtException', (e) => console.error(e));

export default app;

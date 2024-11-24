import express, { response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import templateRouter from './routes/template.route';

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/v1/template', templateRouter);
app.all('/', (_, res) => {
  res.json({ response: 'Welcome to ShipLink Shipping API' });
});

app.on('uncaughtException', (e) => console.error(e));

export default app;

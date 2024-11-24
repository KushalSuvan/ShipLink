import express, { response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import automationRouter from './routes/automation.route';

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

app.use('/api/v1/automation', automationRouter);
app.all('/', (_, res) => {
  res.json({ response: 'Welcome to ShipLink Automation API' });
});

app.on('uncaughtException', (e) => console.error(e));

export default app;

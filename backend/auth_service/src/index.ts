import app from './app';
import { connectDb } from './db';

connectDb().then(() => {
  app.listen(process.env.PORT || 80, () => {
    console.log(`⚙️  Server listening at PORT ${process.env.PORT || 80}`);
  });
});

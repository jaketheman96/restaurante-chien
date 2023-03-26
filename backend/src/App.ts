import express from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/ErrorHandler';
import tableRoute from './routes/Tables';
import userRoute from './routes/User';
import bookingRoute from './routes/Bookings';
import foodRouter from './routes/Foods';
import 'express-async-errors';
import orderRoute from './routes/Orders';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors());

    this.app.use(express.json());
    this.app.use('/users', userRoute);
    this.app.use('/tables', tableRoute);
    this.app.use('/bookings', bookingRoute);
    this.app.use('/foods', foodRouter);
    this.app.use('/orders', orderRoute);
    this.app.use(ErrorHandler.handle);
  }

  startServer(PORT: string | number) {
    this.app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
  }
}

export default App;

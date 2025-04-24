import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { ProductRoutes } from './modules/product/product.route';
// import { OrderRoutes } from './modules/order/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

//App Router
// app.use('/api/products', ProductRoutes);
// app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;

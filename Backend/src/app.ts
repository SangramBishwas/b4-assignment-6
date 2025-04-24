import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
// import { ProductRoutes } from './modules/product/product.route';
// import { OrderRoutes } from './modules/order/order.route';
const app: Application = express();


app.use(cors());
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);


//App Router
// app.use('/api/products', ProductRoutes);
// app.use('/api/orders', OrderRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
// app.use(notFound);

export default app;

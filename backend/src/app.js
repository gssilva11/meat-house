import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import indexRouter from './routes/index.js';
import productRouter from './routes/product.js';
import customerRouter from './routes/customer.js';
import orderItemRouter from './routes/orderItem.js';
import orderRouter from './routes/order.js';
import cuttingTypeRouter from './routes/cuttingType.js';
import classRouter from './routes/class.js';
import customerAddressRouter from './routes/customerAddress.js';
import authRouter from './routes/authRoutes.js';
import protectedResourceRouter from './routes/protectedResource.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/customer', customerRouter);
app.use('/orderItem', orderItemRouter);
app.use('/order', orderRouter);
app.use('/cuttingType', cuttingTypeRouter);
app.use('/class', classRouter);
app.use('/:id/customerAddress', customerAddressRouter);
app.use('/auth', authRouter);
app.use('/protected', protectedResourceRouter);

export default app;

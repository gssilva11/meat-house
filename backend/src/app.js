import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

// Importação das rotas
import indexRouter from './routes/index.js';
import productRouter from './routes/product.js';
import userRouter from './routes/user.js';
import orderItemRouter from './routes/orderItem.js';
import orderRouter from './routes/order.js';
import cuttingTypeRouter from './routes/cuttingType.js';
import categoryRouter from './routes/category.js';
import addressRouter from './routes/address.js'; // Importar as rotas de endereço
// import authRouter from './routes/authRoutes.js';
// import protectedResourceRouter from './routes/protectedResource.js';
import uploadRouter from './routes/uploadRoutes.js'; // Importar a rota de upload

dotenv.config();

const app = express();

// Configurações de CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Definição das rotas
app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/orderItem', orderItemRouter);
app.use('/order', orderRouter);
app.use('/cuttingType', cuttingTypeRouter);
app.use('/category', categoryRouter);
app.use('/address', addressRouter); // Rota principal para endereços
// app.use('/auth', authRouter);
// app.use('/api', protectedResourceRouter); // Alterado de '/protected' para '/api'
app.use('/upload', uploadRouter); // Adicionar a rota de upload

// Middleware de tratamento de erros (opcional)
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).send({ message: 'Erro interno do servidor', error: err.message });
});

export default app;

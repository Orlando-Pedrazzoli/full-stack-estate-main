import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Rotas
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import testRoute from './routes/test.route.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';

// Configura .env
dotenv.config();

const app = express();

// Configuração de CORS para produção
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173', // para desenvolvimento local
  'http://localhost:3000', // caso use porta 3000 local
].filter(Boolean); // Remove valores undefined

// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      // Permite requests sem origin (ex: mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Rota de health check
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!', status: 'OK' });
});

// Rotas da API
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

// Tratamento de erro 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// No Vercel, não usamos app.listen() - o serverless cuida disso
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;

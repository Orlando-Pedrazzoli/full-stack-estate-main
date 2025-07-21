const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Rotas
const authRoute = require('./routes/auth.route.js');
const postRoute = require('./routes/post.route.js');
const testRoute = require('./routes/test.route.js');
const userRoute = require('./routes/user.route.js');
const chatRoute = require('./routes/chat.route.js');
const messageRoute = require('./routes/message.route.js');

// Configura .env
dotenv.config();

const app = express();

// Configuração de CORS
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173', // Vite dev server
  'https://raquelperez-five.vercel.app',
  'http://localhost:3000', // Create React App
  'http://localhost:3001', // Alternativa
].filter(Boolean);

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
  res.json({
    message: 'API funcionando!',
    status: 'OK',
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  });
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

// Configuração de porta para desenvolvimento local
const PORT = process.env.PORT || 3000;

// Sempre inicia o servidor em desenvolvimento local
// Para produção (Vercel), isso será ignorado
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  });
} else {
  console.log('🔧 Modo produção - Vercel gerencia o servidor');
}

// IMPORTANTE: Para Vercel
module.exports = app;

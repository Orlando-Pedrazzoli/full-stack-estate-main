import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find(user => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = socketId => {
  onlineUser = onlineUser.filter(user => user.socketId !== socketId);
};

const getUser = userId => {
  return onlineUser.find(user => user.userId === userId);
};

io.on('connection', socket => {
  console.log('Novo usuário conectado:', socket.id);

  socket.on('newUser', userId => {
    addUser(userId, socket.id);
    console.log('Usuários online:', onlineUser);
  });

  socket.on('sendMessage', ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit('getMessage', data);
    }
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    console.log('Usuário desconectado:', socket.id);
  });
});

// ✅ Apenas UMA chamada ao listen:
const PORT = process.env.SOCKET_PORT || 5000;
io.listen(PORT, () => {
  console.log('Socket.IO rodando na porta', PORT);
});

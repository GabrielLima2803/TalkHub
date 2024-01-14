import { Server, Socket } from 'socket.io';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './error/AppError';
import { routes } from './routes';
import http from 'http';
import cors from 'cors';

const app = express();
const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.use(express.json());
app.use(routes);

interface UserData {
  username: string;
}

interface ActiveSocket {
  socket: Socket;
  username: string;
}

const activeSockets: ActiveSocket[] = [];

io.on('connection', (socket: Socket) => {
  console.log(`Novo usuário conectado: ${socket.id}`);

  socket.on('join', (userData: UserData) => {
    console.log(`${userData.username} entrou no chat`);

    const activeSocket: ActiveSocket = {
      socket,
      username: userData.username,
    };
    activeSockets.push(activeSocket);

    io.emit('userConnected', { username: userData.username });
    io.emit('onlineUsers', activeSockets.map((as) => as.username));
  });

  socket.on('sendMessage', (data) => {
    console.log(`Mensagem de ${data.sender}: ${data.message}`);

    const receiverSocket = activeSockets.find((as) => as.socket.id === data.receiverSocketId);
    if (receiverSocket) {
      receiverSocket.socket.emit('receiveMessage', { sender: data.sender, message: data.message });
    } else {
      console.error(`Socket não encontrado para ${data.receiverSocketId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Usuário desconectado`);

    const index = activeSockets.findIndex((as) => as.socket.id === socket.id);
    if (index !== -1) {
      const disconnectedUser = activeSockets.splice(index, 1)[0];
      io.emit('userDisconnected', { username: disconnectedUser.username });
    }
  });
});
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: `Erro interno no servidor - ${err.message}`,
  });
});

server.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));

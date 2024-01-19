import { Server, Socket } from 'socket.io';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './error/AppError';
import { routes } from './routes';
import http from 'http';
import cors from 'cors';
import { Message, PrismaClient } from '@prisma/client';

const app = express();
const PORT = 3000;

const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));
app.use(express.json());
app.use(routes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const prisma = new PrismaClient();

io.on("connection", (socket: Socket) => {
  console.log('A user connected');

  socket.on('message', async (m: Message) => {
    try {
      const message = await prisma.message.create({
        data: {
          content: m.content,
          senderId: m.senderId,
          receiverId: m.receiverId,
          conversationId: m.conversationId,
        },
      });

      console.log("[server](message): %s", JSON.stringify(message));
      io.emit("message", message);
    } catch (error) {
      console.error("Error creating message:", error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
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

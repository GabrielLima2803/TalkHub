import { Server } from 'socket.io';

interface User {
  id: string;
  username: string;
  socketId: string;
}

export class SocketManager {
  private io: Server;
  private connectedUsers: User[] = [];

  constructor(server: any) {
    this.io = new Server(server);

    this.io.on('connection', (socket) => {
      console.log('Novo usuário conectado');

      socket.on('join', (username: string) => {
        const user: User = { id: socket.id, username, socketId: socket.id };
        this.connectedUsers.push(user);

        this.io.emit('userConnected', user);
        this.io.emit('onlineUsers', this.connectedUsers.map((u) => u.username));
      });

      socket.on('sendMessage', (data) => {
        const { sender, receiver, message } = data;
        const receiverSocketId = this.connectedUsers.find((user) => user.username === receiver)?.socketId;
        if (receiverSocketId) {
          this.io.to(receiverSocketId).emit('receiveMessage', { sender, message });
        }
      });

      socket.on('disconnect', () => {
        const disconnectedUser = this.connectedUsers.find((user) => user.socketId === socket.id);

        if (disconnectedUser) {
          this.connectedUsers = this.connectedUsers.filter((user) => user.socketId !== socket.id);
          this.io.emit('userDisconnected', disconnectedUser.username);
        }
      });
    });
  }
}

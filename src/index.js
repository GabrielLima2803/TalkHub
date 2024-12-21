require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const User = require("../src/models/User");
const Message = require('../src/models/Messagem');
const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server);
const { conectarAoMongoDB } = require("./config/connection");

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  socket.on('newuser', async (username) => {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      socket.broadcast.emit('update', username + ' entrou na conversa');
    } else {
      const newUser = new User({ username });
      await newUser.save(); 
      socket.broadcast.emit('update', username + ' entrou na conversa');
    }
  });

  socket.on('exituser', (username) => {
    socket.broadcast.emit('update', username + ' saiu da conversa');
  });

  socket.on('chat', async (message) => {
    const newMessage = new Message({
      username: message.username,
      text: message.text
    });

    try {
      await newMessage.save();  // Usamos await para aguardar o salvamento da mensagem
      socket.broadcast.emit('chat', message);
    } catch (err) {
      console.log('Erro ao salvar mensagem:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

conectarAoMongoDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Servidor sendo rodando na porta  http://localhost:${port}`);
    });
  })
  .catch(() => console.log("Erro ao conectar ao MongoDB"));

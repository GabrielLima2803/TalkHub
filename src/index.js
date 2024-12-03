const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const {conectarAoMongoDB} = require('./config/db');
mongoose.set('strictQuery', true);
const server = http.createServer(app);
const io = new Server(server);
app.use(cors)
app.use(express.json());


app.use(express.static('public'));

io.on('connection', (socket) => {
	console.log('Novo usuário conectado');
	
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});
	
	socket.on('disconnect', () => {
		console.log('Usuário desconectado');
	});
});

conectarAoMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor sendo rodado na porta  http://localhost:${port}`);
    });
  })
  .catch(() => console.log('Erro ao conectar ao MongoDB'));
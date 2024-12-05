const express = require("express");
const http = require("http");
const Mensagem = require("./models/Mensagem.js");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const { conectarAoMongoDB } = require("./config/db");
const server = http.createServer(app);
const io = new Server(server);
const port = 3000
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
io.on("connection", (socket) => {
	console.log("Novo usuário conectado");
  
	Mensagem.find().sort({ timestamp: 1 }).then((mensagens) => {
	  socket.emit("historico", mensagens);
	});
  
	socket.on("set username", (username) => {
		socket.username = username;
		console.log(`${username} entrou no chat.`);
	  });

	socket.on("chat message", async (msg) => {
	  const mensagem = new Mensagem({ username: socket.username, texto: msg });
	  await mensagem.save();
  
	  io.emit("chat message", mensagem);
	});
  
	socket.on("disconnect", () => {
	  console.log("Usuário desconectado");
	});
  });

conectarAoMongoDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Servidor sendo rodado na porta  http://localhost:${port}`);
    });
  })
  .catch(() => console.log("Erro ao conectar ao MongoDB"));

//   async function testeMensagem() {
//     try {
//         const mensagem = new Mensagem({
//             username: 'Teste',
//             texto: 'Olá, mundo!',
//         });
//         await mensagem.save();
//         console.log('Mensagem salva com sucesso:', mensagem);
//     } catch (error) {
//         console.error('Erro ao salvar mensagem:', error);
//     }
// }

// testeMensagem();
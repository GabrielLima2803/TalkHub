<template>
  <div>
    <h1>Chat</h1>
    <div v-for="message in messages" :key="message.id">
      {{ message.sender }}: {{ message.message }}
    </div>
    <input v-model="usernameInput" placeholder="Digite seu username" />
    <button @click="joinChat">Entrar no Chat</button>
    <input v-model="messageInput" @keyup.enter="sendMessage" :disabled="!joined" placeholder="Digite sua mensagem" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';

const messages = ref([]);
const usernameInput = ref('');
const messageInput = ref('');
const socket = io('http://localhost:3000', {
  transports: ['websocket'], 
  upgrade: false,
});

let joined = false;

const joinChat = () => {
  if (usernameInput.value.trim() !== '') {
    socket.emit('join', { username: usernameInput.value });
    joined = true;
  }
};

onMounted(() => {
  socket.on('userConnected', (userData) => {
    messages.value.push({ sender: 'Chat Bot', message: `${userData.username} entrou no chat.` });
  });

  socket.on('onlineUsers', (onlineUsers) => {
    console.log(`Usuários online: ${onlineUsers.join(', ')}`);
  });

  socket.on('receiveMessage', (data) => {
    messages.value.push(data);
  });

  socket.on('userDisconnected', (userData) => {
    messages.value.push({ sender: 'Chat Bot', message: `${userData.username} saiu do chat.` });
  });
});

const sendMessage = () => {
  socket.emit('sendMessage', { sender: usernameInput.value, receiverSocketId: 'Lima', message: messageInput.value });
  messages.value.push({ sender: usernameInput.value, message: messageInput.value });
  messageInput.value = '';
};  
</script>

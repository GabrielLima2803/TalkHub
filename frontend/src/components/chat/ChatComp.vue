<template>
    <div>
        <h1>Chat</h1>
        <ul>
            <li v-for="message in messages" :key="message.id">
                <strong>{{ message.sender.username }}:</strong> {{ message.content }}
            </li>
        </ul>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Digite sua mensagem" />
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
    withCredentials: true,
});

const userId = 11; // Substitua pelo ID do usuário autenticado

socket.emit('join-room', userId);

const messages = ref([]);
const newMessage = ref('');

onMounted(() => {
    socket.on('message', (data) => {
        messages.value.push(data);
    });
});

function sendMessageToOtherTabs(message) {
    localStorage.setItem('new-message', JSON.stringify(message));
    localStorage.removeItem('new-message');
}

socket.on('new-message', (message) => {
    sendMessageToOtherTabs(message);
});

window.addEventListener('storage', (event) => {
    if (event.key === 'new-message') {
        const newMessage = JSON.parse(event.newValue);
        console.log('Nova mensagem recebida em outra aba:', newMessage);
    }
});

function sendMessage() {
    socket.emit('message', {
        content: newMessage.value,
        senderId: userId,
        // Se necessário, adicione receiverId e conversationId aqui
    });
    newMessage.value = ''; // Limpar a caixa de entrada após o envio
}
</script>
  
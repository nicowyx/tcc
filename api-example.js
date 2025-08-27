// Exemplo de API backend - salve como server.js em pasta separada
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Simulação de banco de dados em memória
let messages = [];
let messageId = 1;

// Enviar mensagem
app.post('/api/messages', (req, res) => {
  const { chatId, text, sender, timestamp } = req.body;
  
  const message = {
    id: messageId++,
    chatId,
    text,
    sender,
    timestamp
  };
  
  messages.push(message);
  res.json(message);
});

// Buscar mensagens por chat
app.get('/api/messages/:chatId', (req, res) => {
  const { chatId } = req.params;
  const chatMessages = messages.filter(msg => msg.chatId == chatId);
  res.json(chatMessages);
});

// Buscar últimas mensagens de cada chat
app.get('/api/chats/last-messages', (req, res) => {
  const lastMessages = [];
  const chatIds = [1, 2, 3, 4];
  
  chatIds.forEach(chatId => {
    const chatMessages = messages.filter(msg => msg.chatId == chatId);
    if (chatMessages.length > 0) {
      const lastMessage = chatMessages[chatMessages.length - 1];
      lastMessages.push(lastMessage);
    }
  });
  
  res.json(lastMessages);
});

app.listen(3001, () => {
  console.log('API rodando na porta 3001');
});
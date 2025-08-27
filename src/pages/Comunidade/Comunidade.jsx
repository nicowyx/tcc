import { useState, useEffect } from 'react';
import './Comunidade.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { chatService } from '../../services/chatService';

const Comunidade = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});

  const [chats, setChats] = useState([
    { id: 1, name: 'Arte Digital', lastMessage: '', time: '' },
    { id: 2, name: 'Fotografia', lastMessage: '', time: '' },
    { id: 3, name: 'Música', lastMessage: '', time: '' },
    { id: 4, name: 'Cinema', lastMessage: '', time: '' }
  ]);

  const loadLastMessages = async () => {
    try {
      const lastMessages = await chatService.getLastMessages();
      setChats(prev => prev.map(chat => {
        const lastMsg = lastMessages.find(msg => msg.chatId == chat.id);
        return lastMsg ? {
          ...chat,
          lastMessage: lastMsg.text,
          time: new Date(lastMsg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        } : chat;
      }));
    } catch (error) {
      console.error('Erro ao carregar últimas mensagens:', error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() && activeChat) {
      try {
        const savedMessage = await chatService.sendMessage(activeChat, message);
        
        const newMessage = {
          id: savedMessage.id,
          text: message,
          sender: 'Você',
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), newMessage]
        }));
        setMessage('');
        loadLastMessages();
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  const loadMessages = async (chatId) => {
    try {
      const chatMessages = await chatService.getMessages(chatId);
      setMessages(prev => ({
        ...prev,
        [chatId]: chatMessages.map(msg => ({
          id: msg.id,
          text: msg.text,
          sender: msg.sender,
          time: new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }))
      }));
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  useEffect(() => {
    loadLastMessages();
  }, []);

  useEffect(() => {
    if (activeChat && !messages[activeChat]) {
      loadMessages(activeChat);
    }
  }, [activeChat]);

  return (
    <div className="comunidade-container">
      <Sidebar />
      <div className="comunidade-content">
        <div className="chat-sidebar">
          <h3>Comunidades</h3>
          {chats.map(chat => (
            <div 
              key={chat.id}
              className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="chat-info">
                <h4>{chat.name}</h4>
                <p>{chat.lastMessage}</p>
              </div>
              <span className="chat-time">{chat.time}</span>
            </div>
          ))}
        </div>
        
        <div className="chat-main">
          {activeChat ? (
            <>
              <div className="chat-header">
                <h3>{chats.find(c => c.id === activeChat)?.name}</h3>
              </div>
              
              <div className="chat-messages">
                {(messages[activeChat] || []).map(msg => (
                  <div key={msg.id} className="message">
                    <strong>{msg.sender}</strong>
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="chat-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Enviar</button>
              </div>
            </>
          ) : (
            <div className="no-chat">
              <h3>Selecione uma comunidade para começar a conversar</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comunidade;
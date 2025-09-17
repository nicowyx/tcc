# TCC - Sistema de Publicação de Conteúdo

Sistema completo para publicação e compartilhamento de conteúdo criativo com React + Vite no frontend e Flask + SQLite no backend.

## Estrutura do Projeto

- **Frontend**: React + Vite
- **Backend**: Flask + SQLAlchemy + SQLite
- **Banco de Dados**: SQLite com modelos completos

## Configuração e Execução

### Opção 1: Script Automático
Execute `iniciar_sistema.bat` e escolha a opção desejada.

### Opção 2: Manual

#### Backend
1. Instale Python e pip
2. Navegue para a pasta backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

#### Frontend
1. Instale Node.js e npm
2. Na raiz do projeto:
   ```bash
   npm install
   npm run dev
   ```

## Banco de Dados

O sistema utiliza SQLite com os seguintes modelos:
- **User**: Usuários do sistema
- **Post**: Publicações de conteúdo
- **Like**: Curtidas nas publicações
- **Follow**: Relacionamentos entre usuários
- **Notification**: Sistema de notificações

### Resetar Banco de Dados

```bash
cd backend
# Com dados de teste
python reset_with_test_data.py

# Banco limpo
python reset_clean_db.py
```

### Usuários de Teste
- admin@test.com / 123456
- maria@test.com / 123456
- joao@test.com / 123456
- ana@test.com / 123456

## Funcionalidades

- ✅ Sistema de autenticação completo
- ✅ Publicação de conteúdo por categorias
- ✅ Sistema de curtidas e seguidores
- ✅ Notificações em tempo real
- ✅ Upload de imagens
- ✅ Perfil de usuário personalizado
- ✅ Feed de atividades

## Tecnologias

### Frontend
- React 18
- Vite
- React Router DOM
- React Icons

### Backend
- Flask
- SQLAlchemy
- Flask-JWT-Extended
- Flask-CORS
- Flask-Bcrypt

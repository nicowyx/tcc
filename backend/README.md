# Backend TCC - Sistema de Publicação de Conteúdo

## Configuração do Banco de Dados

Este backend utiliza SQLite com SQLAlchemy para gerenciar o banco de dados.

### Modelos do Banco

- **User**: Usuários do sistema
- **Post**: Publicações de conteúdo
- **Like**: Curtidas nas publicações
- **Follow**: Relacionamentos de seguir usuários
- **Notification**: Notificações do sistema

### Instalação

1. Instale as dependências:
```bash
pip install -r requirements.txt
```

2. Execute o servidor:
```bash
python app.py
```

### Scripts Úteis

- `reset_with_test_data.py`: Reseta o banco com dados de teste
- `reset_clean_db.py`: Reseta o banco limpo
- `reset_db.py`: Reset básico do banco
- `run.py`: Executa o servidor

### Usuários de Teste

Após executar `reset_with_test_data.py`:

- admin@test.com / 123456
- maria@test.com / 123456
- joao@test.com / 123456
- ana@test.com / 123456

### API Endpoints

#### Autenticação
- POST `/api/register` - Registrar usuário
- POST `/api/login` - Login

#### Posts
- GET `/api/posts` - Listar posts públicos
- POST `/api/posts` - Criar post
- GET `/api/posts/{id}` - Obter post específico
- GET `/api/user/posts` - Posts do usuário logado

#### Interações
- POST `/api/posts/{id}/like` - Curtir/descurtir post
- POST `/api/users/{id}/follow` - Seguir/deixar de seguir usuário

#### Perfil
- GET `/api/user/stats` - Estatísticas do usuário
- GET `/api/user/activities` - Atividades do usuário
- GET `/api/user/notifications` - Notificações do usuário

### Configurações

O banco de dados SQLite é criado automaticamente em `instance/tcc_app.db`.
As imagens são salvas na pasta `uploads/`.
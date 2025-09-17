from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from datetime import datetime, timedelta
import os
import base64
import uuid
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SECRET_KEY'] = 'sua-chave-secreta-aqui'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tcc_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Criar pasta de uploads se não existir
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, origins=['*'])

# Rota para servir imagens
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

def save_base64_image(base64_string, filename_prefix='image'):
    """Salva uma imagem base64 e retorna a URL"""
    try:
        # Remove o prefixo data:image/...;base64, se existir
        if ',' in base64_string:
            base64_string = base64_string.split(',')[1]
        
        # Decodifica a imagem
        image_data = base64.b64decode(base64_string)
        
        # Gera um nome único para o arquivo
        filename = f"{filename_prefix}_{uuid.uuid4().hex}.png"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Salva o arquivo
        with open(filepath, 'wb') as f:
            f.write(image_data)
        
        # Retorna a URL para acessar a imagem
        return f"http://localhost:5000/uploads/{filename}"
    except Exception as e:
        print(f"Erro ao salvar imagem: {e}")
        return None

# Modelos do banco de dados
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    posts = db.relationship('Post', backref='author', lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50), nullable=False)
    tags = db.Column(db.String(500))
    file_path = db.Column(db.String(200))
    image_url = db.Column(db.String(500))
    visibility = db.Column(db.String(20), default='public')
    allow_comments = db.Column(db.Boolean, default=True)
    allow_downloads = db.Column(db.Boolean, default=False)
    monetization = db.Column(db.Boolean, default=False)
    price = db.Column(db.Float, default=0.0)
    location = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    likes = db.relationship('Like', backref='post', lazy=True, cascade='all, delete-orphan')

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    __table_args__ = (db.UniqueConstraint('user_id', 'post_id'),)

class Follow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    __table_args__ = (db.UniqueConstraint('follower_id', 'followed_id'),)

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    from_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Rotas de autenticação
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email já cadastrado'}), 400
    
    password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    user = User(
        name=data['name'],
        email=data['email'],
        password_hash=password_hash
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'Usuário criado com sucesso'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email
            }
        }), 200
    
    return jsonify({'message': 'Credenciais inválidas'}), 401

# Rotas de postagens
@app.route('/api/posts', methods=['POST', 'OPTIONS'])
def create_post():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
        
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Dados não fornecidos'}), 400
            
        print('Dados recebidos:', data)
        
        # Validar campos obrigatórios
        if not data.get('title') or not data.get('category'):
            return jsonify({'error': 'Título e categoria são obrigatórios'}), 400
        
        category_images = {
            'musicas': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
            'filmes': 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=300&fit=crop',
            'artes-digitais': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
            'fotografias': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            'obras': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
        }
        
        category = data.get('category', 'musicas')
        tags_list = data.get('tags', [])
        tags_str = ','.join(tags_list) if isinstance(tags_list, list) else str(tags_list)
        
        # Processar imagem personalizada se fornecida
        image_url = category_images.get(category, category_images['musicas'])
        
        # Verificar se há uma imagem personalizada (base64 ou URL)
        custom_image = data.get('image') or data.get('thumbnail')
        if custom_image:
            if custom_image.startswith('data:image'):
                # É uma imagem base64
                saved_url = save_base64_image(custom_image, f"post_{category}")
                if saved_url:
                    image_url = saved_url
                    print(f"Imagem personalizada salva: {saved_url}")
            elif custom_image.startswith('http'):
                # É uma URL válida
                image_url = custom_image
            elif custom_image.startswith('blob:'):
                # É um blob URL do navegador - usar imagem padrão
                print("Blob URL detectado, usando imagem padrão da categoria")
        
        print(f"URL da imagem final: {image_url}")
        
        # Verificar se usuário está autenticado
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
        except:
            user_id = 1  # Fallback para usuário padrão
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'Usuário não encontrado. Faça login primeiro.'}), 401
        
        # Criar o post
        post = Post(
            title=str(data.get('title', 'Sem título'))[:200],  # Limitar tamanho
            description=str(data.get('description', ''))[:1000],  # Limitar tamanho
            category=category,
            tags=tags_str[:500],  # Limitar tamanho
            image_url=image_url,
            visibility=data.get('visibility', 'public'),
            allow_comments=bool(data.get('allowComments', True)),
            allow_downloads=bool(data.get('allowDownloads', False)),
            monetization=bool(data.get('monetization', False)),
            price=float(data.get('price', 0)) if data.get('price') else 0.0,
            location=str(data.get('location', ''))[:100],  # Limitar tamanho
            user_id=user_id
        )
        
        db.session.add(post)
        db.session.commit()
        
        print(f'Post criado com sucesso: ID {post.id}, Título: {post.title}')
        
        return jsonify({
            'message': 'Post criado com sucesso!',
            'post_id': post.id,
            'title': post.title,
            'category': post.category
        }), 201
        
    except Exception as e:
        print(f'Erro detalhado ao criar post: {type(e).__name__}: {str(e)}')
        import traceback
        traceback.print_exc()
        db.session.rollback()
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = Post.query.filter_by(visibility='public').order_by(Post.created_at.desc()).all()
    
    posts_data = []
    for post in posts:
        likes_count = Like.query.filter_by(post_id=post.id).count()
        posts_data.append({
            'id': post.id,
            'title': post.title,
            'description': post.description,
            'category': post.category,
            'tags': post.tags.split(',') if post.tags else [],
            'author': post.author.name if post.author else 'Usuário',
            'author_id': post.user_id,
            'image_url': post.image_url,
            'created_at': post.created_at.isoformat(),
            'allow_comments': post.allow_comments,
            'monetization': post.monetization,
            'price': post.price,
            'location': post.location,
            'likes_count': likes_count
        })
    
    return jsonify(posts_data), 200

@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    
    return jsonify({
        'id': post.id,
        'title': post.title,
        'description': post.description,
        'category': post.category,
        'tags': post.tags.split(',') if post.tags else [],
        'author': post.author.name,
        'created_at': post.created_at.isoformat(),
        'allow_comments': post.allow_comments,
        'allow_downloads': post.allow_downloads,
        'monetization': post.monetization,
        'price': post.price,
        'location': post.location
    }), 200

@app.route('/api/user/posts', methods=['GET'])
@jwt_required()
def get_user_posts():
    user_id = get_jwt_identity()
    posts = Post.query.filter_by(user_id=user_id).order_by(Post.created_at.desc()).all()
    
    posts_data = []
    for post in posts:
        posts_data.append({
            'id': post.id,
            'title': post.title,
            'description': post.description,
            'category': post.category,
            'visibility': post.visibility,
            'created_at': post.created_at.isoformat()
        })
    
    return jsonify(posts_data), 200

@app.route('/api/posts/<int:post_id>/like', methods=['POST'])
@jwt_required()
def toggle_like(post_id):
    try:
        user_id = get_jwt_identity()
        post = Post.query.get_or_404(post_id)
        user = User.query.get(user_id)
        
        existing_like = Like.query.filter_by(user_id=user_id, post_id=post_id).first()
        
        if existing_like:
            db.session.delete(existing_like)
            liked = False
        else:
            new_like = Like(user_id=user_id, post_id=post_id)
            db.session.add(new_like)
            liked = True
            
            if post.user_id != user_id:
                notification = Notification(
                    user_id=post.user_id,
                    type='like',
                    content=f'curtiu sua publicação "{post.title}"',
                    from_user_id=user_id,
                    post_id=post_id
                )
                db.session.add(notification)
        
        db.session.commit()
        likes_count = Like.query.filter_by(post_id=post_id).count()
        
        return jsonify({'liked': liked, 'likes_count': likes_count}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<int:user_id>/follow', methods=['POST'])
@jwt_required()
def toggle_follow(user_id):
    try:
        follower_id = get_jwt_identity()
        
        if follower_id == user_id:
            return jsonify({'error': 'Não é possível seguir a si mesmo'}), 400
        
        user_to_follow = User.query.get_or_404(user_id)
        existing_follow = Follow.query.filter_by(follower_id=follower_id, followed_id=user_id).first()
        
        if existing_follow:
            db.session.delete(existing_follow)
            following = False
        else:
            new_follow = Follow(follower_id=follower_id, followed_id=user_id)
            db.session.add(new_follow)
            following = True
            
            notification = Notification(
                user_id=user_id,
                type='follow',
                content='começou a seguir você',
                from_user_id=follower_id
            )
            db.session.add(notification)
        
        db.session.commit()
        followers_count = Follow.query.filter_by(followed_id=user_id).count()
        
        return jsonify({'following': following, 'followers_count': followers_count}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/stats', methods=['GET'])
@jwt_required()
def get_user_stats():
    user_id = get_jwt_identity()
    
    posts_count = Post.query.filter_by(user_id=user_id).count()
    likes_count = Like.query.join(Post).filter(Post.user_id == user_id).count()
    followers_count = Follow.query.filter_by(followed_id=user_id).count()
    following_count = Follow.query.filter_by(follower_id=user_id).count()
    
    return jsonify({
        'posts': posts_count,
        'likes': likes_count,
        'followers': followers_count,
        'following': following_count
    }), 200

@app.route('/api/user/activities', methods=['GET'])
@jwt_required()
def get_user_activities():
    user_id = get_jwt_identity()
    
    # Buscar curtidas do usuário
    user_likes = db.session.query(Like, Post, User).join(
        Post, Like.post_id == Post.id
    ).join(
        User, Post.user_id == User.id
    ).filter(
        Like.user_id == user_id
    ).order_by(Like.created_at.desc()).limit(20).all()
    
    # Buscar usuários que o usuário segue
    user_follows = db.session.query(Follow, User).join(
        User, Follow.followed_id == User.id
    ).filter(
        Follow.follower_id == user_id
    ).order_by(Follow.created_at.desc()).limit(20).all()
    
    activities = []
    
    # Adicionar curtidas às atividades
    for like, post, author in user_likes:
        activities.append({
            'id': f'like_{like.id}',
            'type': 'like',
            'action': 'curtiu',
            'target': post.title,
            'targetType': 'post',
            'author': author.name,
            'date': like.created_at.isoformat(),
            'icon': '❤️'
        })
    
    # Adicionar seguidores às atividades
    for follow, followed_user in user_follows:
        activities.append({
            'id': f'follow_{follow.id}',
            'type': 'follow',
            'action': 'começou a seguir',
            'target': followed_user.name,
            'targetType': 'user',
            'date': follow.created_at.isoformat(),
            'icon': '👥'
        })
    
    # Ordenar por data (mais recente primeiro)
    activities.sort(key=lambda x: x['date'], reverse=True)
    
    return jsonify(activities[:20]), 200

@app.route('/api/user/notifications', methods=['GET'])
@jwt_required()
def get_user_notifications():
    user_id = get_jwt_identity()
    
    notifications = Notification.query.filter_by(user_id=user_id).order_by(Notification.created_at.desc()).limit(50).all()
    
    notifications_data = []
    for notif in notifications:
        from_user = User.query.get(notif.from_user_id) if notif.from_user_id else None
        
        diff = datetime.utcnow() - notif.created_at
        if diff.days > 0:
            time_ago = f'{diff.days}d atrás'
        elif diff.seconds > 3600:
            time_ago = f'{diff.seconds // 3600}h atrás'
        elif diff.seconds > 60:
            time_ago = f'{diff.seconds // 60}min atrás'
        else:
            time_ago = 'Agora'
        
        notifications_data.append({
            'id': notif.id,
            'type': notif.type,
            'content': notif.content,
            'user': from_user.name if from_user else 'Sistema',
            'avatar': f"https://ui-avatars.com/api/?name={from_user.name}&background=905cc0&color=fff&size=40" if from_user else None,
            'time': time_ago,
            'read': notif.read
        })
    
    return jsonify(notifications_data), 200

@app.route('/api/notifications/<int:notification_id>/read', methods=['POST'])
@jwt_required()
def mark_notification_read(notification_id):
    user_id = get_jwt_identity()
    notification = Notification.query.filter_by(id=notification_id, user_id=user_id).first_or_404()
    
    notification.read = True
    db.session.commit()
    
    return jsonify({'message': 'Notificação marcada como lida'}), 200

if __name__ == '__main__':
    try:
        with app.app_context():
            db.create_all()
            print('Banco de dados inicializado')
        
        print('Backend rodando em http://localhost:5000')
        app.run(debug=True, port=5000, host='127.0.0.1')
    except Exception as e:
        print(f'Erro ao iniciar servidor: {e}')
        input('Pressione Enter para sair...')
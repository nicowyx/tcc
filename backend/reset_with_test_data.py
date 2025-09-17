import os
from app import app, db, User, Post, Like, Follow, Notification, bcrypt

def reset_database():
    with app.app_context():
        # Remover banco existente
        db_path = 'instance/tcc_app.db'
        if os.path.exists(db_path):
            os.remove(db_path)
            print("Banco de dados removido")
        
        # Criar tabelas
        db.create_all()
        print("Tabelas criadas")
        
        # Criar usuários de teste
        password_hash = bcrypt.generate_password_hash('123456').decode('utf-8')
        
        users = [
            User(name='Admin', email='admin@test.com', password_hash=password_hash),
            User(name='Maria Silva', email='maria@test.com', password_hash=password_hash),
            User(name='João Santos', email='joao@test.com', password_hash=password_hash),
            User(name='Ana Costa', email='ana@test.com', password_hash=password_hash)
        ]
        
        for user in users:
            db.session.add(user)
        
        db.session.commit()
        print("Usuários criados")
        
        # Criar posts de teste
        posts = [
            Post(title='Música Eletrônica', description='Minha nova track', category='musicas', user_id=2, image_url='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'),
            Post(title='Arte Digital', description='Criação digital', category='artes-digitais', user_id=3, image_url='https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop'),
            Post(title='Fotografia', description='Paisagem natural', category='fotografias', user_id=4, image_url='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop')
        ]
        
        for post in posts:
            db.session.add(post)
        
        db.session.commit()
        print("Posts criados")
        
        print("Banco resetado com dados de teste!")
        print("Usuários:")
        print("- admin@test.com / 123456")
        print("- maria@test.com / 123456") 
        print("- joao@test.com / 123456")
        print("- ana@test.com / 123456")

if __name__ == '__main__':
    reset_database()
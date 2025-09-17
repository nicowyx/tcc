import os
from app import app, db

def reset_database():
    with app.app_context():
        # Remover banco existente
        db_path = 'instance/tcc_app.db'
        if os.path.exists(db_path):
            os.remove(db_path)
            print("Banco de dados removido")
        
        # Criar tabelas
        db.create_all()
        print("Banco de dados resetado")

if __name__ == '__main__':
    reset_database()
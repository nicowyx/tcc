import os
from app import app, db

def reset_clean_database():
    with app.app_context():
        # Remover banco existente
        db_path = 'instance/tcc_app.db'
        if os.path.exists(db_path):
            os.remove(db_path)
            print("Banco de dados removido")
        
        # Criar tabelas vazias
        db.create_all()
        print("Banco de dados limpo criado")

if __name__ == '__main__':
    reset_clean_database()
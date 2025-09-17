import requests
import json

def test_server():
    base_url = 'http://localhost:5000/api'
    
    print("Testando servidor...")
    
    try:
        # Teste de conexão
        response = requests.get(f'{base_url}/posts')
        print(f"Status da conexão: {response.status_code}")
        
        if response.status_code == 200:
            posts = response.json()
            print(f"Posts encontrados: {len(posts)}")
            print("✅ Servidor funcionando corretamente!")
        else:
            print("❌ Erro na conexão com o servidor")
            
    except requests.exceptions.ConnectionError:
        print("❌ Não foi possível conectar ao servidor")
        print("Certifique-se de que o backend está rodando em http://localhost:5000")
    except Exception as e:
        print(f"❌ Erro: {e}")

if __name__ == '__main__':
    test_server()
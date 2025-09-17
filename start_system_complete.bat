@echo off
echo ========================================
echo     TCC - SISTEMA INTEGRADO
echo ========================================
echo.
echo Iniciando sistema com banco de dados...
echo.

echo 1. Instalando dependencias do backend...
cd backend
pip install -r requirements.txt

echo.
echo 2. Resetando banco com dados de teste...
python reset_with_test_data.py

echo.
echo 3. Iniciando backend...
start "Backend TCC" cmd /k "python app.py"

echo.
echo 4. Aguardando backend inicializar...
timeout /t 5 /nobreak > nul

echo 5. Instalando dependencias do frontend...
cd ..
npm install

echo.
echo 6. Iniciando frontend...
start "Frontend TCC" cmd /k "npm run dev"

echo.
echo ========================================
echo SISTEMA TOTALMENTE INTEGRADO!
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Usuarios de teste:
echo - admin@test.com / 123456
echo - maria@test.com / 123456
echo - joao@test.com / 123456
echo - ana@test.com / 123456
echo.
echo Funcionalidades integradas:
echo - Login/Registro real
echo - Publicacao de conteudo
echo - Carregamento de posts
echo - Banco SQLite funcional
echo ========================================
pause
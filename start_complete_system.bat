@echo off
echo ========================================
echo     TCC - INICIALIZACAO COMPLETA
echo ========================================
echo.
echo Este script vai:
echo 1. Resetar o banco com dados de teste
echo 2. Iniciar o backend
echo 3. Abrir nova janela para o frontend
echo.
pause

echo Resetando banco de dados...
cd backend
python reset_with_test_data.py

echo.
echo Iniciando backend...
start "Backend TCC" cmd /k "python app.py"

echo.
echo Aguardando 3 segundos...
timeout /t 3 /nobreak > nul

echo Iniciando frontend...
cd ..
start "Frontend TCC" cmd /k "npm run dev"

echo.
echo ========================================
echo Sistema iniciado com sucesso!
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Usuarios de teste:
echo - admin@test.com / 123456
echo - maria@test.com / 123456
echo - joao@test.com / 123456
echo - ana@test.com / 123456
echo ========================================
pause
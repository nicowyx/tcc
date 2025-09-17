@echo off
echo ========================================
echo        SISTEMA TCC - INICIALIZACAO
echo ========================================
echo.
echo Escolha uma opcao:
echo 1. Iniciar Backend
echo 2. Iniciar Frontend  
echo 3. Resetar Banco com Dados de Teste
echo 4. Resetar Banco Limpo
echo 5. Sair
echo.
set /p opcao="Digite sua opcao (1-5): "

if "%opcao%"=="1" (
    echo Iniciando Backend...
    cd backend
    python app.py
    pause
) else if "%opcao%"=="2" (
    echo Iniciando Frontend...
    npm run dev
    pause
) else if "%opcao%"=="3" (
    echo Resetando banco com dados de teste...
    cd backend
    python reset_with_test_data.py
    pause
) else if "%opcao%"=="4" (
    echo Resetando banco limpo...
    cd backend
    python reset_clean_db.py
    pause
) else if "%opcao%"=="5" (
    echo Saindo...
    exit
) else (
    echo Opcao invalida!
    pause
    goto :eof
)
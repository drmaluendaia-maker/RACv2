@echo off
title Servidor de Triage

echo Verificando e instalando dependencias...
call npm install
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ======================================================
    echo  ERROR: No se pudieron instalar las dependencias.
    echo  Asegurate de tener Node.js instalado y conexion a internet.
    echo ======================================================
    echo.
    pause
    exit
)

echo.
echo Iniciando servidor...
echo.

rem Ejecuta el servidor y mantiene la ventana abierta para ver los logs y errores.
cmd /k "node servidor.js"
@echo off
setlocal enabledelayedexpansion

REM nombre base del proyecto
set PROJECT_DIR=src

REM lista de subdirectorios
set DIRS=api components layouts pages routes store hooks utils types styles

echo ============================================
echo CREACION DE ESTRUCTURA DE DIRECTORIOS
echo Proyecto: %PROJECT_DIR%
echo ============================================

REM crear directorio base si no existe
if not exist "%PROJECT_DIR%" (
    mkdir "%PROJECT_DIR%"
    echo [OK] Directorio base "%PROJECT_DIR%" creado.
) else (
    echo [INFO] Directorio base "%PROJECT_DIR%" ya existe.
)

REM recorrer lista de subdirectorios
for %%d in (%DIRS%) do (
    if not exist "%PROJECT_DIR%\%%d" (
        mkdir "%PROJECT_DIR%\%%d"
        echo [OK] Subdirectorio "%%d" creado dentro de "%PROJECT_DIR%".
    ) else (
        echo [INFO] Subdirectorio "%%d" ya existe dentro de "%PROJECT_DIR%".
    )
)

REM crear archivos principales
set FILES=App.tsx main.tsx
for %%f in (%FILES%) do (
    if not exist "%PROJECT_DIR%\%%f" (
        type nul > "%PROJECT_DIR%\%%f"
        echo [OK] Archivo "%%f" creado en "%PROJECT_DIR%".
    ) else (
        echo [INFO] Archivo "%%f" ya existe en "%PROJECT_DIR%".
    )
)

echo ============================================
echo ESTRUCTURA COMPLETA
echo ============================================
tree %PROJECT_DIR% /F

echo.
echo [FINALIZADO] La estructura de directorios y archivos ha sido creada.
pause
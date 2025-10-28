#!/bin/bash

# 🚀 Script de Comandos Rápidos para AngerTrack

echo "================================"
echo "  📊 AngerTrack - Registro de Enojo"
echo "================================"
echo ""
echo "Selecciona una opción:"
echo ""
echo "1. 📱 Probar en Expo Go (recomendado para testing rápido)"
echo "2. 📦 Crear APK para instalar en Android"
echo "3. 🧹 Limpiar cache y reiniciar"
echo "4. 🔧 Reinstalar dependencias"
echo "5. ❌ Salir"
echo ""
read -p "Opción (1-5): " option

case $option in
  1)
    echo ""
    echo "🚀 Iniciando app en modo desarrollo..."
    echo "👉 Abre Expo Go en tu celular y escanea el QR"
    echo ""
    npm start
    ;;
  2)
    echo ""
    echo "📦 Creando APK para Android..."
    echo ""
    echo "⚠️  Primero necesitas:"
    echo "   1. Instalar EAS CLI: sudo npm install -g eas-cli"
    echo "   2. Iniciar sesión: eas login"
    echo ""
    read -p "¿Ya hiciste estos pasos? (s/n): " ready
    if [ "$ready" = "s" ] || [ "$ready" = "S" ]; then
      echo ""
      echo "🏗️  Iniciando build del APK..."
      echo "⏱️  Esto tomará 5-15 minutos..."
      eas build -p android --profile apk
    else
      echo ""
      echo "👉 Ejecuta estos comandos primero:"
      echo "   sudo npm install -g eas-cli"
      echo "   eas login"
      echo ""
      echo "Luego vuelve a ejecutar este script."
    fi
    ;;
  3)
    echo ""
    echo "🧹 Limpiando cache..."
    npm start -- --clear
    ;;
  4)
    echo ""
    echo "🔧 Reinstalando dependencias..."
    rm -rf node_modules package-lock.json
    npm install
    echo "✅ Dependencias reinstaladas"
    ;;
  5)
    echo ""
    echo "👋 ¡Hasta luego!"
    exit 0
    ;;
  *)
    echo ""
    echo "❌ Opción inválida"
    exit 1
    ;;
esac

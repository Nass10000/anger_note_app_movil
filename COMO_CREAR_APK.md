# 🚀 Guía Rápida para Crear el APK

## Paso 1: Verificar instalación
```bash
cd /Users/gabyaybar/Desktop/angertrack-simple
npm install
```

## Paso 2: Instalar EAS CLI globalmente
```bash
npm install -g eas-cli
```
**Nota**: Si tienes error de permisos en Mac, usa:
```bash
sudo npm install -g eas-cli
```

## Paso 3: Iniciar sesión en Expo
```bash
eas login
```
- Si no tienes cuenta, crea una en https://expo.dev/signup
- Usa tu email y contraseña para iniciar sesión

## Paso 4: Construir el APK
```bash
npm run build:apk
```
O directamente:
```bash
eas build -p android --profile apk
```

## Paso 5: Esperar y descargar
- El proceso toma entre 5-15 minutos
- Recibirás un enlace para descargar el APK
- También puedes verlo en: https://expo.dev

## Paso 6: Instalar en tu celular
1. Descarga el APK en tu teléfono Android
2. Habilita "Instalar apps desconocidas" en Configuración
3. Abre el archivo APK y confirma la instalación
4. ¡Listo para usar!

## 🎯 Alternativa: Probar sin compilar
Si quieres probar la app primero sin crear el APK:

1. Instala Expo Go en tu celular desde Play Store
2. Ejecuta:
```bash
npm start
```
3. Escanea el código QR que aparece con la app Expo Go

## ⚡ Comandos Útiles

- Ver logs: `npm start`
- Limpiar cache: `npm start -- --clear`
- Build local (requiere Android Studio): `eas build -p android --profile apk --local`

---

**Nota**: La primera vez que construyas con EAS Build, puede que te pida configurar algunas cosas adicionales. Solo sigue las instrucciones en pantalla.

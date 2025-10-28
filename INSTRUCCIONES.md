# 📊 Registro de Enojo - Instrucciones

## Descripción
App móvil para Android que te permite registrar tu nivel de enojo del 1 al 10 en cualquier momento del día y llevar estadísticas por:
- Día actual
- Últimos 3 meses
- Últimos 2 semestres (6 meses cada uno)
- Último año completo

## 🚀 Características
- Registro ilimitado de niveles de enojo (1-10)
- Múltiples registros por día
- Promedios automáticos por período
- Gráficos de barras con colores según intensidad:
  - 🟢 Verde (1-3): Bajo
  - 🟡 Naranja (4-6): Medio
  - 🔴 Rojo (7-10): Alto
- Base de datos local SQLite
- Interfaz moderna y fácil de usar

## 📱 Cómo crear el APK

### Opción 1: Usando EAS Build (Recomendado)

1. **Instalar EAS CLI globalmente** (si no lo tienes):
```bash
npm install -g eas-cli
```

2. **Iniciar sesión en Expo**:
```bash
eas login
```

3. **Configurar el proyecto** (si es la primera vez):
```bash
eas build:configure
```

4. **Construir el APK**:
```bash
eas build -p android --profile apk
```

5. **Esperar a que se complete** el build en la nube de Expo (toma 5-15 minutos)

6. **Descargar el APK** desde el link que te proporciona o desde https://expo.dev/accounts/[tu-usuario]/projects/angertrack-simple/builds

### Opción 2: Build local (Más rápido si tienes Android Studio)

1. **Instalar Android Studio** y configurar el SDK de Android

2. **Instalar dependencias**:
```bash
npm install
```

3. **Construir localmente**:
```bash
eas build -p android --profile apk --local
```

## 🔧 Desarrollo

### Instalar dependencias
```bash
npm install
```

### Iniciar en modo desarrollo
```bash
npm start
```

### Ejecutar en emulador/dispositivo Android
```bash
npm run android
```

## 📦 Estructura del Proyecto

```
angertrack-simple/
├── App.tsx                 # Componente principal
├── src/
│   ├── db.ts              # Lógica de base de datos SQLite
│   └── components/
│       └── BarChart.tsx   # Componente de gráfico de barras
├── assets/                # Íconos y splash screen
├── app.json              # Configuración de Expo
├── eas.json              # Configuración de EAS Build
└── package.json          # Dependencias
```

## 🎯 Uso de la App

1. **Registrar enojo**: Ingresa un número del 1 al 10 y presiona "Registrar"
2. **Ver estadísticas**: Desplázate hacia abajo para ver:
   - Resumen del día actual
   - Promedios de los últimos 3 meses
   - Promedios de los últimos 2 semestres
   - Promedios del último año
3. **Registros ilimitados**: Puedes registrar tu enojo tantas veces como quieras en el día

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework móvil
- **Expo**: Plataforma de desarrollo
- **TypeScript**: Tipado estático
- **expo-sqlite**: Base de datos local
- **EAS Build**: Sistema de compilación

## 📝 Notas

- Los datos se guardan localmente en tu dispositivo
- No requiere conexión a internet para funcionar
- Los datos persisten entre sesiones
- Puedes desinstalar y reinstalar la app, pero perderás los datos

## 🐛 Solución de Problemas

### Si el build falla:
1. Verifica que tienes cuenta en Expo
2. Asegúrate de estar logueado con `eas login`
3. Revisa que el archivo `eas.json` existe
4. Intenta de nuevo con `eas build -p android --profile apk --clear-cache`

### Si la app no funciona:
1. Asegura que tienes Android 5.0 o superior
2. Permite permisos de instalación de apps desconocidas
3. Reinicia el dispositivo después de instalar

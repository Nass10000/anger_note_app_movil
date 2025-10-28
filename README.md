# AngerTrack (Simple)

App minimal para registrar **ira (0–10)** con registros infinitos y ver estadísticas:
- **Hoy**: promedio del día (con barrita).
- **Últimos 3 meses**: promedio mensual.
- **Último año**: promedio mensual.

## Requisitos
- Node.js LTS, Expo CLI (via `npx expo`), EAS CLI.

## Instalar
```bash
npm i
```

> Si creas el proyecto desde cero con `npx create-expo-app`, copia estos archivos sobre el esqueleto.

## Ejecutar
```bash
npm run start
# o
npm run android
```

## Construir APK (EAS)
1. Inicia sesión `npx expo login` (si aplica).
2. Configura `eas.json`.
3. Ejecuta:
```bash
npm run build:apk
```

## Estructura
- `App.tsx`: pantalla única (input 0–10, Registrar, barras).
- `src/db.ts`: SQLite (tabla `entries` y consultas).
- `src/components/BarChart.tsx`: barras sin librerías.

---
Generado: 2025-10-28

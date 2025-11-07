# Anger Note

Aplicación móvil orientada al registro y análisis de niveles de ira. Permite al usuario documentar su estado emocional, visualizar estadísticas y acceder a herramientas de autorregulación. El objetivo es fomentar la autoconciencia emocional mediante un seguimiento estructurado y minimalista.

## Características principales

- Registro de nivel de ira con escala numérica.
- Almacenamiento de fecha y hora por evento.
- Visualización estadística diaria, semanal y mensual.
- Módulo de herramientas para manejo emocional.
- Persistencia local de datos (sin conexión requerida).

## Estructura del proyecto

- `src/` – Código fuente principal.  
- `components/` – Componentes reutilizables de interfaz.  
- `screens/` – Pantallas de registro, estadísticas y herramientas.  
- `assets/` – Recursos gráficos y multimedia.  
- `package.json` – Dependencias y scripts del proyecto.

## Tecnologías

- **Framework:** React Native / Expo (según configuración del entorno).  
- **Lenguaje:** JavaScript / TypeScript.  
- **Almacenamiento:** AsyncStorage / SQLite.  
- **Gráficos:** librería de visualización (ChartKit, Victory, u otra).  

## Instalación y ejecución

```bash
git clone https://github.com/Nass10000/anger_note_aplicacion_movil.git
cd anger_note_aplicacion_movil
npm install
npm start

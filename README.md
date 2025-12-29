# Music Games - React + TypeScript

Proyecto de juegos musicales desarrollado con React, TypeScript, Vite y TailwindCSS.

## 🎮 Juegos Disponibles

- **Adivina la Canción**: Lee fragmentos de letras y adivina la canción correcta (5 rondas por artista)
- **Crucigrama Musical**: _(Próximamente)_

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js v16 o superior
- npm o yarn

### Configuración

1. **Instalar dependencias**:

```bash
npm install
```

2. **Configurar variables de entorno**:

   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega tu API key de Last.fm:

   ```
   VITE_LASTFM_API_KEY=tu_api_key_aqui
   ```

   - **Obtener API Key**: https://www.last.fm/api/account/create

3. **Ejecutar en modo desarrollo**:

```bash
npm run dev
```

4. **Compilar para producción**:

```bash
npm run build
```

## 🎵 APIs Utilizadas

- **Last.fm API**: Para obtener información de artistas y canciones
- **Lyrics.ovh**: Para obtener letras de canciones (sin autenticación requerida)

## 📁 Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
├── features/          # Features por juego
│   └── guess-song/    # Juego "Adivina la Canción"
├── hooks/             # Custom hooks
├── pages/             # Páginas principales
├── services/          # Servicios API
├── types/             # Tipos TypeScript
└── utils/             # Utilidades
```

## 🛠️ Tecnologías

- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Last.fm API
- Lyrics.ovh API

## 📝 Características

- ✅ Arquitectura limpia y modular
- ✅ TypeScript con tipos estrictos
- ✅ Integración con APIs musicales reales
- ✅ **Búsqueda de artistas en tiempo real**
- ✅ Sistema de 5 rondas por artista
- ✅ Opciones de canciones no repetidas
- ✅ Feedback visual inmediato
- ✅ Responsive design
- ✅ Caché de respuestas API
- ✅ Variables de entorno para configuración segura

## 🎯 Cómo Jugar

1. **Busca o selecciona** un artista (búsqueda en tiempo real o artistas sugeridos)
2. Lee el fragmento de letra mostrado
3. Selecciona la canción correcta de las opciones
4. Completa las 5 rondas
5. Ve tu puntuación final y elige:
   - Jugar de nuevo con el mismo artista
   - Buscar/seleccionar otro artista
   - Volver al menú principal

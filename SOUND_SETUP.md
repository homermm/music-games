# Instrucciones para Agregar Sonidos

Si deseas agregar efectos de sonido al juego, sigue estos pasos:

## Opción 1: Agregar archivos de sonido propios

1. Crea una carpeta `public/sounds/` en la raíz del proyecto
2. Agrega dos archivos de audio:

   - `correct.mp3` - Sonido para respuesta correcta
   - `wrong.mp3` - Sonido para respuesta incorrecta

3. Los sonidos se reproducirán automáticamente al responder

## Opción 2: Usar sonidos de bibliotecas gratuitas

Puedes descargar sonidos gratuitos de:

- **Freesound.org**: https://freesound.org/
- **Zapsplat**: https://www.zapsplat.com/
- **Mixkit**: https://mixkit.co/free-sound-effects/

Busca por "correct", "success", "wrong", "error", etc.

## Opción 3: Desactivar sonidos temporalmente

Si no tienes archivos de sonido aún, el juego funcionará sin problemas.
Solo verás un mensaje en la consola del navegador: "Sound play failed"

## Nota

El código ya está preparado para reproducir sonidos en `GamePlay.tsx`:

```typescript
const audio = new Audio(
  isCorrect ? "/sounds/correct.mp3" : "/sounds/wrong.mp3"
);
audio.play().catch((e) => console.log("Sound play failed:", e));
```

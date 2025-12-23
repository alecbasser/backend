# Diagnóstico: Video No Se Carga

## Problema Observado

La página `/live/` está en blanco y el video no se carga. Los logs muestran:
- ✅ SDK de Amazon IVS cargado
- ✅ Producto cargado
- ✅ Sistema de polling funcionando
- ❌ **NO hay mensaje "Iniciando player" o "Iniciando HLS nativo"**
- ❌ **El video no se inicializa**

## Causa Probable

El código JavaScript verifica si `config.playbackUrl` está configurado antes de inicializar el player:

```javascript
if (!config.playbackUrl || config.playbackUrl.trim() === '') {
    showError('No se ha configurado la URL de reproducción...');
    return;
}
```

**Si el playback URL está vacío, el player nunca se inicializa.**

## Solución

### 1. Verificar Playback URL en WordPress

1. Ve a **WordPress Admin → Streaming IVS**
2. Busca el campo **"Playback URL"** o **"URL de Reproducción"**
3. Verifica que tenga una URL válida de Amazon IVS (debe terminar en `.m3u8`)

Ejemplo de URL válida:
```
https://1234567890.us-east-1.playback.live-video.net/api/video/v1/us-east-1.1234567890.channel.abc123.m3u8
```

### 2. Si el Playback URL está vacío

1. Ve a **Amazon IVS Console**
2. Selecciona tu canal
3. Copia la **Playback URL**
4. Pégalo en **WordPress Admin → Streaming IVS → Playback URL**
5. Guarda los cambios
6. Recarga `/live/`

### 3. Verificar en la Consola del Navegador

Abre la consola del navegador (F12) y ejecuta:

```javascript
console.log('Playback URL:', streamingIVS.playbackUrl);
```

**Si está vacío o undefined:**
- El playback URL no está configurado en WordPress
- Necesitas configurarlo en WordPress Admin

**Si tiene un valor:**
- El problema es otro (posiblemente el canal no está transmitiendo)

### 4. Verificar que el Canal Esté Transmitiendo

Incluso si el playback URL está configurado, el video no se cargará si:
- El canal de Amazon IVS no está transmitiendo
- El canal está inactivo
- La URL es incorrecta

**Para verificar:**
1. Abre el playback URL directamente en el navegador
2. Deberías ver un archivo `.m3u8` (playlist de HLS)
3. Si ves un error 404, el canal no está transmitiendo o la URL es incorrecta

## Pasos de Verificación Rápida

1. ✅ ¿Playback URL configurado en WordPress? → Si no, configúralo
2. ✅ ¿Playback URL válido (termina en .m3u8)? → Si no, corrígelo
3. ✅ ¿Canal transmitiendo? → Abre la URL directamente para verificar
4. ✅ ¿Recargaste la página después de configurar? → Recarga con Ctrl+F5

## Mensajes de Error Esperados

Si el playback URL está vacío, deberías ver en la consola:
```
No se ha configurado la URL de reproducción. Ve a WordPress Admin → Streaming IVS para configurarla.
```

Si no ves este mensaje pero el video no carga, el problema puede ser:
- El código no está llegando a esa verificación
- Hay un error JavaScript previo que está bloqueando la ejecución


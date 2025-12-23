# Debug: Actualizaciones en Tiempo Real No Funcionan

## Problema

Las actualizaciones de overlay/frame no se ven en tiempo real. Se necesita refrescar la página para ver los cambios.

## Diagnóstico

### 1. Verificar que la App Android esté usando el Backend

**En la app Android:**
1. Ve a **Configuración**
2. Verifica que **"URL del Backend Node.js"** esté configurada:
   ```
   https://backend-production-8b21.up.railway.app
   ```
3. Si no está configurada, agrégalo y guarda

### 2. Verificar Logs del Backend

**En Railway (o donde esté desplegado el backend):**
1. Ve a los logs del backend
2. Cuando actualices una imagen desde la app, deberías ver:
   ```
   📥 Recibida petición para actualizar overlay: {...}
   📢 Notificando cambio de overlay vía WebSocket: {...}
   📢 Notificación enviada a X cliente(s): overlay_changed
   ```

**Si NO ves estos logs:**
- La app Android NO está llamando al backend
- Verifica que la URL del backend esté configurada en la app

### 3. Verificar Consola del Navegador

**En el navegador (F12 → Console):**
1. Abre `https://videoventa.online/live/`
2. Cuando actualices una imagen desde la app, deberías ver:
   ```
   📨 Mensaje WebSocket recibido: overlay_changed {...}
   📢 Overlay actualizado vía WebSocket {...}
   🔄 Actualizando overlay desde datos: {...}
   ✅ Overlay actualizado en la UI
   ```

**Si NO ves estos mensajes:**
- El WebSocket no está recibiendo las notificaciones
- O el backend no está notificando

### 4. Verificar Conexión WebSocket

**En la consola del navegador, verifica:**
```javascript
// Deberías ver:
✅ WebSocket conectado
✅ Suscrito a actualizaciones en tiempo real
```

**Si NO ves esto:**
- El WebSocket no está conectado
- Verifica que la URL del backend esté configurada en WordPress

## Pasos de Verificación

### Paso 1: Verificar Configuración en la App Android

1. Abre la app Android
2. Ve a **Configuración**
3. Verifica que **"URL del Backend Node.js"** tenga:
   ```
   https://backend-production-8b21.up.railway.app
   ```
4. Guarda si es necesario

### Paso 2: Probar Actualización

1. Desde la app Android, sube una imagen de overlay
2. Mueve la imagen (arrastra)
3. **En los logs del backend** deberías ver:
   - `📥 Recibida petición para actualizar overlay`
   - `📢 Notificando cambio de overlay vía WebSocket`
   - `📢 Notificación enviada a X cliente(s)`

4. **En la consola del navegador** deberías ver:
   - `📨 Mensaje WebSocket recibido: overlay_changed`
   - `📢 Overlay actualizado vía WebSocket`
   - `🔄 Actualizando overlay desde datos`
   - `✅ Overlay actualizado en la UI`

### Paso 3: Si No Funciona

**Si NO ves logs en el backend:**
- La app NO está llamando al backend
- Verifica que la URL del backend esté configurada en la app
- Verifica los logs de la app Android (Logcat)

**Si ves logs en el backend pero NO en el navegador:**
- El WebSocket no está conectado
- Verifica la conexión WebSocket en la consola del navegador
- Verifica que la URL del backend esté configurada en WordPress

## Solución Rápida

1. **Verifica en la app Android:**
   - Configuración → URL del Backend Node.js → Debe tener la URL de Railway

2. **Verifica en WordPress:**
   - WordPress Admin → Streaming IVS → URL del Backend Node.js → Debe tener la URL de Railway

3. **Recarga la página `/live/`** y verifica la consola del navegador

4. **Prueba actualizar una imagen** desde la app y verifica los logs

## Logs Esperados

### Backend (Railway):
```
📥 Recibida petición para actualizar overlay: { imageUrl: '...', positionX: 0.1, ... }
📢 Notificando cambio de overlay vía WebSocket: { type: 'overlay_changed', overlay: {...} }
📢 Notificación enviada a 1 cliente(s): overlay_changed
```

### Navegador (Consola):
```
📨 Mensaje WebSocket recibido: overlay_changed { overlay: {...} }
📢 Overlay actualizado vía WebSocket { imageUrl: '...', positionX: 0.1, ... }
🔄 Actualizando overlay desde datos: { imageUrl: '...', positionX: 0.1, ... }
📍 Posición overlay: { posX: 100, posY: 50, width: 200, height: 200, ... }
✅ Overlay actualizado en la UI
```


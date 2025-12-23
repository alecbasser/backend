# Verificación: App Android Usando Backend Node.js

## 🔍 Cómo Verificar que la App Está Usando el Backend

### Paso 1: Verificar Configuración en la App

1. **Abre la app Android**
2. **Ve a Configuración**
3. **Verifica que "URL del Backend Node.js" tenga:**
   ```
   https://backend-production-8b21.up.railway.app
   ```
4. **Si está vacío o incorrecto:**
   - Agrégalo o corrígelo
   - Guarda la configuración

### Paso 2: Verificar Logs de la App Android

**En Android Studio (Logcat):**

Cuando actualices una imagen o muevas el overlay, deberías ver:

**Si el backend está configurado:**
```
🔵 Usando backend Node.js para actualizar overlay: https://backend-production-8b21.up.railway.app
🔵 URL del backend: https://backend-production-8b21.up.railway.app/api/overlay/set
Overlay actualizado vía backend Node.js (WebSocket notificado)
```

**Si el backend NO está configurado:**
```
⚠️ Backend URL no configurada, usando WordPress directamente (sin WebSocket)
🔴 URL de WordPress: https://videoventa.online/wp-json/streaming-ivs/v1/set-overlay
```

### Paso 3: Verificar Logs del Backend (Railway)

**En Railway Dashboard → Logs:**

Cuando actualices desde la app, deberías ver:
```
📥 Recibida petición para actualizar overlay: { imageUrl: '...', positionX: 0.1, ... }
📢 Notificando cambio de overlay vía WebSocket: { type: 'overlay_changed', overlay: {...} }
📢 Notificación enviada a 1 cliente(s): overlay_changed
```

**Si NO ves estos logs:**
- La app NO está llamando al backend
- Verifica que la URL del backend esté configurada en la app

### Paso 4: Verificar Consola del Navegador

**En el navegador (F12 → Console):**

Cuando actualices desde la app, deberías ver:
```
📨 Mensaje WebSocket recibido: overlay_changed { overlay: {...} }
📢 Overlay actualizado vía WebSocket { imageUrl: '...', positionX: 0.1, ... }
🔄 Actualizando overlay desde datos: { imageUrl: '...', positionX: 0.1, ... }
📍 Posición overlay: { posX: 100, posY: 50, width: 200, height: 200, ... }
✅ Overlay actualizado en la UI
```

## 🚨 Problemas Comunes

### Problema 1: No veo logs del backend

**Causa:** La app no está llamando al backend

**Solución:**
1. Verifica que la URL del backend esté configurada en la app
2. Verifica los logs de la app (Logcat) para ver qué URL está usando
3. Si ves "⚠️ Backend URL no configurada", agrega la URL en Configuración

### Problema 2: Veo logs del backend pero no en el navegador

**Causa:** El WebSocket no está recibiendo las notificaciones

**Solución:**
1. Verifica que el WebSocket esté conectado (deberías ver "✅ WebSocket conectado")
2. Verifica que la URL del backend esté configurada en WordPress
3. Recarga la página `/live/`

### Problema 3: La app muestra "Backend URL no configurada"

**Causa:** La URL del backend no está guardada en la app

**Solución:**
1. Ve a Configuración en la app
2. Agrega la URL del backend: `https://backend-production-8b21.up.railway.app`
3. Guarda la configuración
4. Prueba de nuevo

## 📋 Checklist de Verificación

- [ ] URL del backend configurada en la app Android
- [ ] Logs de la app muestran "🔵 Usando backend Node.js"
- [ ] Logs del backend muestran "📥 Recibida petición"
- [ ] Logs del backend muestran "📢 Notificación enviada"
- [ ] Consola del navegador muestra "📨 Mensaje WebSocket recibido"
- [ ] Consola del navegador muestra "✅ Overlay actualizado en la UI"

## 🔧 Comandos Útiles

### Ver logs de la app Android (Logcat):
```
Filtro: WordPressApiHelper
```

### Ver logs del backend (Railway):
```
Railway Dashboard → Tu Proyecto → Logs
```

### Ver consola del navegador:
```
F12 → Console
```


# Error: playback_auth_error en Amazon IVS

## 🔴 Problema

Al intentar reproducir el streaming, recibes el error:
```json
{
  "error": "playback_auth_error",
  "error_code": "playback_auth_error",
  "type": "error"
}
```

## 🔍 Causas Posibles

### 1. **Canal con Autenticación Habilitada**
El canal de Amazon IVS tiene restricciones de autenticación activadas.

### 2. **Canal Inactivo o Eliminado**
El canal puede estar inactivo, eliminado o no disponible.

### 3. **Restricciones de IP/Región**
El canal puede tener restricciones geográficas o de IP.

### 4. **Token de Autenticación Requerido**
El canal requiere un token JWT para acceder al playback.

## ✅ Soluciones

### Solución 1: Verificar Configuración del Canal en AWS

1. **Ve a AWS Console:**
   - https://console.aws.amazon.com/ivs
   
2. **Selecciona tu canal:**
   - Busca el canal con ID: `z0wMQq0EXbfZ`
   
3. **Revisa la configuración:**
   - Ve a la pestaña **"Playback"**
   - Verifica si hay **"Playback restrictions"** activadas
   - Verifica si hay **"Authorized viewers"** configurados
   
4. **Desactiva restricciones (si están activas):**
   - Si hay restricciones de autenticación, desactívalas temporalmente para probar
   - O configura los tokens/permisos necesarios

### Solución 2: Verificar que el Canal Esté Activo

1. **En AWS Console → IVS → Channels:**
   - Verifica que el canal esté en estado **"Active"**
   - Si está "Idle" o "Offline", el canal no está transmitiendo
   
2. **Verifica que haya una transmisión activa:**
   - El error puede aparecer si no hay nadie transmitiendo al canal

### Solución 3: Verificar Playback URL

La URL que estás usando:
```
https://78f8fda0de45.us-east-1.playback.live-video.net/api/video/v1/us-east-1.810353972471.channel.z0wMQq0EXbfZ.m3u8
```

**Verifica en AWS Console:**
1. Ve a tu canal
2. Pestaña **"Playback"**
3. Copia la **Playback URL** exacta que aparece ahí
4. Compara con la que estás usando

### Solución 4: Configurar Autenticación (Si es Necesaria)

Si el canal requiere autenticación:

1. **Obtén un token JWT** desde AWS
2. **Agrega el token a la URL:**
   ```
   https://...m3u8?token=TU_TOKEN_AQUI
   ```

3. **O configura el canal sin autenticación:**
   - En AWS Console → Canal → Playback
   - Desactiva "Authorized viewers only"

## 🔧 Pasos de Diagnóstico

### 1. Verificar Estado del Canal

En AWS Console, verifica:
- ✅ Estado: **Active**
- ✅ Playback restrictions: **None** (o configuradas correctamente)
- ✅ Authorized viewers: **Disabled** (para pruebas)

### 2. Probar la URL Directamente

Abre la Playback URL directamente en el navegador:
```
https://78f8fda0de45.us-east-1.playback.live-video.net/api/video/v1/us-east-1.810353972471.channel.z0wMQq0EXbfZ.m3u8
```

**Si funciona:**
- El problema está en el código JavaScript del player

**Si NO funciona:**
- El problema está en la configuración del canal en AWS

### 3. Verificar en WordPress

1. Ve a **WordPress Admin → Streaming IVS**
2. Verifica que la **Playback URL** sea exactamente:
   ```
   https://78f8fda0de45.us-east-1.playback.live-video.net/api/video/v1/us-east-1.810353972471.channel.z0wMQq0EXbfZ.m3u8
   ```
3. Guarda los cambios
4. Recarga `/live/`

## 📋 Checklist de Verificación

- [ ] Canal está en estado "Active" en AWS
- [ ] No hay restricciones de autenticación activadas
- [ ] Playback URL es correcta (copiada desde AWS Console)
- [ ] Playback URL está configurada en WordPress
- [ ] Hay una transmisión activa al canal
- [ ] La URL funciona directamente en el navegador

## 🚨 Solución Rápida

**Si necesitas que funcione inmediatamente:**

1. Ve a AWS Console → IVS → Tu Canal
2. Pestaña **"Playback"**
3. **Desactiva todas las restricciones:**
   - Authorized viewers: **Disabled**
   - Playback restrictions: **None**
4. **Copia la Playback URL exacta**
5. **Pégala en WordPress Admin → Streaming IVS**
6. **Guarda y recarga `/live/`**

## 📝 Nota Importante

El error `playback_auth_error` **NO es un problema del código**, es un problema de **configuración del canal en AWS**. 

Asegúrate de que:
- El canal esté configurado correctamente en AWS
- No haya restricciones de autenticación activadas (a menos que las necesites)
- La Playback URL sea la correcta


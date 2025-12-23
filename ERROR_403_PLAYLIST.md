# Error 403 al Cargar Playlist de Amazon IVS

## 🔴 Problema

Al intentar reproducir el streaming, recibes un error **403 (Forbidden)** al cargar el archivo `.m3u8`:

```
Failed to load resource: the server responded with a status of 403
```

La URL que está fallando parece ser una playlist con token de autenticación:
```
sae12.playlist.live-video.net/v1/playlist/[TOKEN_MUY_LARGO].m3u8
```

## 🔍 Causas Posibles

### 1. **Token Expirado o Inválido**
El token de autenticación en la URL puede estar:
- Expirado
- Inválido
- Mal formateado

### 2. **Canal con Restricciones de Acceso**
El canal puede tener:
- Restricciones de IP
- Restricciones geográficas
- Requisitos de autenticación adicionales

### 3. **Playback URL Incorrecta**
La URL puede no ser la correcta para tu canal.

### 4. **Canal Inactivo o Eliminado**
El canal puede estar:
- Inactivo
- Eliminado
- No disponible

## ✅ Soluciones

### Solución 1: Verificar Playback URL en AWS Console

1. **Ve a AWS Console:**
   - https://console.aws.amazon.com/ivs
   
2. **Selecciona tu canal**
   
3. **Ve a la pestaña "Playback":**
   - Copia la **Playback URL** exacta que aparece ahí
   - **NO uses una URL con token** si no es necesaria
   
4. **Verifica el formato:**
   - Debe ser algo como: `https://xxx.playback.live-video.net/api/video/v1/.../xxx.m3u8`
   - O si tiene token: debe ser un token válido y no expirado

### Solución 2: Desactivar Restricciones de Autenticación

1. **En AWS Console → Tu Canal → Playback:**
   - Busca **"Authorized viewers only"**
   - **Desactívalo** (para pruebas)
   
2. **Verifica "Playback restrictions":**
   - Debe estar en **"None"**
   
3. **Obtén la Playback URL sin token:**
   - Debe ser una URL directa sin tokens de autenticación

### Solución 3: Actualizar Playback URL en WordPress

1. **Copia la Playback URL correcta desde AWS Console**
2. **Ve a WordPress Admin → Streaming IVS**
3. **Pega la URL en "Playback URL"**
4. **Asegúrate de que sea la URL completa:**
   ```
   https://78f8fda0de45.us-east-1.playback.live-video.net/api/video/v1/us-east-1.810353972471.channel.z0wMQq0EXbfZ.m3u8
   ```
5. **Guarda los cambios**
6. **Recarga `/live/`**

### Solución 4: Verificar que el Canal Esté Transmitiendo

El error 403 puede aparecer si:
- El canal no está transmitiendo
- El canal está inactivo
- No hay una transmisión activa

**Para verificar:**
1. Asegúrate de que haya una transmisión activa al canal
2. Verifica que el canal esté en estado "Active" en AWS Console

### Solución 5: Usar Playback URL Directa (Sin Token)

Si el canal no requiere autenticación, usa la URL directa:

**Formato correcto:**
```
https://[ACCOUNT_ID].us-east-1.playback.live-video.net/api/video/v1/us-east-1.[ACCOUNT_ID].channel.[CHANNEL_ID].m3u8
```

**Ejemplo:**
```
https://78f8fda0de45.us-east-1.playback.live-video.net/api/video/v1/us-east-1.810353972471.channel.z0wMQq0EXbfZ.m3u8
```

## 🔧 Pasos de Diagnóstico

### 1. Verificar en AWS Console

1. **Estado del canal:** Debe ser "Active"
2. **Playback restrictions:** Debe ser "None"
3. **Authorized viewers:** Debe estar desactivado (para pruebas)
4. **Playback URL:** Copia la URL exacta que aparece

### 2. Probar la URL Directamente

Abre la Playback URL directamente en el navegador (sin el token largo):

```
https://78f8fda0de45.us-east-1.playback.live-video.net/api/video/v1/us-east-1.810353972471.channel.z0wMQq0EXbfZ.m3u8
```

**Si funciona:**
- El problema es el token o la URL con token
- Usa la URL directa sin token

**Si NO funciona:**
- El problema está en la configuración del canal
- Verifica restricciones en AWS Console

### 3. Verificar en WordPress

1. **WordPress Admin → Streaming IVS**
2. **Verifica la Playback URL:**
   - Debe ser la URL directa (sin token largo)
   - Debe empezar con `https://`
   - Debe terminar en `.m3u8`
3. **Guarda y recarga**

## 📋 Checklist de Verificación

- [ ] Canal está en estado "Active" en AWS
- [ ] No hay restricciones de autenticación activadas
- [ ] Playback URL es la directa (sin token largo)
- [ ] Playback URL está configurada correctamente en WordPress
- [ ] Hay una transmisión activa al canal
- [ ] La URL funciona directamente en el navegador

## 🚨 Solución Rápida

**Para que funcione inmediatamente:**

1. **Ve a AWS Console → IVS → Tu Canal**
2. **Pestaña "Playback":**
   - Desactiva "Authorized viewers only"
   - Configura "Playback restrictions" en "None"
3. **Copia la Playback URL directa** (sin token)
4. **Pégala en WordPress Admin → Streaming IVS → Playback URL**
5. **Guarda y recarga `/live/`**

## 📝 Nota Importante

El error 403 **NO es un problema del código**, es un problema de:
- **Configuración del canal en AWS**
- **Token expirado o inválido**
- **Restricciones de acceso activadas**

**Recomendación:** Usa la Playback URL directa (sin token) si el canal no requiere autenticación. Esto es más simple y evita problemas de tokens expirados.

## 🔄 Diferencia entre URLs

### URL con Token (Puede dar 403):
```
sae12.playlist.live-video.net/v1/playlist/[TOKEN_MUY_LARGO].m3u8
```

### URL Directa (Recomendada):
```
https://78f8fda0de45.us-east-1.playback.live-video.net/api/video/v1/us-east-1.810353972471.channel.z0wMQq0EXbfZ.m3u8
```

**Usa la URL directa** si no necesitas autenticación.


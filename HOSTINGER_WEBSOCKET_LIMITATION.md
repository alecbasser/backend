# Limitación de WebSocket en Hostinger

## Confirmación de Hostinger

**Los planes Web y Cloud hosting compartido de Hostinger:**
- ✅ Permiten WebSocket **salientes** (desde tu app hacia otro servidor)
- ❌ **NO permiten WebSocket entrantes** (desde navegador hacia tu app)
- ✅ HTTP/HTTPS funciona normalmente (por eso el health check pasa)
- ❌ El upgrade a WebSocket desde el navegador es bloqueado por el proxy/load balancer

**Esto explica:**
- ✅ Por qué `/health` funciona (HTTP)
- ❌ Por qué `wss://.../ws` falla con código 1006 (WebSocket bloqueado)

## Soluciones

### Solución 1: Desplegar Backend en Railway (Recomendado - Gratis)

Railway soporta WebSocket entrantes sin configuración adicional.

**Pasos:**

1. **Crea cuenta en Railway:**
   - Ve a [railway.app](https://railway.app)
   - Inicia sesión con GitHub

2. **Crea nuevo proyecto:**
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Elige tu repositorio (o crea uno nuevo con el código del backend)

3. **Configura el proyecto:**
   - Railway detecta Node.js automáticamente
   - **Root Directory:** `backend` (si el backend está en una subcarpeta)
   - **Build Command:** `npm install` (automático)
   - **Start Command:** `npm start` (automático)

4. **Agrega Variables de Entorno:**
   - En Railway → Variables
   - Agrega:
     ```
     WORDPRESS_URL=https://videoventa.online
     WORDPRESS_USERNAME=alejandroarcila81@gmail.com
     WORDPRESS_APP_PASSWORD=OelT ONt3 F6Dn 7k1C Fh4D vlK1
     MAX_IMAGE_SIZE=5242880
     CACHE_TTL_PRODUCTS=300
     CACHE_TTL_OVERLAY=60
     ```
   - **NOTA:** No agregues `PORT`, Railway lo asigna automáticamente

5. **Obtén la URL:**
   - Railway te da una URL automática: `https://tu-app.railway.app`
   - O puedes configurar un dominio personalizado

6. **Actualiza WordPress:**
   - WordPress Admin → Streaming IVS
   - URL del Backend Node.js: `https://tu-app.railway.app`
   - Guarda

**Ventajas:**
- ✅ WebSocket funciona perfectamente
- ✅ Gratis para empezar ($5 crédito mensual)
- ✅ SSL automático
- ✅ Deploy automático desde Git
- ✅ Muy fácil de usar

### Solución 2: Usar VPS de Hostinger (Si tienes uno)

Si tienes un VPS de Hostinger, puedes:

1. **Instalar Node.js en el VPS:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Instalar PM2:**
   ```bash
   sudo npm install -g pm2
   ```

3. **Subir tu código y configurar:**
   - Sube el código del backend al VPS
   - Configura variables de entorno
   - Inicia con PM2

4. **Configurar Nginx como proxy:**
   - Configura Nginx para pasar WebSocket correctamente

### Solución 3: Mantener Polling (Funciona Ahora)

**El sistema ya funciona con polling:**
- ✅ Actualizaciones cada 2 segundos
- ✅ Todo funciona correctamente
- ⚠️ Solo no es tiempo real (pero es aceptable)

**No requiere cambios**, solo aceptar que las actualizaciones son cada 2 segundos en lugar de tiempo real.

## Recomendación

**Para producción:** Desplegar en Railway (gratis, fácil, WebSocket funciona)

**Para desarrollo/pruebas:** Mantener polling (ya funciona, no requiere cambios)

## Próximos Pasos

1. **Si eliges Railway:**
   - Te ayudo a configurarlo paso a paso
   - Es muy rápido (5-10 minutos)

2. **Si prefieres mantener polling:**
   - No necesitas hacer nada
   - El sistema ya funciona

3. **Si tienes VPS:**
   - Te ayudo a configurarlo en el VPS

## Verificación

Después de desplegar en Railway:

1. **Prueba health check:**
   ```
   https://tu-app.railway.app/health
   ```

2. **Prueba WebSocket:**
   - Abre consola del navegador
   - Ejecuta:
     ```javascript
     const ws = new WebSocket('wss://tu-app.railway.app/ws');
     ws.onopen = () => console.log('✅ Conectado!');
     ```
   - Deberías ver: `✅ Conectado!`

3. **Actualiza WordPress:**
   - Cambia la URL del backend a la de Railway
   - Abre `/live/` y verifica que WebSocket conecte


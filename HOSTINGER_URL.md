# URL del Backend en Hostinger

## URL del Backend Node.js

```
https://lightsteelblue-yak-683298.hostingersite.com/
```

## Verificación

### 1. Health Check
Prueba esta URL en tu navegador:
```
https://lightsteelblue-yak-683298.hostingersite.com/health
```

Deberías ver una respuesta JSON como:
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "services": {
    "http": "running",
    "websocket": "running"
  }
}
```

### 2. WebSocket
La URL de WebSocket es:
```
wss://lightsteelblue-yak-683298.hostingersite.com/ws
```
(Nota: usa `wss://` para WebSocket seguro con HTTPS)

## Configuración en WordPress

### Pasos:

1. **Ve a WordPress Admin:**
   - Inicia sesión en `https://videoventa.online/wp-admin`

2. **Navega a Streaming IVS:**
   - Menú lateral → **Streaming IVS**

3. **Configura el Backend:**
   - Busca la sección **"Configuración del Backend Node.js"**
   - En el campo **"URL del Backend Node.js"**, ingresa:
     ```
     https://lightsteelblue-yak-683298.hostingersite.com
     ```
   - **IMPORTANTE:** No agregues la barra final `/` al final

4. **Guarda los cambios:**
   - Haz clic en **"Guardar Configuración"**

## Variables de Entorno

Asegúrate de haber agregado estas variables en Hostinger:

```
WORDPRESS_URL=https://videoventa.online
WORDPRESS_USERNAME=alejandroarcila81@gmail.com
WORDPRESS_APP_PASSWORD=OelT ONt3 F6Dn 7k1C Fh4D vlK1
MAX_IMAGE_SIZE=5242880
CACHE_TTL_PRODUCTS=300
CACHE_TTL_OVERLAY=60
```

## Prueba Completa

### 1. Verifica el Backend:
```bash
# En el navegador o con curl:
https://lightsteelblue-yak-683298.hostingersite.com/health
```

### 2. Verifica en WordPress:
1. Ve a: `https://videoventa.online/live/`
2. Abre la consola del navegador (F12)
3. Deberías ver: `✅ WebSocket conectado`

### 3. Prueba la API:
```bash
# Obtener productos
https://lightsteelblue-yak-683298.hostingersite.com/api/products

# Obtener configuración de overlay
https://lightsteelblue-yak-683298.hostingersite.com/api/overlay/config
```

## Troubleshooting

### Si el health check no funciona:
- Verifica que el despliegue haya terminado en Hostinger
- Revisa los logs en hPanel
- Asegúrate de que las variables de entorno estén configuradas

### Si WebSocket no conecta:
- Verifica que la URL en WordPress sea correcta (sin `/` al final)
- Asegúrate de usar `https://` (no `http://`)
- Revisa la consola del navegador para ver errores

### Si hay errores CORS:
- El backend ya tiene CORS configurado
- Si persisten errores, verifica que el backend esté corriendo

## URLs Importantes

- **Backend API:** `https://lightsteelblue-yak-683298.hostingersite.com`
- **Health Check:** `https://lightsteelblue-yak-683298.hostingersite.com/health`
- **WebSocket:** `wss://lightsteelblue-yak-683298.hostingersite.com/ws`
- **WordPress Live:** `https://videoventa.online/live/`


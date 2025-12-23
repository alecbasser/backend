# Guía Específica para Hostinger

## Requisitos

- Plan Hostinger **Business** o **Cloud** (soportan Node.js)
- Acceso al hPanel

## Pasos Detallados

### 1. Preparar el Proyecto

Asegúrate de que tu `package.json` tenga el script `start`:

```json
{
  "scripts": {
    "start": "node src/server.js"
  }
}
```

### 2. Subir a Hostinger

#### Opción A: Desde GitHub (Recomendado)

1. Sube tu código a GitHub (si no lo has hecho)
2. En hPanel → Sitios web → Añadir sitio web
3. Selecciona "Aplicaciones Node.js"
4. Elige "Importar repositorio de Git"
5. Autoriza Hostinger con GitHub
6. Selecciona tu repositorio
7. **Configuración:**
   - **Directorio raíz:** `backend` (si tu backend está en una subcarpeta)
   - **Comando de build:** `npm install`
   - **Comando de inicio:** `npm start`
   - **Node.js versión:** 20.x (LTS)

#### Opción B: Subir ZIP

1. Comprime la carpeta `backend/` en un archivo ZIP
2. En hPanel → Sitios web → Añadir sitio web
3. Selecciona "Aplicaciones Node.js"
4. Elige "Subir los archivos de tu sitio web"
5. Sube el ZIP
6. Configura los mismos comandos que arriba

### 3. Configurar Variables de Entorno

En el hPanel de Hostinger, busca la sección "Variables de Entorno" o "Environment Variables" de tu aplicación Node.js:

```
WORDPRESS_URL=https://videoventa.online
WORDPRESS_USERNAME=alejandroarcila81@gmail.com
WORDPRESS_APP_PASSWORD=OelT ONt3 F6Dn 7k1C Fh4D vlK1
MAX_IMAGE_SIZE=5242880
CACHE_TTL_PRODUCTS=300
CACHE_TTL_OVERLAY=60
```

**IMPORTANTE:** No configures `PORT`, Hostinger lo asigna automáticamente.

### 4. Obtener la URL del Backend

Después del despliegue, Hostinger te dará una URL como:
- `https://tu-app.hostingerapp.com`
- O puedes configurar un subdominio: `https://backend.videoventa.online`

### 5. Configurar en WordPress

1. Ve a WordPress Admin → Streaming IVS
2. En "Configuración del Backend Node.js"
3. Ingresa la URL que Hostinger te proporcionó
4. Guarda los cambios

### 6. Verificar que Funciona

1. Abre en el navegador: `https://tu-backend-url/health`
2. Deberías ver: `{"status":"ok",...}`

3. Abre `/live/` en tu WordPress
4. Abre la consola del navegador (F12)
5. Deberías ver: `✅ WebSocket conectado`

## Troubleshooting

### Error: "Application failed to start"
- Verifica que `package.json` tenga el script `start`
- Revisa los logs en hPanel
- Asegúrate de que todas las dependencias estén en `package.json`

### Error: "Cannot connect to WebSocket"
- Verifica que la URL del backend en WordPress sea correcta
- Asegúrate de usar `https://` (no `http://`)
- Verifica que el backend esté corriendo en hPanel

### Error: "Module not found"
- Asegúrate de que `npm install` se ejecute en el build
- Verifica que todas las dependencias estén en `package.json`

### El backend se detiene
- Hostinger mantiene el proceso corriendo automáticamente
- Si se detiene, revisa los logs en hPanel
- Verifica que no haya errores en el código

## Notas Importantes

1. **Puerto:** Hostinger asigna el puerto automáticamente, siempre usa `process.env.PORT`
2. **HTTPS:** Hostinger proporciona SSL automático
3. **WebSocket:** Funciona automáticamente con HTTPS
4. **Logs:** Revisa los logs en hPanel si hay problemas

## Soporte

Si tienes problemas:
1. Revisa los logs en hPanel
2. Verifica la documentación de Hostinger sobre Node.js
3. Contacta al soporte de Hostinger mencionando que es una app Node.js


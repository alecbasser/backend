# Configuración Específica para Hostinger hPanel

## Configuración Actual

Veo que has seleccionado:
- **Framework Preset:** Express ✅ (Correcto, aunque nuestro proyecto no usa el preset)
- **Node Version:** 22.x ⚠️ (Funciona, pero 20.x LTS es más estable)

## Configuración Recomendada

### 1. Framework Preset
- **Express** está bien, pero nuestro proyecto ya tiene Express configurado manualmente
- El preset de Express puede crear archivos adicionales que no necesitamos
- **Recomendación:** Si hay opción "Custom" o "Node.js", úsala
- Si solo hay Express, está bien, solo ignora los archivos que cree

### 2. Node.js Version
- **22.x** funciona, pero puede tener problemas de compatibilidad
- **Recomendación:** Cambia a **20.x (LTS)** si está disponible
- LTS = Long Term Support = Más estable y compatible

### 3. Configuración de Build y Start

Después de seleccionar Express, Hostinger te pedirá configurar:

#### Directorio Raíz:
```
backend
```
(Si tu backend está en una subcarpeta llamada `backend`)

O si subiste solo los archivos del backend:
```
.
```
(raíz del proyecto)

#### Comando de Build:
```bash
npm install
```

#### Comando de Inicio:
```bash
npm start
```

#### Puerto:
- **NO configures manualmente**
- Hostinger lo asigna automáticamente
- El código ya usa `process.env.PORT`

### 4. Variables de Entorno

En la sección de "Variables de Entorno" o "Environment Variables", agrega:

```
WORDPRESS_URL=https://videoventa.online
WORDPRESS_USERNAME=alejandroarcila81@gmail.com
WORDPRESS_APP_PASSWORD=OelT ONt3 F6Dn 7k1C Fh4D vlK1
MAX_IMAGE_SIZE=5242880
CACHE_TTL_PRODUCTS=300
CACHE_TTL_OVERLAY=60
```

**IMPORTANTE:** No agregues `PORT`, Hostinger lo configura automáticamente.

### 5. Estructura de Archivos

Asegúrate de que Hostinger vea esta estructura:

```
tu-proyecto/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── .env (opcional, mejor usar variables de entorno del hPanel)
```

### 6. Verificación

Después del despliegue:

1. **Verifica el health check:**
   ```
   https://tu-app.hostingerapp.com/health
   ```
   Deberías ver: `{"status":"ok",...}`

2. **Verifica WebSocket:**
   - Abre `/live/` en WordPress
   - Abre consola del navegador (F12)
   - Deberías ver: `✅ WebSocket conectado`

### 7. Configurar en WordPress

1. Ve a WordPress Admin → Streaming IVS
2. En "Configuración del Backend Node.js"
3. Ingresa la URL que Hostinger te dio
4. Guarda

## Troubleshooting

### Si el preset Express crea archivos conflictivos:
- Puedes eliminarlos después del despliegue
- O mejor, si puedes, selecciona "Custom" o "Node.js" en lugar de Express

### Si Node.js 22.x da errores:
- Cambia a 20.x LTS
- O 18.x LTS (también funciona)

### Si no encuentra `package.json`:
- Verifica que el "Directorio Raíz" apunte a donde está `package.json`
- Si está en `backend/`, usa `backend` como directorio raíz

### Si falla el build:
- Revisa los logs en hPanel
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que `npm install` se ejecute correctamente

## Próximos Pasos

1. ✅ Selecciona Express (o Custom si está disponible)
2. ⚠️ Considera cambiar a Node.js 20.x LTS
3. ⏭️ Configura directorio raíz, build y start
4. ⏭️ Agrega variables de entorno
5. ⏭️ Despliega
6. ⏭️ Obtén la URL del backend
7. ⏭️ Configura en WordPress


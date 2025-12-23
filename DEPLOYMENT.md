# Guía de Despliegue del Backend Node.js

## Opciones de Hosting para Node.js

### 1. Hostinger Business/Cloud (Recomendado si ya usas Hostinger)

**Hostinger soporta Node.js en planes Business y Cloud.** Si tienes uno de estos planes:

#### Pasos en hPanel de Hostinger:

1. **Accede al hPanel:**
   - Inicia sesión en tu cuenta Hostinger
   - Ve a "Sitios web" → "Añadir sitio web"

2. **Selecciona "Aplicaciones Node.js":**
   - Elige esta opción entre las disponibles

3. **Método de despliegue:**

   **Opción A: Desde GitHub (Recomendado)**
   - Selecciona "Importar repositorio de Git"
   - Autoriza Hostinger para acceder a GitHub
   - Elige tu repositorio
   - **Configuración importante:**
     - **Directorio raíz:** `backend` (si el backend está en una subcarpeta)
     - **Comando de build:** `npm install`
     - **Comando de inicio:** `npm start`
     - **Puerto:** Hostinger lo asigna automáticamente (usa `process.env.PORT`)

   **Opción B: Subir archivos**
   - Comprime la carpeta `backend/` en un ZIP
   - Sube el archivo
   - Configura los mismos comandos

4. **Configurar Variables de Entorno:**
   - En el hPanel, busca "Variables de Entorno" o "Environment Variables"
   - Agrega:
     ```
     WORDPRESS_URL=https://videoventa.online
     WORDPRESS_USERNAME=alejandroarcila81@gmail.com
     WORDPRESS_APP_PASSWORD=OelT ONt3 F6Dn 7k1C Fh4D vlK1
     MAX_IMAGE_SIZE=5242880
     CACHE_TTL_PRODUCTS=300
     CACHE_TTL_OVERLAY=60
     ```
   - **NOTA:** No configures `PORT`, Hostinger lo asigna automáticamente

5. **Actualizar código para usar PORT de entorno:**
   - El código ya está configurado: `const PORT = process.env.PORT || 3000;`
   - Hostinger asignará un puerto automáticamente

6. **Configurar dominio (opcional):**
   - Puedes asignar un subdominio como `backend.videoventa.online`
   - O usar la URL que Hostinger te proporciona

#### Configuración en WordPress:

En WordPress Admin → Streaming IVS:
- **URL del Backend Node.js:** 
  - Si usas subdominio: `https://backend.videoventa.online`
  - O la URL que Hostinger te proporciona (ej: `https://tu-app.hostingerapp.com`)

### 2. Hostinger VPS (Si tienes VPS)

Si tienes un VPS de Hostinger, puedes instalar Node.js directamente:

#### Instalación en VPS Hostinger:

```bash
# Conectar por SSH a tu VPS
ssh root@tu-ip-vps

# Instalar Node.js (versión LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version
npm --version

# Instalar PM2 para mantener el proceso corriendo
sudo npm install -g pm2

# Navegar a tu proyecto
cd /ruta/a/tu/proyecto/backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env
nano .env  # Editar con tus valores

# Iniciar con PM2
pm2 start src/server.js --name streaming-backend

# Configurar PM2 para iniciar al arrancar el servidor
pm2 startup
pm2 save
```

#### Configurar Nginx como Proxy Reverso:

```nginx
# /etc/nginx/sites-available/streaming-backend
server {
    listen 80;
    server_name backend.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support
    location /ws {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# Habilitar el sitio
sudo ln -s /etc/nginx/sites-available/streaming-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 2. Servicios Cloud Gratuitos/Baratos (Alternativa Recomendada)

#### Railway (Recomendado - Muy fácil)

1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio GitHub
3. Railway detecta automáticamente Node.js
4. Agrega variables de entorno desde el dashboard
5. ¡Listo! Te da una URL automática

**Ventajas:**
- Gratis para empezar ($5 crédito mensual)
- SSL automático
- Deploy automático desde Git
- Muy fácil de usar

#### Render

1. Ve a [render.com](https://render.com)
2. Crea un nuevo "Web Service"
3. Conecta tu repositorio
4. Configura:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
5. Agrega variables de entorno
6. ¡Listo!

**Ventajas:**
- Plan gratuito disponible
- SSL automático
- Auto-deploy desde Git

#### Heroku

1. Ve a [heroku.com](https://heroku.com)
2. Instala Heroku CLI
3. Crea una app: `heroku create streaming-backend`
4. Configura variables: `heroku config:set WORDPRESS_URL=...`
5. Deploy: `git push heroku main`

**Nota:** Heroku eliminó su plan gratuito, pero tiene planes económicos.

### 3. Configuración para Hostinger Compartido (Workaround)

Si solo tienes hosting compartido, puedes:

#### Opción A: Usar un servicio externo para Node.js
- Desplegar Node.js en Railway/Render (gratis)
- Configurar WordPress en Hostinger para apuntar al backend externo

#### Opción B: Usar Cloudflare Workers (Avanzado)
- Ejecutar lógica en edge functions
- Más complejo pero posible

## Configuración de Variables de Entorno

Crea un archivo `.env` en el directorio `backend/`:

```env
# Puerto (Railway/Render lo configuran automáticamente)
PORT=3000

# Configuración de WordPress (desde Hostinger)
WORDPRESS_URL=https://videoventa.online
WORDPRESS_USERNAME=alejandroarcila81@gmail.com
WORDPRESS_APP_PASSWORD=OelT ONt3 F6Dn 7k1C Fh4D vlK1

# Directorio para almacenar imágenes
UPLOAD_DIR=./uploads

# Tamaño máximo de imagen (5MB)
MAX_IMAGE_SIZE=5242880

# Configuración de caché
CACHE_TTL_PRODUCTS=300
CACHE_TTL_OVERLAY=60
```

## Configuración en WordPress

En WordPress Admin → Streaming IVS:

- **URL del Backend Node.js**: 
  - Si está en Railway: `https://tu-app.railway.app`
  - Si está en Render: `https://tu-app.onrender.com`
  - Si está en tu VPS: `https://backend.tudominio.com`

## Verificación

1. Verifica que el backend esté corriendo:
   ```bash
   curl https://tu-backend-url.com/health
   ```

2. Verifica WebSocket:
   - Abre la consola del navegador en `/live/`
   - Deberías ver: `✅ WebSocket conectado`

## Troubleshooting

### Error: "Cannot connect to WebSocket"
- Verifica que la URL del backend sea correcta
- Asegúrate de usar `https://` si el backend está en HTTPS
- Verifica que el puerto 3000 esté abierto (en VPS)

### Error: "CORS error"
- El backend ya tiene CORS configurado, pero verifica que `cors` esté instalado

### El backend se cae después de un tiempo
- Usa PM2 (en VPS) o el servicio de Railway/Render que mantiene el proceso vivo

## Recomendación Final

**Para empezar rápido:** Usa Railway o Render (gratis, fácil, SSL automático)

**Para producción:** VPS de Hostinger con PM2 + Nginx


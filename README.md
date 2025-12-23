# Streaming IVS Backend

Backend Node.js para el sistema de streaming con Amazon IVS. Proporciona API REST, WebSocket para actualizaciones en tiempo real, y procesamiento de imágenes.

## Características

- ✅ API REST para productos, imágenes y overlays
- ✅ WebSocket para actualizaciones en tiempo real
- ✅ Procesamiento y optimización de imágenes
- ✅ Sistema de caché para mejorar rendimiento
- ✅ Integración con WordPress

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

3. Iniciar servidor:
```bash
npm start
```

Para desarrollo con auto-reload:
```bash
npm run dev
```

## Configuración

Edita el archivo `.env` con tus configuraciones:

```env
PORT=3000
WS_PORT=3001
WORDPRESS_URL=http://localhost
WORDPRESS_USERNAME=admin
WORDPRESS_APP_PASSWORD=tu_app_password
UPLOAD_DIR=./uploads
MAX_IMAGE_SIZE=5242880
CACHE_TTL_PRODUCTS=300
CACHE_TTL_OVERLAY=60
```

## Endpoints API

### Productos

- `GET /api/products` - Obtiene lista de productos
- `GET /api/products/active` - Obtiene producto activo
- `POST /api/products/active` - Establece producto activo

### Imágenes

- `POST /api/images/upload` - Sube imagen (base64 o multipart)
- `POST /api/images/upload-multipart` - Sube imagen multipart

### Overlay/Frame

- `GET /api/overlay/config` - Obtiene configuración actual
- `POST /api/overlay/set` - Establece overlay
- `POST /api/overlay/frame` - Establece frame

### WebSocket

- `ws://localhost:3000/ws` - Conexión WebSocket

## Estructura del Proyecto

```
backend/
├── src/
│   ├── server.js              # Servidor principal
│   ├── routes/                 # Rutas API
│   │   ├── products.js
│   │   ├── images.js
│   │   └── overlay.js
│   ├── services/               # Servicios
│   │   └── imageProcessor.js
│   ├── websocket/              # WebSocket
│   │   └── server.js
│   ├── cache/                  # Sistema de caché
│   │   └── cache.js
│   └── integrations/            # Integraciones externas
│       └── wordpress.js
├── uploads/                    # Imágenes subidas
├── package.json
└── README.md
```

## WebSocket Events

### Cliente → Servidor

- `ping` - Mantener conexión activa
- `subscribe` - Suscribirse a actualizaciones

### Servidor → Cliente

- `connected` - Confirmación de conexión
- `active_product_changed` - Producto activo cambió
- `overlay_changed` - Overlay actualizado
- `frame_changed` - Frame actualizado

## Próximos Pasos

1. Actualizar la app Android para usar este backend
2. Actualizar el frontend JavaScript para usar WebSocket
3. Agregar autenticación JWT
4. Implementar rate limiting
5. Agregar logging y monitoreo


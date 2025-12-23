import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Importar rutas y módulos
import productsRouter from './routes/products.js';
import imagesRouter from './routes/images.js';
import overlayRouter from './routes/overlay.js';
import { setupWebSocket } from './websocket/server.js';
import { initializeCache } from './cache/cache.js';

// Cargar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// Hostinger asigna el puerto automáticamente, usar variable de entorno
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir archivos estáticos (imágenes subidas)
const uploadsDir = join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        services: {
            http: 'running',
            websocket: 'running'
        }
    });
});

// Rutas API
app.use('/api/products', productsRouter);
app.use('/api/images', imagesRouter);
app.use('/api/overlay', overlayRouter);

// Crear servidor HTTP
const server = createServer(app);

// Inicializar WebSocket en el mismo servidor HTTP
const wss = new WebSocketServer({ 
    server,
    path: '/ws'
});

// Inicializar caché
initializeCache();

// Configurar WebSocket
setupWebSocket(wss);

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`🚀 Servidor HTTP corriendo en http://localhost:${PORT}`);
    console.log(`🔌 Servidor WebSocket disponible en ws://localhost:${PORT}/ws`);
    console.log(`📁 Directorio de uploads: ${uploadsDir}`);
});

// Manejo de errores
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});


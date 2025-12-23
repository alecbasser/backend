import express from 'express';
import { get, set, del, CACHE_KEYS } from '../cache/cache.js';
import { notifyWebSocketClients } from '../websocket/server.js';
import { updateOverlayInWordPress, updateFrameInWordPress, getOverlayConfigFromWordPress } from '../integrations/wordpress.js';

const router = express.Router();

/**
 * GET /api/overlay/config
 * Obtiene la configuración actual de overlay y frame
 */
router.get('/config', async (req, res) => {
    try {
        // Intentar obtener del caché
        const cached = get(CACHE_KEYS.OVERLAY_CONFIG);
        if (cached) {
            return res.json(cached);
        }
        
        // Obtener de WordPress
        const config = await getOverlayConfigFromWordPress();
        
        // Guardar en caché (TTL de 1 minuto)
        set(CACHE_KEYS.OVERLAY_CONFIG, config, 60);
        
        res.json(config);
    } catch (error) {
        console.error('Error al obtener configuración de overlay:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

/**
 * POST /api/overlay/set
 * Establece la configuración del overlay
 */
router.post('/set', async (req, res) => {
    try {
        console.log('📥 Recibida petición para actualizar overlay:', req.body);
        const { imageUrl, positionX, positionY, width, height, active } = req.body;
        
        // Validar que active sea boolean
        const isActive = active === true && imageUrl && imageUrl.trim() !== '';
        
        // Actualizar en WordPress
        await updateOverlayInWordPress({
            imageUrl: isActive ? imageUrl : null,
            positionX: positionX || 0,
            positionY: positionY || 0,
            width: width || 100,
            height: height || 100,
            active: isActive
        });
        
        // Invalidar caché
        del(CACHE_KEYS.OVERLAY_CONFIG);
        
        // Notificar a clientes WebSocket
        const overlayData = {
            imageUrl: isActive ? imageUrl : null,
            positionX: positionX || 0,
            positionY: positionY || 0,
            width: width || 100,
            height: height || 100,
            active: isActive
        };
        
        console.log('📢 Notificando cambio de overlay vía WebSocket:', {
            type: 'overlay_changed',
            overlay: overlayData
        });
        
        notifyWebSocketClients({
            type: 'overlay_changed',
            overlay: overlayData
        });
        
        res.json({ 
            success: true, 
            message: 'Overlay actualizado correctamente' 
        });
    } catch (error) {
        console.error('Error al actualizar overlay:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

/**
 * POST /api/overlay/frame
 * Establece la configuración del frame
 */
router.post('/frame', async (req, res) => {
    try {
        console.log('📥 Recibida petición para actualizar frame:', req.body);
        const { imageUrl, active } = req.body;
        
        // Validar que active sea boolean
        const isActive = active === true && imageUrl && imageUrl.trim() !== '';
        
        // Actualizar en WordPress
        await updateFrameInWordPress({
            imageUrl: isActive ? imageUrl : null,
            active: isActive
        });
        
        // Invalidar caché
        del(CACHE_KEYS.OVERLAY_CONFIG);
        
        // Notificar a clientes WebSocket
        const frameData = {
            imageUrl: isActive ? imageUrl : null,
            active: isActive
        };
        
        console.log('📢 Notificando cambio de frame vía WebSocket:', {
            type: 'frame_changed',
            frame: frameData
        });
        
        notifyWebSocketClients({
            type: 'frame_changed',
            frame: frameData
        });
        
        res.json({ 
            success: true, 
            message: 'Frame actualizado correctamente' 
        });
    } catch (error) {
        console.error('Error al actualizar frame:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

export default router;


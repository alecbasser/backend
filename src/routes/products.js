import express from 'express';
import { get, set, del, CACHE_KEYS } from '../cache/cache.js';
import { notifyWebSocketClients } from '../websocket/server.js';
import { getProductsFromWordPress, getActiveProductFromWordPress, setActiveProductInWordPress } from '../integrations/wordpress.js';

const router = express.Router();

/**
 * GET /api/products
 * Obtiene la lista de productos (con caché)
 */
router.get('/', async (req, res) => {
    try {
        // Intentar obtener del caché
        const cached = get(CACHE_KEYS.PRODUCTS);
        if (cached) {
            console.log('📦 Productos obtenidos del caché');
            return res.json(cached);
        }
        
        // Si no está en caché, obtener de WordPress
        const products = await getProductsFromWordPress();
        
        // Guardar en caché (TTL de 5 minutos)
        set(CACHE_KEYS.PRODUCTS, products, 300);
        
        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

/**
 * GET /api/products/active
 * Obtiene el producto activo actual
 */
router.get('/active', async (req, res) => {
    try {
        // Intentar obtener del caché
        const cached = get(CACHE_KEYS.ACTIVE_PRODUCT);
        if (cached) {
            return res.json({ success: true, product: cached });
        }
        
        // Obtener de WordPress
        const product = await getActiveProductFromWordPress();
        
        // Guardar en caché (TTL de 1 minuto)
        if (product) {
            set(CACHE_KEYS.ACTIVE_PRODUCT, product, 60);
        }
        
        res.json({ success: true, product });
    } catch (error) {
        console.error('Error al obtener producto activo:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

/**
 * POST /api/products/active
 * Establece el producto activo
 */
router.post('/active', async (req, res) => {
    try {
        const { productId } = req.body;
        
        if (!productId) {
            return res.status(400).json({ 
                success: false, 
                message: 'productId es requerido' 
            });
        }
        
        // Actualizar en WordPress
        const product = await setActiveProductInWordPress(productId);
        
        // Actualizar caché
        set(CACHE_KEYS.ACTIVE_PRODUCT, product, 60);
        
        // Invalidar caché de productos para forzar recarga
        del(CACHE_KEYS.PRODUCTS);
        
        // Notificar a clientes WebSocket
        notifyWebSocketClients({
            type: 'active_product_changed',
            product
        });
        
        res.json({ 
            success: true, 
            product,
            message: 'Producto activo actualizado' 
        });
    } catch (error) {
        console.error('Error al establecer producto activo:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

export default router;


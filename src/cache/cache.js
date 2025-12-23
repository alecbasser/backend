import NodeCache from 'node-cache';

// Instancia global de caché
let cache = null;

/**
 * Inicializa el sistema de caché
 */
export function initializeCache() {
    const stdTTL = parseInt(process.env.CACHE_TTL_PRODUCTS) || 300; // 5 minutos por defecto
    
    cache = new NodeCache({
        stdTTL, // TTL por defecto
        checkperiod: 60, // Verificar cada minuto
        useClones: false // Mejor rendimiento
    });
    
    console.log('✅ Caché inicializado');
}

/**
 * Obtiene un valor del caché
 */
export function get(key) {
    if (!cache) return undefined;
    return cache.get(key);
}

/**
 * Guarda un valor en el caché
 */
export function set(key, value, ttl = null) {
    if (!cache) return false;
    return cache.set(key, value, ttl);
}

/**
 * Elimina un valor del caché
 */
export function del(key) {
    if (!cache) return 0;
    return cache.del(key);
}

/**
 * Limpia todo el caché
 */
export function flush() {
    if (!cache) return;
    cache.flushAll();
}

/**
 * Obtiene estadísticas del caché
 */
export function getStats() {
    if (!cache) return null;
    return cache.getStats();
}

// Claves de caché comunes
export const CACHE_KEYS = {
    PRODUCTS: 'products:all',
    ACTIVE_PRODUCT: 'products:active',
    OVERLAY_CONFIG: 'overlay:config',
    FRAME_CONFIG: 'frame:config'
};


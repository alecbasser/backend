import axios from 'axios';
import { Buffer } from 'buffer';

// Configuración de WordPress desde variables de entorno
const WORDPRESS_URL = process.env.WORDPRESS_URL || 'http://localhost';
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME || 'admin';
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD || '';

/**
 * Crea el header de autenticación Basic Auth
 */
function createAuthHeader() {
    const credentials = Buffer.from(`${WORDPRESS_USERNAME}:${WORDPRESS_APP_PASSWORD}`).toString('base64');
    return `Basic ${credentials}`;
}

/**
 * Obtiene productos desde WordPress
 */
export async function getProductsFromWordPress() {
    try {
        const url = `${WORDPRESS_URL}/wp-json/streaming-ivs/v1/products`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': createAuthHeader()
            },
            timeout: 10000
        });
        
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos de WordPress:', error.message);
        throw new Error(`Error al obtener productos: ${error.message}`);
    }
}

/**
 * Obtiene el producto activo desde WordPress
 */
export async function getActiveProductFromWordPress() {
    try {
        const url = `${WORDPRESS_URL}/wp-json/streaming-ivs/v1/active-product`;
        const response = await axios.get(url, {
            timeout: 10000
        });
        
        if (response.data.success && response.data.product) {
            return response.data.product;
        }
        return null;
    } catch (error) {
        console.error('Error al obtener producto activo de WordPress:', error.message);
        return null; // No lanzar error, simplemente retornar null
    }
}

/**
 * Establece el producto activo en WordPress
 */
export async function setActiveProductInWordPress(productId) {
    try {
        const url = `${WORDPRESS_URL}/wp-json/streaming-ivs/v1/active-product`;
        const response = await axios.post(url, {
            product_id: productId
        }, {
            headers: {
                'Authorization': createAuthHeader(),
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
        
        if (response.data.success && response.data.product) {
            return response.data.product;
        }
        throw new Error(response.data.message || 'Error al establecer producto activo');
    } catch (error) {
        console.error('Error al establecer producto activo en WordPress:', error.message);
        throw new Error(`Error al establecer producto activo: ${error.message}`);
    }
}

/**
 * Guarda una imagen en WordPress
 */
export async function saveImageToWordPress(imageBuffer, filename, mimeType) {
    try {
        // Convertir a base64 para enviar a WordPress
        const base64Data = imageBuffer.toString('base64');
        
        const url = `${WORDPRESS_URL}/wp-json/streaming-ivs/v1/upload-image`;
        const response = await axios.post(url, {
            filename: filename,
            data: base64Data
        }, {
            headers: {
                'Authorization': createAuthHeader(),
                'Content-Type': 'application/json'
            },
            timeout: 30000 // 30 segundos para subidas
        });
        
        if (response.data.success && response.data.imageUrl) {
            return {
                imageUrl: response.data.imageUrl,
                imageId: response.data.imageId
            };
        }
        throw new Error(response.data.message || 'Error al subir imagen');
    } catch (error) {
        console.error('Error al guardar imagen en WordPress:', error.message);
        throw new Error(`Error al guardar imagen: ${error.message}`);
    }
}

/**
 * Actualiza la configuración del overlay en WordPress
 */
export async function updateOverlayInWordPress(config) {
    try {
        const url = `${WORDPRESS_URL}/wp-json/streaming-ivs/v1/set-overlay`;
        const response = await axios.post(url, {
            imageUrl: config.imageUrl,
            positionX: config.positionX || 0,
            positionY: config.positionY || 0,
            width: config.width || 100,
            height: config.height || 100,
            active: config.active
        }, {
            headers: {
                'Authorization': createAuthHeader(),
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
        
        if (!response.data.success) {
            throw new Error(response.data.message || 'Error al actualizar overlay');
        }
        
        return response.data;
    } catch (error) {
        console.error('Error al actualizar overlay en WordPress:', error.message);
        throw new Error(`Error al actualizar overlay: ${error.message}`);
    }
}

/**
 * Actualiza la configuración del frame en WordPress
 */
export async function updateFrameInWordPress(config) {
    try {
        const url = `${WORDPRESS_URL}/wp-json/streaming-ivs/v1/set-frame`;
        const response = await axios.post(url, {
            imageUrl: config.imageUrl,
            active: config.active
        }, {
            headers: {
                'Authorization': createAuthHeader(),
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
        
        if (!response.data.success) {
            throw new Error(response.data.message || 'Error al actualizar frame');
        }
        
        return response.data;
    } catch (error) {
        console.error('Error al actualizar frame en WordPress:', error.message);
        throw new Error(`Error al actualizar frame: ${error.message}`);
    }
}

/**
 * Obtiene la configuración completa de overlay y frame desde WordPress
 */
export async function getOverlayConfigFromWordPress() {
    try {
        const url = `${WORDPRESS_URL}/wp-json/streaming-ivs/v1/overlay-config`;
        const response = await axios.get(url, {
            timeout: 10000
        });
        
        return response.data;
    } catch (error) {
        console.error('Error al obtener configuración de overlay de WordPress:', error.message);
        // Retornar configuración vacía en caso de error
        return {
            overlay: {
                active: false,
                imageUrl: null,
                positionX: 0,
                positionY: 0,
                width: 100,
                height: 100
            },
            frame: {
                active: false,
                imageUrl: null
            },
            timestamp: Date.now()
        };
    }
}


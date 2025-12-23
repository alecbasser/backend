import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Procesa una imagen: valida, optimiza y mantiene transparencia
 * @param {Buffer} imageBuffer - Buffer de la imagen
 * @param {string} filename - Nombre del archivo original
 * @returns {Promise<{buffer: Buffer, filename: string, mimeType: string}>}
 */
export async function processImage(imageBuffer, filename) {
    try {
        // Detectar formato de la imagen
        const metadata = await sharp(imageBuffer).metadata();
        
        // Validar que sea una imagen válida
        if (!metadata.format) {
            throw new Error('Formato de imagen no válido');
        }
        
        // Asegurar que el nombre tenga extensión .png para mantener transparencia
        const pngFilename = ensurePngExtension(filename);
        
        // Procesar con Sharp
        // Mantener transparencia si existe
        let processedBuffer;
        
        if (metadata.hasAlpha) {
            // Si tiene canal alpha, mantener como PNG
            processedBuffer = await sharp(imageBuffer)
                .png({ 
                    quality: 100,
                    compressionLevel: 6, // Balance entre tamaño y calidad
                    adaptiveFiltering: true
                })
                .toBuffer();
        } else {
            // Si no tiene transparencia, convertir a PNG también para consistencia
            processedBuffer = await sharp(imageBuffer)
                .png({ 
                    quality: 100,
                    compressionLevel: 6
                })
                .toBuffer();
        }
        
        // Validar tamaño máximo después del procesamiento
        const maxSize = parseInt(process.env.MAX_IMAGE_SIZE) || 5242880;
        if (processedBuffer.length > maxSize) {
            // Si es muy grande, intentar comprimir más
            processedBuffer = await sharp(imageBuffer)
                .png({ 
                    quality: 90,
                    compressionLevel: 9 // Máxima compresión
                })
                .toBuffer();
            
            // Si aún es muy grande, lanzar error
            if (processedBuffer.length > maxSize) {
                throw new Error(`Imagen demasiado grande después del procesamiento: ${(processedBuffer.length / 1024 / 1024).toFixed(2)}MB`);
            }
        }
        
        return {
            buffer: processedBuffer,
            filename: pngFilename,
            mimeType: 'image/png'
        };
    } catch (error) {
        console.error('Error al procesar imagen:', error);
        throw new Error(`Error al procesar imagen: ${error.message}`);
    }
}

/**
 * Asegura que el nombre del archivo tenga extensión .png
 */
function ensurePngExtension(filename) {
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    return `${nameWithoutExt}.png`;
}

/**
 * Genera un thumbnail de una imagen
 */
export async function generateThumbnail(imageBuffer, size = 200) {
    try {
        const thumbnail = await sharp(imageBuffer)
            .resize(size, size, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .png()
            .toBuffer();
        
        return thumbnail;
    } catch (error) {
        console.error('Error al generar thumbnail:', error);
        throw error;
    }
}


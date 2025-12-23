import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { processImage } from '../services/imageProcessor.js';
import { saveImageToWordPress } from '../integrations/wordpress.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configurar multer para almacenamiento temporal
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { 
        fileSize: parseInt(process.env.MAX_IMAGE_SIZE) || 5242880 // 5MB por defecto
    },
    fileFilter: (req, file, cb) => {
        // Solo permitir imágenes
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen'), false);
        }
    }
});

/**
 * POST /api/images/upload
 * Sube y procesa una imagen
 * Acepta: multipart/form-data con campo 'image'
 * O: application/json con { data: base64, filename: string }
 */
router.post('/upload', async (req, res) => {
    try {
        let imageBuffer;
        let filename;
        
        // Verificar si viene como multipart (archivo) o JSON (base64)
        if (req.body.data) {
            // Formato base64 (desde Android)
            const base64Data = req.body.data;
            const base64Match = base64Data.match(/^data:image\/(\w+);base64,(.+)$/);
            
            if (base64Match) {
                imageBuffer = Buffer.from(base64Match[2], 'base64');
                filename = req.body.filename || `image_${Date.now()}.png`;
            } else {
                // Asumir que es base64 sin prefijo
                imageBuffer = Buffer.from(base64Data, 'base64');
                filename = req.body.filename || `image_${Date.now()}.png`;
            }
        } else {
            return res.status(400).json({ 
                success: false, 
                message: 'Se requiere data (base64) o archivo multipart' 
            });
        }
        
        // Validar tamaño
        const maxSize = parseInt(process.env.MAX_IMAGE_SIZE) || 5242880;
        if (imageBuffer.length > maxSize) {
            return res.status(400).json({ 
                success: false, 
                message: `Imagen demasiado grande. Máximo: ${maxSize / 1024 / 1024}MB` 
            });
        }
        
        // Procesar imagen (validar, optimizar, mantener transparencia)
        const processedImage = await processImage(imageBuffer, filename);
        
        // Guardar en WordPress
        const result = await saveImageToWordPress(
            processedImage.buffer,
            processedImage.filename,
            processedImage.mimeType
        );
        
        res.json({
            success: true,
            imageUrl: result.imageUrl,
            imageId: result.imageId,
            message: 'Imagen subida y procesada correctamente'
        });
    } catch (error) {
        console.error('Error al subir imagen:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

/**
 * POST /api/images/upload-multipart
 * Endpoint alternativo para subir archivos multipart
 */
router.post('/upload-multipart', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'No se proporcionó ningún archivo' 
            });
        }
        
        // Procesar imagen
        const processedImage = await processImage(
            req.file.buffer, 
            req.file.originalname
        );
        
        // Guardar en WordPress
        const result = await saveImageToWordPress(
            processedImage.buffer,
            processedImage.filename,
            processedImage.mimeType
        );
        
        res.json({
            success: true,
            imageUrl: result.imageUrl,
            imageId: result.imageId,
            message: 'Imagen subida y procesada correctamente'
        });
    } catch (error) {
        console.error('Error al subir imagen:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

export default router;


import { WebSocketServer } from 'ws';

// Almacenar clientes conectados
const clients = new Set();

/**
 * Configura el servidor WebSocket
 */
export function setupWebSocket(wss) {
    wss.on('connection', (ws, req) => {
        console.log('🔌 Nuevo cliente WebSocket conectado');
        clients.add(ws);
        
        // Enviar mensaje de bienvenida
        ws.send(JSON.stringify({
            type: 'connected',
            message: 'Conectado al servidor de streaming',
            timestamp: new Date().toISOString()
        }));
        
        // Manejar mensajes del cliente
        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                handleWebSocketMessage(ws, data);
            } catch (error) {
                console.error('Error al procesar mensaje WebSocket:', error);
                ws.send(JSON.stringify({
                    type: 'error',
                    message: 'Error al procesar mensaje'
                }));
            }
        });
        
        // Manejar desconexión
        ws.on('close', () => {
            console.log('🔌 Cliente WebSocket desconectado');
            clients.delete(ws);
        });
        
        // Manejar errores
        ws.on('error', (error) => {
            console.error('Error en WebSocket:', error);
            clients.delete(ws);
        });
    });
    
    console.log('✅ Servidor WebSocket configurado');
}

/**
 * Maneja mensajes recibidos del cliente
 */
function handleWebSocketMessage(ws, data) {
    switch (data.type) {
        case 'ping':
            ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }));
            break;
            
        case 'subscribe':
            // El cliente se suscribe a actualizaciones
            ws.send(JSON.stringify({
                type: 'subscribed',
                message: 'Suscrito a actualizaciones en tiempo real'
            }));
            break;
            
        default:
            console.log('Mensaje WebSocket desconocido:', data.type);
    }
}

/**
 * Notifica a todos los clientes conectados sobre un cambio
 */
export function notifyWebSocketClients(data) {
    const message = JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
    });
    
    let sentCount = 0;
    clients.forEach((client) => {
        // WebSocket.OPEN = 1
        if (client.readyState === 1) {
            try {
                client.send(message);
                sentCount++;
            } catch (error) {
                console.error('Error al enviar mensaje WebSocket:', error);
                clients.delete(client);
            }
        } else {
            // Limpiar clientes desconectados
            clients.delete(client);
        }
    });
    
    if (sentCount > 0) {
        console.log(`📢 Notificación enviada a ${sentCount} cliente(s):`, data.type);
    }
}

/**
 * Obtiene el número de clientes conectados
 */
export function getConnectedClientsCount() {
    return clients.size;
}


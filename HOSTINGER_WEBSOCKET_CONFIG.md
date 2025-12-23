# Configuración WebSocket en Hostinger

## Estado Actual

✅ **Backend funcionando:** El health check responde correctamente
✅ **WebSocket configurado:** El backend reporta "websocket: running"
❌ **Conexión falla:** El frontend no puede conectar a WebSocket

## Diagnóstico

El problema es que **Hostinger puede estar bloqueando o requiriendo configuración especial** para conexiones WebSocket a través de su proxy/load balancer.

## Soluciones

### Solución 1: Verificar Logs del Backend

En Hostinger hPanel, revisa los logs de tu aplicación Node.js:

1. Ve a hPanel → Tu aplicación Node.js → Logs
2. Busca mensajes como:
   - `🔌 Nuevo cliente WebSocket conectado`
   - `✅ Servidor WebSocket configurado`
   - O errores relacionados con WebSocket

**Si NO ves intentos de conexión:**
- Hostinger está bloqueando las conexiones WebSocket antes de llegar al backend

**Si SÍ ves intentos pero fallan:**
- El problema está en la configuración del servidor

### Solución 2: Contactar Soporte Hostinger

Contacta a soporte y pregunta específicamente:

> "Tengo una aplicación Node.js desplegada que usa WebSocket. El health check funciona, pero las conexiones WebSocket desde el navegador no pueden conectarse. ¿Necesito alguna configuración especial en el proxy/load balancer para habilitar WebSocket en el path `/ws`?"

### Solución 3: Verificar Configuración de Hostinger

Algunos planes de Hostinger requieren:

1. **Habilitar WebSocket en el panel:**
   - Busca en hPanel: "WebSocket" o "Real-time connections"
   - Asegúrate de que esté habilitado

2. **Configurar proxy reverso:**
   - Puede requerir configuración de Nginx o similar
   - Hostinger puede necesitar configurar upgrade headers

### Solución 4: Probar Conexión Directa

Abre la consola del navegador y prueba:

```javascript
// Probar conexión WebSocket
const ws = new WebSocket('wss://lightsteelblue-yak-683298.hostingersite.com/ws');

ws.onopen = () => {
    console.log('✅ WebSocket conectado!');
    ws.send(JSON.stringify({ type: 'ping' }));
};

ws.onmessage = (event) => {
    console.log('📨 Mensaje recibido:', event.data);
};

ws.onerror = (error) => {
    console.error('❌ Error:', error);
    console.error('Detalles:', {
        type: error.type,
        target: error.target?.url,
        readyState: error.target?.readyState
    });
};

ws.onclose = (event) => {
    console.log('🔌 Cerrado:', {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean
    });
};
```

**Códigos de error comunes:**
- `1006`: Conexión cerrada anormalmente (sin handshake)
- `1002`: Error de protocolo
- `1003`: Tipo de dato no soportado

### Solución 5: Verificar Headers HTTP

El WebSocket requiere headers especiales. Verifica que Hostinger los permita:

```javascript
// En la consola del navegador
fetch('https://lightsteelblue-yak-683298.hostingersite.com/health', {
    method: 'GET',
    headers: {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade'
    }
}).then(r => r.json()).then(console.log);
```

## Mientras Tanto

**Buenas noticias:** El sistema funciona con polling:
- ✅ Actualizaciones cada 2 segundos
- ✅ Todo funciona correctamente
- ⚠️ Solo no es tiempo real

## Próximos Pasos Recomendados

1. **Revisa los logs en Hostinger** para ver si hay intentos de conexión
2. **Contacta a soporte de Hostinger** sobre WebSocket
3. **Mientras tanto:** El sistema funciona con polling (cada 2 segundos)

## Alternativa: Railway

Si Hostinger no puede habilitar WebSocket:
- Despliega el backend en Railway (gratis)
- WebSocket funciona perfectamente
- Mantén WordPress en Hostinger


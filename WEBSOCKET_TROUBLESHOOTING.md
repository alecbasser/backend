# Solución de Problemas WebSocket en Hostinger

## Problema Actual

El WebSocket no se puede conectar a:
```
wss://lightsteelblue-yak-683298.hostingersite.com/ws
```

## Pasos de Diagnóstico

### 1. Verificar que el Backend esté Corriendo

Abre en tu navegador:
```
https://lightsteelblue-yak-683298.hostingersite.com/health
```

**Si funciona:** Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "...",
  "services": {
    "http": "running",
    "websocket": "running"
  }
}
```

**Si NO funciona:**
- El backend no está corriendo
- Revisa los logs en Hostinger hPanel
- Verifica que el despliegue haya terminado

### 2. Verificar Logs en Hostinger

1. Ve a hPanel → Tu aplicación Node.js
2. Busca "Logs" o "Application Logs"
3. Verifica que veas:
   ```
   🚀 Servidor HTTP corriendo en http://localhost:XXXX
   🔌 Servidor WebSocket disponible en ws://localhost:XXXX/ws
   ✅ Servidor WebSocket configurado
   ```

### 3. Problema Común: Hostinger y WebSocket

**Hostinger puede requerir configuración especial para WebSocket.**

#### Solución A: Verificar que WebSocket esté Habilitado

En algunos planes de Hostinger, WebSocket puede estar deshabilitado por defecto. Necesitas:

1. **Contactar a Soporte de Hostinger:**
   - Pide que habiliten WebSocket para tu aplicación Node.js
   - Menciona que necesitas WebSocket en el path `/ws`

2. **O verificar en hPanel:**
   - Busca configuración de "WebSocket" o "Real-time connections"
   - Asegúrate de que esté habilitado

#### Solución B: Usar Polling como Fallback (Ya Implementado)

El código ya tiene fallback a polling si WebSocket falla. Esto significa que:
- ✅ La app seguirá funcionando
- ⚠️ Las actualizaciones serán cada 2 segundos en lugar de tiempo real
- ✅ No es crítico, pero WebSocket es mejor

### 4. Verificar la URL de WebSocket

El código JavaScript está intentando conectar a:
```
wss://lightsteelblue-yak-683298.hostingersite.com/ws
```

**Verifica:**
1. Que la URL del backend en WordPress sea correcta
2. Que no tenga barra final `/`
3. Que use `https://` (no `http://`)

### 5. Probar WebSocket Manualmente

Abre la consola del navegador y prueba:

```javascript
const ws = new WebSocket('wss://lightsteelblue-yak-683298.hostingersite.com/ws');
ws.onopen = () => console.log('✅ Conectado');
ws.onerror = (e) => console.error('❌ Error:', e);
ws.onclose = (e) => console.log('🔌 Desconectado:', e.code, e.reason);
```

## Soluciones Posibles

### Solución 1: Verificar Backend (Más Probable)

1. Ve a Hostinger hPanel
2. Verifica que la aplicación esté "Running" o "Active"
3. Revisa los logs para ver errores
4. Si hay errores, compártelos

### Solución 2: Contactar Soporte Hostinger

Si el backend está corriendo pero WebSocket no funciona:

1. Contacta a soporte de Hostinger
2. Pregunta: "¿Mi plan soporta WebSocket para aplicaciones Node.js?"
3. Si no, pregunta cómo habilitarlo
4. O considera actualizar a un plan que lo soporte

### Solución 3: Usar Polling (Temporal)

El código ya tiene fallback a polling, así que:
- La app funciona sin WebSocket
- Las actualizaciones son cada 2 segundos
- No es tiempo real, pero funciona

### Solución 4: Alternativa - Usar Railway/Render

Si Hostinger no soporta WebSocket bien:
- Despliega el backend en Railway (gratis)
- Mantén WordPress en Hostinger
- Actualiza la URL del backend en WordPress

## Verificación Rápida

1. ✅ ¿Funciona `/health`? → Backend está corriendo
2. ❌ ¿No funciona WebSocket? → Problema de configuración Hostinger
3. ✅ ¿Polling funciona? → App funciona, solo sin tiempo real

## Próximos Pasos

1. **Primero:** Verifica que `/health` funcione
2. **Segundo:** Revisa los logs en Hostinger
3. **Tercero:** Si todo está bien pero WebSocket no funciona, contacta a Hostinger
4. **Mientras tanto:** La app funciona con polling (cada 2 segundos)


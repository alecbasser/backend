# Configuración de Build en Hostinger

## Configuración Actual en la Pantalla

Veo que Hostinger te está pidiendo:

### 1. Archivo de Entrada (Input file)
**Valor actual:** `src/server.js` ✅

**Esto es CORRECTO** - Este es el punto de entrada de tu aplicación.

### 2. Gestor de Paquetes (Package manager)
**Valor actual:** `npm` ✅

**Esto es CORRECTO** - npm es el gestor de paquetes estándar.

## Configuración Completa Recomendada

### Archivo de Entrada:
```
src/server.js
```
✅ Correcto - Este es el archivo principal que inicia el servidor.

### Gestor de Paquetes:
```
npm
```
✅ Correcto - npm es el que usamos en package.json.

## Comandos que Hostinger Usará Automáticamente

Con esta configuración, Hostinger ejecutará:

1. **Instalación de dependencias:**
   ```bash
   npm install
   ```
   (Esto se ejecuta automáticamente)

2. **Inicio de la aplicación:**
   ```bash
   node src/server.js
   ```
   (Esto se ejecuta automáticamente basado en el archivo de entrada)

## Verificación

Después de hacer clic en "Finalizar":

1. Hostinger instalará las dependencias (`npm install`)
2. Iniciará el servidor con `node src/server.js`
3. Asignará un puerto automáticamente
4. Te dará una URL para acceder

## Próximos Pasos

1. ✅ Verifica que "Archivo de entrada" sea: `src/server.js`
2. ✅ Verifica que "Gestor de paquetes" sea: `npm`
3. ✅ Haz clic en "Finalizar"
4. ⏭️ Espera a que Hostinger termine el despliegue
5. ⏭️ Agrega las variables de entorno (ver `VARIABLES_HOSTINGER.md`)
6. ⏭️ Obtén la URL del backend
7. ⏭️ Configura en WordPress

## Troubleshooting

### Si Hostinger no encuentra `src/server.js`:
- Verifica que el "Directorio raíz" apunte a donde está tu `package.json`
- Si tu backend está en una subcarpeta `backend/`, el directorio raíz debe ser `backend`
- Entonces el archivo de entrada sería: `src/server.js` (relativo a `backend/`)

### Si hay errores de build:
- Revisa los logs en Hostinger
- Verifica que `package.json` tenga todas las dependencias
- Asegúrate de que `src/server.js` exista y sea válido


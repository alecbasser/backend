# Variables de Entorno para Hostinger

## Cómo Agregar en Hostinger

1. En el hPanel, ve a tu aplicación Node.js
2. Busca la sección **"Variables de Entorno"** o **"Environment Variables"**
3. Agrega cada variable una por una, o cópialas todas de abajo

## Variables a Configurar

Copia y pega estas variables en Hostinger:

```
WORDPRESS_URL=https://videoventa.online
WORDPRESS_USERNAME=alejandroarcila81@gmail.com
WORDPRESS_APP_PASSWORD=OelT ONt3 F6Dn 7k1C Fh4D vlK1
MAX_IMAGE_SIZE=5242880
CACHE_TTL_PRODUCTS=300
CACHE_TTL_OVERLAY=60
```

## Formato en Hostinger

En Hostinger, normalmente se agregan así:
- **Nombre de la variable:** `WORDPRESS_URL`
- **Valor:** `https://videoventa.online`

Repite para cada variable.

## ⚠️ IMPORTANTE

**NO agregues la variable `PORT`** - Hostinger la asigna automáticamente y el código ya está configurado para usarla.

## Verificación

Después de agregar las variables:
1. Reinicia la aplicación en Hostinger
2. Verifica los logs para asegurarte de que se cargaron correctamente
3. Prueba el endpoint: `https://tu-app.hostingerapp.com/health`


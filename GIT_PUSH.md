# Guía para Push a Git

## 📍 Ruta Correcta del Repositorio Backend

El repositorio del backend está en:
```
C:\Users\luzma\AndroidStudioProjects\live\backend
```

## 🔄 Comandos para Push

### Desde PowerShell (Windows):

```powershell
# Navegar al directorio del backend
cd C:\Users\luzma\AndroidStudioProjects\live\backend

# Verificar estado
git status

# Agregar todos los cambios
git add .

# Hacer commit
git commit -m "Descripción del cambio"

# Hacer push
git push origin main
```

### Desde cualquier terminal:

```bash
cd C:\Users\luzma\AndroidStudioProjects\live\backend
git status
git add .
git commit -m "Descripción del cambio"
git push origin main
```

## 📋 Repositorio Remoto

**URL del repositorio:**
```
https://github.com/alecbasser/backend.git
```

**Branch principal:**
```
main
```

## ⚠️ Nota Importante

**NO confundir con:**
- `C:\proyectos\tiendaDev\wp-content\plugins\streaming\backend` ❌ (No existe)
- `C:\Users\luzma\AndroidStudioProjects\live\backend` ✅ (Correcto)

## 🔍 Verificar Ubicación

Para verificar que estás en el directorio correcto:
```powershell
cd C:\Users\luzma\AndroidStudioProjects\live\backend
git remote -v
```

Deberías ver:
```
origin  https://github.com/alecbasser/backend.git (fetch)
origin  https://github.com/alecbasser/backend.git (push)
```

## 📝 Ejemplo Completo

```powershell
# 1. Navegar al directorio
cd C:\Users\luzma\AndroidStudioProjects\live\backend

# 2. Ver qué cambió
git status

# 3. Agregar cambios
git add .

# 4. Commit con mensaje descriptivo
git commit -m "Agregar logs de debug para WebSocket"

# 5. Push al repositorio
git push origin main
```

## 🚀 Después del Push

Railway debería detectar automáticamente el push y hacer redeploy del backend.

Si necesitas hacer redeploy manual:
1. Ve a Railway Dashboard
2. Selecciona tu proyecto
3. Click en "Redeploy"


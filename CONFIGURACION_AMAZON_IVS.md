# Configuración de Amazon IVS

## 📍 Ubicaciones de Configuración

Los parámetros de Amazon IVS se configuran en **2 lugares**:

---

## 1. 🖥️ WordPress Admin (Para Reproducción)

**Ubicación:** WordPress Admin → Streaming IVS

**URL:** `https://videoventa.online/wp-admin/admin.php?page=streaming-ivs`

### Campos Configurables:

#### ✅ **Playback URL** (OBLIGATORIO para ver el streaming)
- **Campo:** `streaming_ivs_playback_url`
- **Ubicación en código:** `class-streaming-admin.php` línea 180-192
- **Formato:** URL que termina en `.m3u8`
- **Ejemplo:** 
  ```
  https://1234567890.us-east-1.playback.live-video.net/api/video/v1/us-east-1.1234567890.channel.abc123.m3u8
  ```
- **Uso:** Se usa para **reproducir** el streaming en `/live/`

#### ⚙️ **Stream Key** (Opcional - Solo para transmitir desde WordPress)
- **Campo:** `streaming_ivs_stream_key`
- **Ubicación en código:** `class-streaming-admin.php` línea 197-209
- **Formato:** Clave que empieza con `sk_us-east-1_`
- **Ejemplo:**
  ```
  sk_us-east-1_HgHfUNH6SSu5_1IkuaGrbL9Rvv10FzCjvxT7mBOqMf5
  ```
- **Uso:** Se usa para transmitir desde el navegador (página `/broadcast/`)

#### ⚙️ **Ingest Endpoint** (Opcional - Solo para transmitir desde WordPress)
- **Campo:** `streaming_ivs_ingest_endpoint`
- **Ubicación en código:** `class-streaming-admin.php` línea 233-244
- **Formato:** URL que empieza con `rtmps://`
- **Ejemplo:**
  ```
  rtmps://78f8fda0de45.global-contribute.live-video.net:443/app/
  ```
- **Uso:** Se usa para transmitir desde el navegador (página `/broadcast/`)

---

## 2. 📱 App Android (Para Transmitir desde la App)

**Ubicación:** `app/src/main/java/com/example/live/MainActivity.kt`

**Líneas:** 45-46

### Valores Actuales (Hardcodeados):

```kotlin
companion object {
    private const val STREAM_URL = "rtmps://78f8fda0de45.global-contribute.live-video.net:443/app/"
    private const val STREAM_KEY = "sk_us-east-1_HgHfUNH6SSu5_1IkuaGrbL9Rvv10FzCjvxT7mBOqMf5"
}
```

### ⚠️ **IMPORTANTE:**
Estos valores están **hardcodeados** en el código. Si necesitas cambiarlos:
1. Edita `MainActivity.kt`
2. Cambia las constantes `STREAM_URL` y `STREAM_KEY`
3. Recompila la app

---

## 📋 Resumen de Parámetros

| Parámetro | WordPress | Android App | Uso |
|-----------|-----------|-------------|-----|
| **Playback URL** | ✅ Sí | ❌ No | Reproducir streaming |
| **Stream Key** | ✅ Sí (opcional) | ✅ Sí | Transmitir |
| **Ingest Endpoint** | ✅ Sí (opcional) | ✅ Sí | Transmitir |

---

## 🔍 Cómo Obtener Estos Valores

### Desde Amazon IVS Console:

1. **Ve a AWS Console:** https://console.aws.amazon.com/ivs
2. **Selecciona tu canal**
3. **En la pestaña "Ingest":**
   - **Ingest Endpoint:** `rtmps://xxx.global-contribute.live-video.net:443/app/`
   - **Stream Key:** `sk_us-east-1_xxx`
4. **En la pestaña "Playback":**
   - **Playback URL:** `https://xxx.playback.live-video.net/.../xxx.m3u8`

---

## 🔧 Valores Actuales Configurados

### WordPress:
- **Playback URL:** (Verificar en WordPress Admin)
- **Stream Key:** (Verificar en WordPress Admin)
- **Ingest Endpoint:** (Verificar en WordPress Admin)

### Android App:
- **STREAM_URL:** `rtmps://78f8fda0de45.global-contribute.live-video.net:443/app/`
- **STREAM_KEY:** `sk_us-east-1_HgHfUNH6SSu5_1IkuaGrbL9Rvv10FzCjvxT7mBOqMf5`

---

## ⚠️ Notas Importantes

1. **Playback URL es OBLIGATORIO** para que funcione `/live/`
2. **Stream Key e Ingest Endpoint** solo son necesarios si vas a transmitir
3. Los valores en la app Android están hardcodeados - necesitas recompilar para cambiarlos
4. Los valores en WordPress se guardan en la base de datos (tabla `wp_options`)

---

## 🛠️ Cómo Verificar Valores Actuales

### En WordPress:
1. Ve a: `https://videoventa.online/wp-admin/admin.php?page=streaming-ivs`
2. Revisa los campos en la sección "Configuración de Amazon IVS"

### En la Base de Datos:
```sql
SELECT option_name, option_value 
FROM wp_options 
WHERE option_name LIKE 'streaming_ivs_%';
```

### En Android:
Abre `MainActivity.kt` y busca las constantes `STREAM_URL` y `STREAM_KEY`

---

## 📝 Recomendación

**Para producción:** Considera mover los valores de la app Android a un archivo de configuración o SharedPreferences para poder cambiarlos sin recompilar.


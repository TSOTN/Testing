# 📁 Carpeta SEO - Pixel & Frames

Esta carpeta contiene todos los archivos de optimización SEO y configuración del servidor para la red social Pixel & Frames.

## 📄 Archivos incluidos

### 1. **robots.txt**
- Archivo de instrucciones para buscadores (Google, Bing, etc.)
- Define qué páginas pueden ser rastreadas
- Especifica ubicación del sitemap
- Configura delays para diferentes bots

**Uso:** Coloca en la raíz del servidor web (`/robots.txt`)

### 2. **sitemap.xml**
- Mapa del sitio XML para buscadores
- Lista todas las secciones principales:
  - Página principal
  - Explorar
  - Crear
  - Mensajería
  - Notificaciones
  - Perfil
- Incluye frecuencia de cambio y prioridad

**Uso:** Referenciado en `robots.txt` y `index.html`

### 3. **.htaccess**
- Archivo de configuración del servidor Apache
- **Rewrite Rules:** Redirige HTTP a HTTPS, www a non-www
- **Cache:** Configuración de caché para navegadores (1 año imágenes, 1 mes CSS/JS, 1 semana HTML)
- **Gzip:** Compresión automática de contenido
- **Headers de Seguridad:** X-Frame-Options, CSP, XSS Protection
- **Protección:** Bloquea acceso a archivos sensibles

**Uso:** Coloca en la raíz del servidor web (`/.htaccess`)

### 4. **manifest.json**
- Archivo de configuración para PWA (Progressive Web App)
- Define nombre, descripción e iconos de la app
- Permite instalación en dispositivos móviles
- Incluye accesos directos a funciones principales (Crear, Explorar)
- Configuración de tema y visualización

**Uso:** Referenciado en `index.html` con `<link rel="manifest" href="seo/manifest.json">`

## 🚀 Cómo usar estos archivos

### En desarrollo (localhost):
- Los archivos HTML con SEO ya funcionan localmente
- El `.htaccess` requiere servidor Apache habilitado
- El `manifest.json` funciona con HTTPS en producción

### En producción:
1. **robots.txt** → Coloca en la raíz web (actualiza URLs)
2. **sitemap.xml** → Coloca en raíz o referencia en robots.txt
3. **.htaccess** → Coloca en raíz (requiere Apache con mod_rewrite)
4. **manifest.json** → Mantén en `/seo/manifest.json` o raíz

## 📊 Beneficios SEO implementados

✅ **Indexación mejorada:** Robots.txt y Sitemap permiten rastreo eficiente  
✅ **Estructura clara:** Metadata, Open Graph, Twitter Card  
✅ **Performance:** Caché, compresión Gzip  
✅ **Seguridad:** Headers de seguridad, CSP  
✅ **PWA:** Instalable en móviles como app nativa  
✅ **Accesibilidad:** aria-labels, roles semánticos  
✅ **Redes sociales:** Vista previa mejorada al compartir  

## 🔧 Personalización requerida

Antes de producción, actualiza estas URLs en los archivos:

**sitemap.xml:**
```xml
<loc>https://pixelandframes.com/</loc>  <!-- Cambiar por tu dominio -->
```

**robots.txt:**
```
Sitemap: https://pixelandframes.com/seo/sitemap.xml  <!-- Cambiar dominio -->
```

**.htaccess:**
- Verificar que Apache está instalado con `mod_rewrite` habilitado
- Ajustar rutas según estructura del servidor

**manifest.json:**
```json
"start_url": "/?utm_source=pwa"  <!-- Cambiar dominio si aplica -->
```

## 📚 Referencias

- [Google SEO Starter Guide](https://developers.google.com/search)
- [Robots.txt Documentation](https://www.robotstxt.org/)
- [XML Sitemap Protocol](https://www.sitemaps.org/)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [.htaccess Documentation](https://httpd.apache.org/docs/current/howto/htaccess.html)

---

**Última actualización:** 3 de diciembre, 2025  
**Mantenido por:** Pixel & Frames Development Team

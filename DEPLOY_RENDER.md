# 🎨 Guía Paso a Paso: Desplegar en Render

## 📋 Requisitos Previos

1. ✅ Cuenta en [Render](https://render.com) (gratis con GitHub/Email)
2. ✅ Proyecto en GitHub (si no lo tienes, te ayudo a crearlo)
3. ✅ Backend funcionando localmente

---

## 🎯 PASO 1: Preparar el Repositorio en GitHub

### 1.1. Inicializar Git (si no lo has hecho)

```bash
git init
git add .
git commit -m "Preparado para deploy en Render"
```

### 1.2. Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) → **New Repository**
2. Nombre: `pixel-frames` (o el que prefieras)
3. **NO** marques "Initialize with README"
4. Click en **Create repository**

### 1.3. Conectar tu proyecto local con GitHub

```bash
git remote add origin https://github.com/TU-USUARIO/pixel-frames.git
git branch -M main
git push -u origin main
```

**⚠️ IMPORTANTE**: Reemplaza `TU-USUARIO` con tu usuario de GitHub.

---

## 🎨 PASO 2: Configurar Render

### 2.1. Crear cuenta en Render

1. Ve a [render.com](https://render.com)
2. Click en **Get Started for Free**
3. Elige **Sign up with GitHub** (recomendado) o con email
4. Autoriza Render para acceder a tus repositorios

### 2.2. Crear nuevo servicio Web Service (Backend)

1. En el Dashboard de Render, click en **+ New** → **Web Service**
2. Selecciona **Connect account** si aún no lo has hecho
3. Busca y selecciona tu repositorio `pixel-frames`
4. Render detectará automáticamente tu proyecto

---

## ⚙️ PASO 3: Configurar el Backend en Render

### 3.1. Configuración básica del servicio

En la pantalla de configuración, verás estos campos:

**Name**: 
- Pon: `pixel-frames-backend` (o el nombre que prefieras)

**Region**: 
- Elige la región más cercana a ti (ej: `Frankfurt` para Europa, `Oregon` para USA)

**Branch**: 
- Deja `main` (o la rama que uses)

**Root Directory**: 
- Pon: `backend` (importante: Render necesita saber dónde está tu backend)

**Runtime**: 
- Debería detectar automáticamente `Node`
- Si no, selecciónalo manualmente

**Build Command**: 
- Pon: `npm install`
- (Render ejecutará esto dentro de la carpeta `backend`)

**Start Command**: 
- Pon: `npm start`
- (Esto ejecutará `node server.js` según tu `package.json`)

### 3.2. Plan (Gratis)

- Selecciona **Free** (tiene límites pero suficiente para empezar)
- ⚠️ **Nota**: En el plan gratuito, el servicio se "duerme" después de 15 minutos de inactividad y tarda unos segundos en despertar

---

## 🗄️ PASO 4: Configurar Base de Datos PostgreSQL

### 4.1. Crear servicio de PostgreSQL

1. En el Dashboard de Render, click en **+ New** → **PostgreSQL**
2. Configura:
   - **Name**: `pixel-frames-db` (o el nombre que prefieras)
   - **Database**: `red_social` (o déjalo por defecto)
   - **User**: Déjalo por defecto o pon `postgres`
   - **Region**: Misma región que elegiste para el backend
   - **PostgreSQL Version**: `16` (o la más reciente)
   - **Plan**: **Free** (tiene límite de 90 días, suficiente para pruebas)

3. Click en **Create Database**

### 4.2. Obtener las variables de conexión

1. Una vez creada la base de datos, entra al servicio PostgreSQL
2. Ve a la pestaña **Connections**
3. **Anota estos valores** (los necesitarás):
   - **Internal Database URL** (o los valores individuales):
     - `Host`
     - `Port`
     - `Database`
     - `User`
     - `Password`

---

## 🔗 PASO 5: Conectar la Base de Datos al Backend

### 5.1. Añadir variables de entorno al Backend

1. Ve a tu servicio **Web Service** (el backend)
2. Ve a la pestaña **Environment**
3. Click en **Add Environment Variable** y añade estas variables:

```
DB_HOST = [valor de Host que copiaste]
DB_PORT = [valor de Port que copiaste]
DB_USER = [valor de User que copiaste]
DB_PASSWORD = [valor de Password que copiaste]
DB_NAME = [valor de Database que copiaste]
```

**💡 TIP**: Si Render te muestra un **"Internal Database URL"**, puedes usar esa URL directamente. Si prefieres variables individuales, usa los valores que copiaste.

### 5.2. Opción alternativa: Usar Internal Database URL

Si Render te da una URL completa tipo:
```
postgresql://user:password@host:port/database
```

Puedes crear una variable:
```
DATABASE_URL = postgresql://user:password@host:port/database
```

Y luego modificar `backend/db.js` para usar esa URL (te ayudo si necesitas esto).

---

## 🌐 PASO 6: Obtener la URL del Backend

1. En tu servicio Web Service (backend), ve a la pestaña **Settings**
2. Busca la sección **Environment**
3. Scroll hacia abajo hasta **Public URL** o **Service URL**
4. Render te dará una URL tipo: `https://pixel-frames-backend.onrender.com`
5. **¡COPIA ESTA URL!** La necesitarás para el frontend

**⚠️ IMPORTANTE**: 
- En el plan gratuito, la primera vez que accedas después de 15 minutos de inactividad, puede tardar 30-60 segundos en "despertar"
- Esto es normal y no es un error

---

## 🎨 PASO 7: Actualizar el Frontend

### 7.1. Actualizar script.js con la URL de Render

1. Abre `script.js`
2. Busca esta línea (alrededor de la línea 265):
   ```javascript
   : 'https://TU-BACKEND-URL.up.railway.app';
   ```
3. Reemplázala con la URL real que copiaste en el paso 6
4. Debería quedar algo así:
   ```javascript
   : 'https://pixel-frames-backend.onrender.com';
   ```

### 7.2. Subir cambios a GitHub

```bash
git add script.js
git commit -m "Actualizar URL del backend para Render"
git push
```

---

## 🚀 PASO 8: Desplegar el Frontend

Tienes **2 opciones**:

### **Opción A: Frontend en Vercel/Netlify (Recomendado - Más fácil y rápido)**

1. Ve a [vercel.com](https://vercel.com) o [netlify.com](https://netlify.com)
2. Login con GitHub
3. Click en **Add New Project** → selecciona tu repositorio
4. Configura:
   - **Framework Preset**: Otro / Static
   - **Root Directory**: `/` (raíz)
   - **Build Command**: (dejar vacío, es estático)
   - **Output Directory**: `/` (raíz)
5. Click en **Deploy**
6. ¡Listo! Tu frontend estará en una URL tipo `https://tu-app.vercel.app`

### **Opción B: Frontend también en Render (Todo en un solo lugar)**

1. En Render, click en **+ New** → **Static Site**
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Name**: `pixel-frames-frontend`
   - **Branch**: `main`
   - **Root Directory**: `/` (raíz)
   - **Build Command**: (dejar vacío)
   - **Publish Directory**: `/` (raíz)
4. Click en **Create Static Site**
5. Render te dará una URL tipo `https://pixel-frames-frontend.onrender.com`

---

## ✅ PASO 9: Verificar que Todo Funciona

1. Abre la URL de tu frontend desplegado
2. Abre la consola del navegador (F12)
3. Deberías ver:
   - `🌐 Conectando a backend en producción: https://...`
   - `✅ ¡Conexión exitosa con backend en producción!`
   - `📦 Posts cargados: X posts recibidos del backend`

**⚠️ Si es la primera vez después de 15 minutos de inactividad:**
- Puede tardar 30-60 segundos en cargar (el servicio está "durmiendo")
- Esto es normal en el plan gratuito de Render
- Después de la primera carga, debería funcionar rápido

---

## 🐛 Solución de Problemas

### El backend no inicia en Render

1. Ve a tu servicio Web Service → pestaña **Logs**
2. Revisa los errores más recientes
3. Problemas comunes:
   - **Variables de entorno incorrectas**: Verifica que `DB_HOST`, `DB_USER`, etc. estén correctas
   - **Puerto incorrecto**: El backend ya está configurado para usar `process.env.PORT` (correcto)
   - **Dependencias faltantes**: Verifica que `package.json` tenga todas las dependencias

### Error de conexión a la base de datos

1. Verifica que las variables de entorno estén correctas:
   - Ve a **Environment** → revisa cada variable
2. Asegúrate de usar la **Internal Database URL** o los valores **internos** de Render
   - ⚠️ **NO uses** la URL pública de la base de datos, usa la interna

### CORS errors en el frontend

1. El backend ya tiene `cors()` habilitado (correcto)
2. Si aún hay problemas, verifica que la URL del backend en `script.js` sea correcta
3. Asegúrate de que no haya espacios o caracteres extraños en la URL

### El frontend no carga datos

1. Abre la consola del navegador (F12) y revisa los errores
2. Verifica que la URL del backend en `script.js` sea la correcta
3. Prueba la URL del backend directamente en el navegador:
   - `https://tu-backend.onrender.com/api/posts`
   - Deberías ver JSON con los posts
4. Si el servicio está "dormido", espera 30-60 segundos y recarga

### El servicio tarda mucho en responder

- **Es normal en el plan gratuito**: Render "duerme" los servicios después de 15 minutos de inactividad
- La primera petición después de dormir tarda 30-60 segundos
- Las siguientes peticiones son rápidas
- Para evitar esto, puedes usar un servicio de "ping" que mantenga el servicio despierto (hay servicios gratuitos para esto)

---

## 📝 Notas Importantes sobre Render

### Plan Gratuito:
- ✅ **500 horas gratis al mes** (suficiente para desarrollo)
- ✅ **Base de datos PostgreSQL gratuita** (90 días, luego se elimina automáticamente)
- ⚠️ **Servicios se "duermen"** después de 15 minutos de inactividad
- ⚠️ **Primera carga lenta** después de dormir (30-60 segundos)

### Para Producción Real:
- Considera el plan **Starter** ($7/mes) para evitar que el servicio se duerma
- O usa un servicio de "ping" gratuito para mantenerlo despierto
- Añade autenticación y seguridad adicional

---

## 🎉 ¡Listo!

Si sigues estos pasos, tendrás tu aplicación funcionando en Render. 

**Resumen rápido:**
1. ✅ Backend en Render (Web Service)
2. ✅ Base de datos PostgreSQL en Render
3. ✅ Variables de entorno configuradas
4. ✅ Frontend actualizado con la URL de Render
5. ✅ Frontend desplegado (Vercel/Netlify o Render)

Si tienes algún problema en algún paso, dímelo y te ayudo a resolverlo. 🚀


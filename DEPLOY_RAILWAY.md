# 🚂 Guía Paso a Paso: Desplegar en Railway

## 📋 Requisitos Previos

1. ✅ Cuenta en [Railway](https://railway.app) (gratis con GitHub)
2. ✅ Proyecto en GitHub (si no lo tienes, te ayudo a crearlo)
3. ✅ Backend funcionando localmente

---

## 🎯 PASO 1: Preparar el Repositorio en GitHub

### 1.1. Inicializar Git (si no lo has hecho)

```bash
git init
git add .
git commit -m "Preparado para deploy en Railway"
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

## 🚂 PASO 2: Configurar Railway

### 2.1. Crear cuenta y conectar GitHub

1. Ve a [railway.app](https://railway.app)
2. Click en **Login** → **Login with GitHub**
3. Autoriza Railway para acceder a tus repositorios

### 2.2. Crear nuevo proyecto

1. Click en **New Project**
2. Selecciona **Deploy from GitHub repo**
3. Busca y selecciona tu repositorio `pixel-frames`
4. Railway empezará a detectar automáticamente tu proyecto

---

## 🗄️ PASO 3: Configurar Base de Datos PostgreSQL

### 3.1. Añadir servicio de PostgreSQL

1. En tu proyecto de Railway, click en **+ New**
2. Selecciona **Database** → **Add PostgreSQL**
3. Railway creará automáticamente una base de datos PostgreSQL

### 3.2. Copiar variables de conexión

1. Click en el servicio **PostgreSQL** que acabas de crear
2. Ve a la pestaña **Variables**
3. **Anota estos valores** (los necesitarás después):
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

---

## ⚙️ PASO 4: Configurar el Backend

### 4.1. Configurar el servicio Backend

1. En Railway, deberías ver un servicio llamado **"pixel-frames"** o similar
2. Si no aparece, click en **+ New** → **GitHub Repo** → selecciona tu repo
3. Click en el servicio del backend

### 4.2. Configurar variables de entorno

1. Ve a la pestaña **Variables**
2. Click en **+ New Variable** y añade estas variables:

```
DB_HOST = [valor de PGHOST que copiaste]
DB_PORT = [valor de PGPORT que copiaste]
DB_USER = [valor de PGUSER que copiaste]
DB_PASSWORD = [valor de PGPASSWORD que copiaste]
DB_NAME = [valor de PGDATABASE que copiaste]
```

**💡 TIP**: Railway puede generar estas variables automáticamente si conectas el servicio de DB al backend (ver paso siguiente).

### 4.3. Conectar la base de datos al backend

1. En el servicio del **backend**, ve a la pestaña **Settings**
2. Busca **"Connect Database"** o **"Add Database"**
3. Selecciona tu servicio PostgreSQL
4. Railway añadirá automáticamente las variables de entorno `DB_*`

### 4.4. Configurar el comando de inicio

1. En el servicio del backend, ve a **Settings**
2. Busca **"Start Command"** o **"Deploy"**
3. Asegúrate de que dice: `cd backend && npm start`
4. Si no, cámbialo manualmente

### 4.5. Configurar el directorio raíz (si es necesario)

1. En **Settings** → **Root Directory**
2. Si Railway no detecta automáticamente, pon: `backend`

---

## 🌐 PASO 5: Obtener la URL del Backend

1. En el servicio del backend, ve a la pestaña **Settings**
2. Busca **"Generate Domain"** o **"Public Domain"**
3. Click en **Generate Domain**
4. Railway te dará una URL tipo: `https://tu-backend-production.up.railway.app`
5. **¡COPIA ESTA URL!** La necesitarás para el frontend

---

## 🎨 PASO 6: Actualizar el Frontend

### 6.1. Actualizar script.js con la URL de producción

1. Abre `script.js`
2. Busca esta línea (alrededor de la línea 263):
   ```javascript
   : 'https://TU-BACKEND-URL.up.railway.app';
   ```
3. Reemplaza `TU-BACKEND-URL.up.railway.app` con la URL real que copiaste en el paso 5
4. Debería quedar algo así:
   ```javascript
   : 'https://tu-backend-production.up.railway.app';
   ```

### 6.2. Subir cambios a GitHub

```bash
git add script.js
git commit -m "Actualizar URL del backend para producción"
git push
```

---

## 🚀 PASO 7: Desplegar el Frontend (Opciones)

Tienes **2 opciones**:

### **Opción A: Frontend en Vercel/Netlify (Recomendado - Más fácil)**

1. Ve a [vercel.com](https://vercel.com) o [netlify.com](https://netlify.com)
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Build Command**: (dejar vacío, es estático)
   - **Publish Directory**: `/` (raíz del proyecto)
4. ¡Listo! Tu frontend estará en una URL tipo `https://tu-app.vercel.app`

### **Opción B: Servir Frontend desde Railway**

1. Modifica el backend para servir archivos estáticos
2. Configura Railway para servir tanto backend como frontend
3. (Más complejo, pero todo en un solo lugar)

---

## ✅ PASO 8: Verificar que Todo Funciona

1. Abre la URL de tu frontend desplegado
2. Abre la consola del navegador (F12)
3. Deberías ver:
   - `🌐 Conectando a backend en producción: https://...`
   - `✅ ¡Conexión exitosa con backend en producción!`
   - `📦 Posts cargados: X posts recibidos del backend`

---

## 🐛 Solución de Problemas

### El backend no inicia
- Verifica que las variables de entorno estén correctas
- Revisa los logs en Railway (pestaña **Deployments** → click en el deployment → **View Logs**)

### Error de conexión a la base de datos
- Verifica que el servicio PostgreSQL esté conectado al backend
- Revisa que las variables `DB_*` estén correctas

### CORS errors en el frontend
- Asegúrate de que el backend tenga `cors()` habilitado (ya lo tienes)
- Verifica que la URL del backend en `script.js` sea correcta

### El frontend no carga datos
- Abre la consola del navegador y revisa los errores
- Verifica que la URL del backend en `script.js` sea la correcta
- Prueba la URL del backend directamente en el navegador: `https://tu-backend.up.railway.app/api/posts`

---

## 📝 Notas Importantes

- **Railway te da 500 horas gratis al mes** (suficiente para desarrollo)
- **La base de datos PostgreSQL es gratuita** pero tiene límites de almacenamiento
- **Las URLs de Railway son públicas** (cualquiera puede acceder si tiene la URL)
- **Para producción real**, considera añadir autenticación y seguridad adicional

---

## 🎉 ¡Listo!

Si sigues estos pasos, tendrás tu aplicación funcionando en producción. Si tienes algún problema en algún paso, dímelo y te ayudo a resolverlo.


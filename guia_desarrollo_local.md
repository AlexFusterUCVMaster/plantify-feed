# Guía de Desarrollo Local - Proyectos React + Supabase

Esta guía está diseñada para ayudarte a configurar y trabajar con **proyectos web de React y Supabase** en tu ordenador local, incluso si no tienes experiencia técnica previa. Con Antigravity (editor de código con IA integrada), podrás hacer cambios y mejoras a cualquier proyecto de forma sencilla.

> **Nota**: En esta guía usaremos **Plantify Feed** como ejemplo, pero los pasos son aplicables a cualquier proyecto React con Supabase.

## Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Configuración Inicial](#configuración-inicial)
3. [Clonar el Repositorio](#clonar-el-repositorio)
4. [Ejecutar la Web en Local](#ejecutar-la-web-en-local)
5. [Desarrollo en Local](#desarrollo-en-local)
6. [Solución de Problemas](#solución-de-problemas)

---

## Requisitos Previos

### ¿Qué es cada herramienta?
- **Antigravity**: Editor de código con IA integrada que te ayuda a programar de forma inteligente
- **Node.js**: El entorno que permite ejecutar JavaScript en tu ordenador
- **npm**: El gestor de paquetes que viene con Node.js, usado para instalar dependencias
- **Git**: Sistema de control de versiones para gestionar cambios en el código
- **GitHub**: Plataforma online donde se aloja el código del proyecto
- **Supabase**: Servicio de backend (base de datos, autenticación, etc.)

### Instalaciones necesarias

1. **Instalar Git**
   - Descarga desde: https://git-scm.com/downloads
   - En Windows, instala con las opciones por defecto
   - Para verificar: abre una terminal y escribe `git --version`

2. **Instalar Node.js y npm**
   - Descarga la versión LTS desde: https://nodejs.org/en/download
   - Instala con las opciones por defecto
   - Para verificar: abre una terminal y ejecuta:
     ```bash
     node --version
     npm --version
     ```
   - Deberías ver los números de versión de cada uno

3. **Crear cuenta en GitHub**
   - Ve a https://github.com y crea una cuenta si no tienes una
   - Verifica tu email

---

## Configuración Inicial

### Configurar SSH para GitHub

SSH permite conectarte a GitHub de forma segura sin tener que escribir tu contraseña cada vez.

1. **Abrir una terminal**
   - En Windows: Busca "PowerShell" o "Terminal" en el menú inicio
   - En Mac/Linux: Busca "Terminal" en aplicaciones

2. **Generar una clave SSH**
   ```bash
   ssh-keygen -t ed25519 -C "tu_email@ejemplo.com"
   ```
   - Sustituye `tu_email@ejemplo.com` por tu email de GitHub
   - Presiona Enter cuando te pregunte dónde guardar (usará la ubicación por defecto)
   - Presiona Enter dos veces para no usar contraseña (o pon una si prefieres)

3. **Copiar la clave pública**
   - En Windows/Mac/Linux, muestra el contenido con:
     ```bash
     cat ~/.ssh/id_ed25519.pub
     ```
   - Copia todo el texto que aparece (empieza con `ssh-ed25519`)

4. **Añadir la clave a GitHub**
   - Ve a GitHub → Settings → SSH and GPG keys → New SSH key
   - Pega la clave que copiaste
   - Dale un nombre descriptivo (ej: "Mi laptop")
   - Click en "Add SSH key"

5. **Verificar la conexión**
   ```bash
   ssh -T git@github.com
   ```
   - Escribe "yes" si te pregunta
   - Deberías ver un mensaje de bienvenida de GitHub

---

## Clonar el Repositorio

1. **Crear una carpeta para tus proyectos** (opcional pero recomendado)
   ```bash
   mkdir ~/proyectos
   cd ~/proyectos
   ```

2. **Clonar el repositorio**
   ```bash
   git clone git@github.com:USUARIO/nombre-del-proyecto.git
   ```
   - Sustituye `USUARIO/nombre-del-proyecto` por la URL de tu repositorio
   - Ejemplo: `git clone git@github.com:AlexFusterUCVMaster/plantify-feed.git`
   - Esto descargará todo el código del proyecto
   - Se creará una carpeta con el nombre del proyecto

3. **Entrar en la carpeta del proyecto**
   ```bash
   cd nombre-del-proyecto
   ```
   - Ejemplo: `cd plantify-feed`

---

## Ejecutar la Web en Local

1. **Abrir el proyecto en Antigravity**
   - Abre Antigravity
   - Abre la carpeta del proyecto que clonaste

2. **Abrir una terminal**
   - En el editor: abre una terminal (busca la opción Terminal o usa el atajo Ctrl+` / Cmd+`)
   - La terminal se abrirá en la parte inferior

3. **Instalar las dependencias**
   ```bash
   npm install
   ```
   - Esto descarga todas las librerías que necesita el proyecto
   - Puede tardar 1-3 minutos la primera vez
   - Verás una carpeta `node_modules` crearse

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   - Esto inicia un servidor local con tu aplicación
   - Verás un mensaje como: `Local: http://localhost:5173/`
   - **Nota**: El puerto puede ser 5173, 5174, o similar (no 8080)

5. **Ver la web en el navegador**
   - Abre tu navegador (Chrome, Firefox, etc.)
   - Ve a la URL que aparece en la terminal (generalmente http://localhost:5173/)
   - ¡Ya deberías ver la aplicación funcionando!

6. **Hacer cambios y ver resultados**
   - Con el servidor corriendo, cualquier cambio que hagas en los archivos se verá automáticamente en el navegador
   - Esto se llama "Hot Reload" o "recarga en caliente"
   - No necesitas reiniciar el servidor

7. **Detener el servidor**
   - Presiona `Ctrl + C` en la terminal donde está corriendo
   - Para volver a iniciarlo: `npm run dev`


---

## Desarrollo en Local

### Usar Antigravity (IA Integrada)

Antigravity es el editor con IA integrada que te ayudará a programar:

1. **Activar el asistente de IA**
   - Presiona `Cmd/Ctrl + K` para editar código inline
   - Presiona `Cmd/Ctrl + L` para abrir el chat con la IA
   
2. **Cómo usarlo**
   - Selecciona código y pregúntale qué hace
   - Pídele que cree nuevas funcionalidades
   - Pídele que corrija errores
   - Pídele que explique conceptos que no entiendas

3. **Ejemplos de prompts útiles**
   - "Explica qué hace este componente"
   - "Añade un botón para eliminar posts"
   - "Corrige este error: [pegar error]"
   - "¿Cómo puedo hacer que esta página sea responsive?"

### Trabajar con el Frontend (React)

El frontend es la parte visual de la aplicación que ves en el navegador.

#### Estructura típica del proyecto
- `src/`: Código fuente de la aplicación
  - `components/`: Componentes reutilizables (botones, tarjetas, etc.)
  - `pages/`: Las diferentes páginas de la aplicación
  - `hooks/`: Lógica reutilizable (custom hooks)
  - `lib/`: Utilidades y configuraciones
  - `integrations/supabase/`: Configuración de Supabase

> **Nota**: La estructura puede variar según el proyecto, pero estos son los directorios más comunes en proyectos React.

#### Hacer cambios
1. **Editar archivos**
   - Navega por los archivos en el panel izquierdo del editor
   - Haz doble click para abrir un archivo
   - Edita el código o pídele a la IA que lo haga

2. **Ver los cambios**
   - Con `npm run dev` corriendo, los cambios se verán automáticamente
   - Si algo no funciona, revisa la consola del navegador (F12)

3. **Guardar cambios en Git**
   
   **Ver qué archivos has modificado:**
   ```bash
   git status
   ```
   
   **Preparar archivos para commit (staging):**
   ```bash
   git add .
   ```
   - El `.` añade todos los archivos modificados
   - O especifica archivos individuales: `git add src/components/Header.tsx`
   
   **Hacer commit (guardar cambios localmente):**
   ```bash
   git commit -m "Descripción breve de tus cambios"
   ```
   - Ejemplo: `git commit -m "Añadido botón para eliminar posts"`
   
   **Subir cambios a GitHub:**
   ```bash
   git push
   ```
   - Esto sube tus commits al repositorio remoto
   - Ahora otros colaboradores pueden ver tus cambios

4. **Compilar para producción**
   ```bash
   npm run build
   ```
   - Esto crea una versión optimizada en la carpeta `dist/`
   - Estos archivos son los que se suben al hosting

#### Desplegar la aplicación (hacerla pública)

Para que tu aplicación esté disponible en Internet, necesitas un servicio de hosting. Aquí tienes varias opciones gratuitas:

**Opción 1: Cloudflare Pages (Recomendado - Gratis)**
1. Crea cuenta en https://pages.cloudflare.com/
2. Conecta tu repositorio de GitHub
3. Configura:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Cloudflare automáticamente desplegará cada vez que hagas push

**Opción 2: Vercel (Alternativa - Gratis)**
1. Crea cuenta en https://vercel.com/
2. Importa tu repositorio de GitHub
3. Vercel detectará automáticamente que es un proyecto Vite
4. Click en Deploy

**Opción 3: Netlify (Alternativa - Gratis)**
1. Crea cuenta en https://netlify.com/
2. Drag & drop la carpeta `dist/` después de hacer `npm run build`
3. O conecta tu repositorio para deploys automáticos

### Trabajar con el Backend (Supabase)

El backend maneja la base de datos, autenticación y funciones del servidor.

#### Configurar Supabase CLI

1. **Instalar Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Iniciar sesión en Supabase**
   ```bash
   npx supabase login
   ```
   - Se abrirá tu navegador para autenticarte
   - Acepta los permisos

3. **Vincular tu proyecto local con Supabase**
   ```bash
   npx supabase link
   ```
   - Selecciona tu proyecto de la lista (si tienes varios)
   - Introduce la contraseña de la base de datos si te la pide
   - Esta info la puedes encontrar en el dashboard de Supabase:
     - Ve a: https://supabase.com/dashboard
     - Selecciona tu proyecto
     - Settings → Database → Connection string

#### Modificar la Base de Datos

Las "migrations" son archivos SQL que definen cambios en la estructura de la base de datos.

1. **Crear una nueva migration**
   ```bash
   npx supabase migration new nombre_descriptivo
   ```
   - Ejemplo: `npx supabase migration new add_comments_table`
   - Se creará un archivo en `supabase/migrations/`

2. **Editar la migration**
   - Abre el archivo creado en el editor
   - Añade tu código SQL, o pídele a la IA:
     - "Crea una tabla de comentarios con usuario, texto y fecha"
     - "Añade una columna 'likes' a la tabla posts"
   
   Ejemplo de migration:
   ```sql
   -- Crear tabla de comentarios
   CREATE TABLE comments (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     content TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Aplicar la migration (subirla a Supabase)**
   ```bash
   npx supabase db push
   ```
   - Esto ejecuta el SQL en tu base de datos de Supabase
   - Verifica los cambios en el dashboard de Supabase

4. **Ver el estado de las migrations**
   ```bash
   npx supabase migration list
   ```

#### Modificar Edge Functions

Las Edge Functions son funciones serverless que se ejecutan en el servidor de Supabase.

1. **Ver las funciones existentes**
   - Están en la carpeta `supabase/functions/`
   - Cada función tiene su propia carpeta con un archivo `index.ts`

2. **Crear una nueva función**
   ```bash
   npx supabase functions new mi-funcion
   ```

3. **Editar la función**
   - Abre el archivo `supabase/functions/mi-funcion/index.ts`
   - Escribe tu lógica o pídele a la IA

4. **Desplegar la función**
   ```bash
   npx supabase functions deploy mi-funcion
   ```
   - Para desplegar todas: `npx supabase functions deploy`

5. **Ver logs de la función**
   ```bash
   npx supabase functions logs mi-funcion
   ```

#### Gestionar Variables de Entorno

Las variables de entorno guardan información sensible como claves API.

**Obtener credenciales de Supabase:**
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Settings → API
4. Copia la `URL` y la `anon/public key`

1. **Variables locales (desarrollo)**
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Añade tus variables (puedes encontrarlas en el dashboard de Supabase → Settings → API):
     ```
     VITE_SUPABASE_URL=tu_url_de_supabase
     VITE_SUPABASE_ANON_KEY=tu_clave_anonima
     ```
   - **Importante**: El prefijo `VITE_` es necesario para que Vite exponga las variables al frontend
   - **Nunca** subas este archivo a GitHub (debe estar en `.gitignore`)

2. **Variables en Supabase (producción)**
   - Ve a tu proyecto en Supabase Dashboard
   - Settings → Edge Functions → Secrets
   - Añade las variables necesarias para tus functions

---

## Solución de Problemas

### Problemas Comunes

#### Error: "Command not found"
**Problema**: El sistema no encuentra el comando `npm`, `git`, etc.
**Solución**: 
- Verifica que instalaste correctamente la herramienta
- Reinicia la terminal
- En Windows, puede que necesites reiniciar el ordenador

#### Error al hacer `npm install`
**Problema**: Fallos al instalar dependencias
**Solución**:
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Error: "Port already in use"
**Problema**: El puerto 5173 ya está siendo usado
**Solución**:
- Cierra otros servidores que estén corriendo
- O mata el proceso:
  - En Linux/Mac: `lsof -ti:5173 | xargs kill`
  - En Windows: `netstat -ano | findstr :5173` y luego `taskkill /PID [número] /F`

#### La página no se actualiza automáticamente
**Problema**: Los cambios no se reflejan en el navegador
**Solución**:
- Guarda el archivo (Cmd/Ctrl + S)
- Recarga el navegador con Ctrl + Shift + R (recarga sin cache)
- Reinicia el servidor (`Ctrl + C` y luego `npm run dev`)

#### Error de permisos en Git
**Problema**: No puedes hacer push
**Solución**:
- Verifica que configuraste correctamente SSH
- Comprueba que tienes permisos en el repositorio
- Si usas HTTPS en lugar de SSH, te pedirá credenciales

#### Error de TypeScript
**Problema**: Errores de tipos en el código
**Solución**:
- Lee el mensaje de error (te dice qué falta o está mal)
- Pídele a la IA que lo corrija
- Verifica que todas las dependencias estén instaladas

### Comandos Útiles de Git

```bash
# Ver el estado actual
git status

# Ver el historial de commits
git log --oneline

# Descargar cambios del repositorio remoto
git pull

# Ver diferencias en archivos modificados
git diff

# Deshacer cambios en un archivo (antes de commit)
git checkout -- nombre_archivo

# Volver a un commit anterior (cuidado, pierdes cambios no guardados)
git reset --hard commit_id

# Crear y cambiar a una nueva rama
git checkout -b nombre-rama

# Ver todas las ramas
git branch -a

# Cambiar de rama
git checkout nombre-rama

# Fusionar una rama en la actual
git merge nombre-rama
```

### Recursos Adicionales

- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **Supabase**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Git**: https://git-scm.com/doc

### Consejos Finales

1. **Haz commits frecuentes**: Mejor muchos commits pequeños que uno grande
2. **Escribe mensajes de commit claros**: Describe qué hiciste y por qué
3. **Prueba antes de hacer push**: Asegúrate de que todo funciona antes de subir cambios
4. **Usa ramas**: Para funcionalidades nuevas, crea una rama nueva (ej: `feature/nuevo-boton`)
5. **Pide ayuda a la IA**: No dudes en preguntarle cualquier cosa que no entiendas
6. **Lee los errores**: Los mensajes de error suelen indicar exactamente qué está mal










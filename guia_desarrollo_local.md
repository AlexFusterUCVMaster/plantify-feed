# Guía desarrollo local

## Clone repository
* Abre una terminal y clona el repositorio de github linkado desde Lovable.
```
git clone https://github.com/AlexFusterUCVMaster/plantify-feed-66.git
```

## Instala cursor, node y NPM
* Node + npm : https://nodejs.org/en/download
* Para comprobar la instalación, abre una terminal y prueba los comandos ```node``` y ```npm```

## Ejecutar la web en local
* Abre la carpeta clonada en cursor
* Abre una terminal en cursor y ejecuta ```npm install``` para instalar las dependiencias
* En la terminal, ejecuta ```npm run dev``` para levantar la página.
* Con la página levantada, podrás verla en el navegador en http://localhost:8080/

## Desarrollo en local
### Front
* Para el front, cualquier cambio que hagas en el código que tienes en la carpeta clonada (react) se reflejará en la web que estás ejecutando en local. Si quieres subir tus cambios a github, usa los comandos ```git commit``` y ```git push```
* Para que la web esté pública, hay que darle hosting en algún sitio. Recomiendo el uso de Cloudflare, pero hay otras alternativas.
* Para "compilar" el front se usa el comando ```npm run build```. El cómo desplegar dependerá del hosting elegido.

### Back (Supabase)
Nuestro backend es la base de datos de supabase, el storage, la autenticación y las edge functions. Los cambios más habituales que se pueden querer hacer aquí son modificaciones a la base de datos o a las functions.
* Lo primero, para conectar tu repo local con supabase:
```npx supabase login``` y ```npx supabase link```. Al hacer link, deberías de ver tu repositorio.
* Para hacer cambios en la base de datos, hay que crear nuevas migrations con ```npx supabase migration new MIGRATION_NAME``` con el nombre que quieras. Las migrations son cambios que se aplican de más antiguo a más reciente. Es una forma de llevar un control de versiones de la base de datos. Verás una nueva migración en el directorio *supabase/migrations*. Puedes modificarla o pedirle a la IA que lo haga según los cambios que quieres aplicar. Cuando esté listo, puedes subirla a supabase con ```npx supabase db push```
* Puedes añadir o modificar funciones en el directorio *supabase/functions* Para subir los cambios a supabase ejecuta ```npx supabase functions deploy```










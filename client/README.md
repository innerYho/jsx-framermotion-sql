    # create project with vite
    vite es un empaqutador qur funciona en el mismo ecosistema de npm
    está integrado con SWC, el cual es un copilador web 20 veces más rápido que Babel (aprox), SWX esta escrito en Rust :3
npm create vite@latest "name project"
npm i framer-motion -E

    # Tailwindcss es un framework como bootstrap, al hacer una build del proyecto empaqueta el ccs necesario en funcion a las propiedades que usamos en el proyecto; haciendolo mucho más liviano. 
npm i axios  daisyui
npm install -D tailwindcss
npx tailwindcss init

    # alertas
npm i sweetalert2 

    # variables de entorno. se encuentra en la carpeta data/url.js Normalmente no se suben a git.

npm i react-router-dom

npm run dev



// const isProduction = true;
const isProduction = false;

module.exports = { isProduction };



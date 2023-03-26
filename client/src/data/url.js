
// const prod = true; // no se actualiza en git
// con ello siempre estará prod en verdadero
const prod = false; // avilitado solo para entorno de pruebas

export let url;

prod === true
    ? (url = "http://10.255.255.24:9876")
    : (url = "http://localhost:9876");
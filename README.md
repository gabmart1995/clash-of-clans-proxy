# Clash of Clans API Proxy
Este proyecto personal es una forma de obtener información acerca de
los estadisticas, personajes, tropas, eventos, jugadores y clanes del videojuego
famoso "Clash of Clans".

## El problema:
Para el uso del API, debes registrarte y añadir direcciones IP públicas validas que se
usarán para consultar los datos. Es una fuente de datos cerrada y no permite consultar
desde el navegador. Además de que incluye token de autenticación JWT, que no debe ser 
utilizadas por el navegador

## La solución:
Crear un servidor proxy, desde donde se puedan hacer las peticiones http desde las
direcciones IP autorizadas, teniendo las credenciales de acceso. El cliente cree que
esta consultando la API directamente desde el frontend, pero el Proxy la intercepta, la recibe y transforma la peticion, luego ejecuta la petición y copia la respuesta del servidor hacia el cliente.

### Instalación
- Debes registrarte en la plataforma de desarrollo de su [API](https://developer.clashofclans.com) y generar un token JWT, una vez copiado debes llenar el env.example y cambiarlo a .env

- Para el frontend puedes ejecutarlo con un servidor estatico node.js, PHP, apache, nginx
o localmente en el navegador ya que son archivos estaticos.

- El proxy debe ser ejecutado utiliza GO como lenguaje de programacion utiliza los 
comandos para cargar las dependencias `go mod tidy` y ejecutarlo `go run .` 
el proxy corre en el puerto 8080.

- Puedes compilarlo para más portabilidad `go build .` y ejecutar el binario


### Agradecimientos
Al equipo de supercell por desarrollar el API para la comunidad de desarrolladores.

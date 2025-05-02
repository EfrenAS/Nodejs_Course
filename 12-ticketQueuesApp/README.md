# Rest Project + TypeScript

El objetivo de este proyecto es conectar los Websockets con nuestro Restful API ya así poder disparar la comunicación en tiempo real cuando los eventos sucedan.

Se crea una aplicación de colas, similar a la que se utiliza en lugares donde hay salas de espera, para que la persona imprima un papel con su número y hay una pantalla que muestra cuál es el ticket que se está atendiendo y en dónde.

Puntualmente aprenderemos y reforzaremos:

- Websockets

- Restful

- Conectar WebSockets con Restful

- Vanilla JavaScript para el frontend

- Servicios

Lógica relacionada para el funcionamiento de la aplicación

## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

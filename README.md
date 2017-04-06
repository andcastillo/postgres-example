# postgres-example

nodejs container: https://hub.docker.com/_/node/

## Crear el proyecto en github

Crear una carpeta que se llame postgres-example
```
mkdir postgres-example
cd postgres-example
```



Crear un archivo que se llame package.json con el siguiente contenido. Reemplazar XXX por su nombre de usuario en github

```
{
  "name": "postgres-example",
  "version": "1.0.0",
  "description": "Server para consultar una base de datos postgres",
  "author": "XXX",
  "repository": "XXX/postgres-example",
  "bugs": {
    "url": "https://github.com/XXX/postgres-example/issues"
  },
  "homepage": "https://github.com/XXX/postgres-example",
  "license": "MIT",
  "main": "./src/index.js",
  "scripts": {
    "start": "node src/index.js"
  },

  "dependencies": {
    "express":"4.15.1",
    "supervisor": "0.11.0",
    "pg":"6.1.0"
  }
}
```
Crear una carpeta src para almacenar el código fuente de la apliación:
```
mkdir src
```
Crear el primer archivo para nuestro primer servicio web que escuchará en el puerto 8888 en src/index.js
```
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8888, function () {
  console.log('Example app listening on port 8888!')
})
```

Crear un repositorio en github para guardar este proyecto


## Docker con nodejs y npm

Los siguientes pasos fueron tomados de este tutorial:

http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WOQVQiErKAI

Crear el Dockerfile con el siguiente contenido

```
FROM node:6-onbuild
# replace this with your application's default port
EXPOSE 8888
```
Arrancar construir y arrancar el contenedor de nodejs

```
sudo docker build -t node-app .
sudo docker run -it --rm -p 8888:8888 --name my-server-app node-app
sudo docker run -it --rm -p 8888:8888 --link some-postgres:postgres --name my-server-app node-app
```
El contenedor correra la aplciacion que se encuentre referenciada por el archivo package.json

El contenedor de postgres debe estar corriendo y debe llamarse some-postgres

```
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d andcastillo/postgres_db_musica
```

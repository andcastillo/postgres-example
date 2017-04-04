# postgres-example

Descargar el contenedor de node: https://hub.docker.com/_/node/
```
docker pull node
```
Seguir los pasos en este tutorial para crear nuestro primer servidor con express

http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WOQVQiErKAI

Crear el Dockerfile con el siguiente contenido

```
FROM node:4-onbuild
# replace this with your application's default port
EXPOSE 8888
```

sudo docker build -t node-app .
sudo docker run -it --rm --link some-postgres:postgresserver --name my-server-app node-app

El contenedor correra la aplciacion que se encuentre referenciada por el archivo package.json

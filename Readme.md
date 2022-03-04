# Clase 21 - Desarrollo de un servidor web basado en capas completo + Testeo de funcionalidades

Entregable clase 21

## Instalar dependencias

npm install

## Iniciar el servidor

* sin especificar puerto es el 8080

node src/main  

node src/main -p 8181

node src/main --puerto 8181

## ---------------------
## Para la parte 2. Test
## ---------------------
* IMPORTANTE: dentro de la carpeta test_client

## Instalar dependencias

> npm install

instalamos el módulo Mocha como dependencia de desarrollo (dev)
> npm i -D mocha

* Para ejecutar el test:
DENTRO DE LA CARPETA TEST_CLIENT

> npm test

## ---------------------
## RESULTADOS:
## ---------------------
test_client>npm test

> testmocha@1.0.0 test
> mocha test/index.test.js

  Test de pruebas de API de servidor
[2022-03-03T22:24:41.673] [INFO] default - Base de datos conectada...
    √ debería estar el contenedor vacío: GET
    √ debería poder agregar cosas: POST
    √ debería poder leer: GET
    √ debería poder actualizar cosas: PUT
    √ debería poder borrar: DELETE

  5 passing (107ms)
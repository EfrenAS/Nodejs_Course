# MultiplierApp

En esta aplicación se implementa el algoritmo de multiplicación de números, con la finalida de aprender a utlizar métodos de parametrización y la interfaz de usuario de la terminal. Hacemos uso de la librería [yargs](https://www.npmjs.com/package/yargs) para gestionar los parámetros de entrada, y fs para guardar los resultados en archivos.

## Conceptos

El objetivo de esta aplicación es crear una aplicación de multiplicación de números, que permita al usuario ingresar un número base y un límite de multiplicación, y que muestre el resultado de la multiplicación en un archivo de texto.

Al igual, empezamos a implementar temas de arquitectura limpia y de diseño de software, con la finalidad de aprender a gestionar la estructura de un proyecto de manera eficiente.

## Install

Para la instalación de dependencias de NodeJS, ejecutar el siguiente comando:

```bash
pnpm install
```

## Run

Después de la instalación de dependencias, ejecutar el siguiente comando para iniciaar el proyecto en modo desarrollo. El comando contiene algunos parámetros de prueba ya establecidos, que se pueden modificar según sea necesario. Se pueden modificar los parámetros y después correr el comando para aplicar los mismos.

```bash
"dev": "tsc && concurrently \"tsc -w\" \"node --watch dist/app.js -b 9 -l 10 -s true -n table-9 -d tables\""
```

```bash
pnpm run dev
```

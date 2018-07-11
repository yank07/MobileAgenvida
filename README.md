# MobileAgenvida
Aplicacion móvil de Agenvida
    
## Iniciando

Instalar Node y Npm  
La manera mas rapidta es a traves NodeJS installer desde el siguiente enlace:  
    
>[https://nodejs.org/](https://nodejs.org/)

Clonar el proyecto:  

```sh
$ git clone https://github.com/yank07/MobileAgenvida.git
```  

Instalar dependencias:  

```sh
$ cd MobileAgenvida
$ npm install
```  
 
Instalar Ionic y Cordova de manera global:

```sh
$ npm install -g ionic cordova
```  

Levantar el proyecto en modo desarrollo:  

```sh
$ ionic serve
```

## Generar APK para Android
### 1. Instalar SDK Android - Linux
- Se puede descargar de: https://developer.android.com/studio/index.html
- Descomprimir el archivo .zip descargado en /usr/local/ 
- Abrir una terminal, acceder al direcorio directorio android-studio/bin/ y ejecutar para iniciar la instalación:
```sh
$ studio.sh
```
- Agregar android-studio/bin/ en la variable de entorno (para iniciar Android Studio desde cualquier directorio)
### 2. Generar APK
- Ejecutar los siguientes comandos:
```sh
$ ionic platform add android 
$ ionic resources
$ ionic build android
```
- El comando build genera un archivo .apk en la carpeta /platforms/android/build/outputs/apk
- Para pasar el apk a un teléfono conectado a la máquina se debe ejecutar:
 ```sh
$ ionic run android
```
**OBS:** el teléfono debe estar en modo desarrollador
      

### Características

Agregadas
* Prettier
* EsLint
    * Prettier plugin
    * Angular plugin

## Calidad del Software

El proyecto fué desarrollado utilizando Prettier, ESLint y SonarLint para garantizar la calidad del Software. Estas tres herramientas se detallan en las siguientes líneas. 

### Prettier 

[github](https://github.com/prettier/prettier/)

Prettier es un formateador de código obstinado. Aplica un estilo coherente al analizar el código y vuelve a imprimirlo con sus propias reglas, que tienen en cuenta la longitud de línea máxima y envuelven el código cuando es necesario.


### ESLint

[github](https://github.com/eslint/eslint)

ESLint es una utilidad de código abierto de JavaScript. Se utiliza identificar e informar sobre patrones, errores de programación y otros encontrados en el código ECMAScript / JavaScript.

El proyecto está configurado con reglas que reportan problemas comunes. Para habilitarlas se incluyó en el archivo de configuración de ESLint la siguiente línea:

> "extends": "eslint:recommended"

Los siguientes plugins de ESLint fueron agregados al proyecto.

#### eslint-plugin-prettier [![Build Status](https://travis-ci.org/prettier/eslint-plugin-prettier.svg?branch=master)](https://travis-ci.org/prettier/eslint-plugin-prettier)

Corre [Prettier](https://github.com/prettier/prettier) como una regla de [ESLint](http://eslint.org) y reporta las diferencias como problemas individuales de ESLint

#### eslint plugin angular [![Npm version](https://img.shields.io/npm/v/eslint-plugin-angular.svg)](https://www.npmjs.com/package/eslint-plugin-angular) [![Npm downloads per month](https://img.shields.io/npm/dm/eslint-plugin-angular.svg)](https://www.npmjs.com/package/eslint-plugin-angular)

[github](https://github.com/Gillespie59/eslint-plugin-angular)

Reglas de ESLint para su proyecto angular con comprobaciones de mejores prácticas, convenciones o posibles errores.

Desde la versión 0.0.4, se han implementado algunas reglas definidas en [John Papa's Guideline](https://github.com/johnpapa/angular-styleguide/blob/master/a1) (que es una guía de buenas prácticas de programacion). 
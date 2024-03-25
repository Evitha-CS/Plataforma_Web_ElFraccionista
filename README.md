## PLATAFORMA DE GESTIÓN Y ANÁLISIS PARA EL VIDEOJUEGO "EL FRACCIONISTA”

Este proyecto fué desarrollado para optar al título de Ingeniería Civil Informática en la Universidad del Bio Bio.

### Instalación

#### Paso 1:
- Opción 1: Descargar el archivo ZIP del proyecto y abrir con Visual Studio Code, o un editor de código fuente similar.
- Opción 2: Crear una carpeta en donde se quiera guardar el proyecto, ingresar a gitbash y ejecutar:

  `git clone https://github.com/Evitha-CS/Plataforma_Web_ElFraccionista.git`

#### Paso 2:

- Crear un archivo llamado ***.env*** dentro de la carpeta ***backend*** y dentro del archivo escribir lo siguiente:

  ```
  MODE=development
  PORT=5000
  DATABASE_URL="mysql://root:@localhost:3306/proyecto"
  JWT_SECRET=JWT_SECRET
  FRONTEND_URL="http://localhost:3000"
  ```
- Luego, se debe crear un archivo ***.env*** pero esta vez dentro de la carpeta  ***frontend***  y se debe escribir lo siguiente:

	```
	NEXT_PUBLIC_BACKEND_URL="http://localhost:5000"
	```

#### Paso 3:

- Crear una base de datos con el nombre ***proyecto***
- Luego importar la base de datos **"PROYECTO.sql"**

### Ejecutar proyecto

Una vez realizados los pasos anteriores se debe tener instalado ***Node js*** en su versión ***v18.13.0*** para que el proyecto pueda ser ejecutado correctamente.

Después de realizado esto, se debe entrar al directorio  ***backend*** y ejecutar el siguiente comando `npm install`, este instalará las dependencias necesarias para el proyecto.

Cuando las dependencias hayan sido instaladas, se debe ejecutar `npm start` para correr la aplicación por el lado del  ***backend*** 

Al ejecutarse el  ***backend*** se debe abrir otra terminal y ejecutar  `npm install` pero esta vez en el directorio ***frontend*** . Terminadas de instalarse las dependencias se debe ejecutar `npm run dev` para correr también la aplicación por el lado del  ***frontend***.

Para verificar que la aplicación se ejecuta correctamente se debe ir a la url *http://localhost:3000* y lo primero que debe aparecer es la pantalla de inicio de sesión de la aplicación.

### Videojuego

En este repositorio solo se encuentra el videojuego ya exportado en el formato WebGL; por lo tanto, no es posible revisar su contenido. Por esa misma razón, se aloja en otro repositorio donde está disponible su versión más actualizada.

https://github.com/Evitha-CS/ElFraccionista-Videojuego.git

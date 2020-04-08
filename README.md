# Eb  Frontend

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Para correr el servidor (Development server)

Primero es necesario instalar las librerias que seran utilizadas, para eso se ejecuta `npm install` (en el mismo directorio donde este el archivo `package.json`).
Ejecutar el comando `ng serve` para correr el servidor en entorno desarrollo. Navegar en `http://localhost:4200/` y seguir instrucciones en la pagina Home.

## Componentes

1. ProfesorHome: Muestra el listado de profesores, con las opciones para agregar, editar y/o eliminar registros.
Se accede mediante la ruta `/profesores`.

2. AlumnoHome: Muestra el listado de alumnos, con las opciones para agregar, editar y/o eliminar registros.
Se accede mediante la ruta `/alumnos`

3. CursoHome: Muestra el listado de cursos, con las opciones para agregar, editar y/o eliminar registros. Para ver los inscritos, hacer click en el boton `Ver Inscritos` para acceder a la vista de inscritos al curso. 
Se accede mediante la ruta `/cursos`

4. CursoInscritosHome: Muestra el listado de alumnos inscritos en un curso dado, con las opciones para agregar, editar y/o eliminar registros. Se accede mediante la ruta `/cursoInscritos/:cursoId`

5. PruebaHome: Muestra el listado de pruebas, con las opciones para agregar, editar y/o eliminar registros.
Se accede mediante la ruta `/pruebas`

6. Home: Muestra la pagina de Bienvenida, con las instrucciones para acceder a cada listado.
Se accede mediante la ruta `/`

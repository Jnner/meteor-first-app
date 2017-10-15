# Pasos realizados hasta ahora
9 ) Añadimos opción de hacer pública/privada las tareas creadas por cada usuario. Mediante 'publish' y 'subscribe' controlamos qué datos manda Meteor a la BDD del lado del cliente.
- Para inhabilitar el 'autopublish package' que viene por defecto: $ meteor remove autopublish
- Añadimos seguridad extra en la API para asegurarnos que un usuario no puede borrar o finalizar tareas si el usuario propietario la ha asignado como privada.

8 ) Añadimos seguridad aprovechando funciones internas de Meteor. Con esto se consigue verificar que cuando se inserten tareas sea solamente un usuario logueado

7 ) Añadiendo cuentas de usuario
- Si se muestra algún error de bcrypt: $ meteor npm install --save bcrypt

6 ) Cambiamos el estado temporal de la UI
- Ocultamos y mostramos las tareas completadas/tachadas
- Añadimos un contador de tareas sin completar

5 ) Actualizamos las tareas mediante un checkbox (tacha la tarea realizada) y borramos tareas mediante un botón

4 ) Insertamos los datos mediante un input usando eventos
- Mostramos las tareas en orden descendente

3 ) Sustituimos el mock que simulaba nuestra BDD por una colección en MongoDB

2 ) Agregamos los estilos

1 ) Hemos agregado el template body

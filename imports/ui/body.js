import {Template} from 'meteor/templating';
import {Tareas} from '../api/tareas.js'; // colección en MongoDB
import './body.html';

Template.body.helpers({
  tareas () { // conectar con MongoDB
    return Tareas.find(
      {}
      ,{ sort: { fechaCreado: -1 } }
    );
  }
});

Template.body.events({
  'submit .nueva-tarea'(evento) {
    evento.preventDefault(); //evitamos el comportamiento de refrescar la página que tiene el form por defecto

    // recogemos los datos del formulario
    const ele = evento.target;
    const texto = ele.texto.value;
    
    // la misma inserción que hicimos antes desde consola, ahora lo hacemos mediante formulario
    Tareas.insert({
      texto: texto
      ,fechaCreado: new Date()
    });

    ele.texto.value = ''; // borrar formulario
  }
});
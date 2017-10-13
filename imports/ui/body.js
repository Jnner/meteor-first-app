import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict'; // para que este paquete de Meteor funcione debemos escribir en la consola:$ meteor add reactive-dict
import {Tareas} from '../api/tareas.js'; // colección en MongoDB
import './tarea.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  tareas () { // conectar con MongoDB
    const instancia = Template.instance(); // si la variable 'ReactiveDict' cambia solo llamamos a esta función para actualizar los resultados en el Template
    if (instancia.state.get('ocultarCompletos')) { // filtrar las tareas si 'ocultar completados' está seleccionado
      return Tareas.find(
        { checked: { $ne: true } }
        ,{ sort: { fechaCreado: -1 } }
      );
    }
    // de lo contrario, devuelve todas las tareas
    return Tareas.find(
      {}
      ,{ sort: { fechaCreado: -1 } }
    );
  }
  ,contarIncompletos() {
    return Tareas.find({checked: {$ne: true}}).count();
  }
});

Template.body.events({
  'submit .nueva-tarea'(evento) {
    evento.preventDefault();

    // recogemos los datos del formulario
    const ele = evento.target;
    const texto = ele.texto.value;
    
    // insertamos los nuevos datos a la colección en MongoDB
    Tareas.insert({
      texto: texto
      ,fechaCreado: new Date()
    });

    ele.texto.value = ''; // borrar formulario
  }
  ,'change .ocultar-completado input'(evento, instancia) {
    instancia.state.set('ocultarCompletos', evento.target.checked);
  }
});
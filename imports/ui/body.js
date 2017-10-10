import {Template} from 'meteor/templating';

import {Tareas} from '../api/tareas.js';

import './body.html';

Template.body.helpers({
  tareas () {
    return Tareas.find({});
  }
  // Para que surja la magia,insertamos por consola los datos a nuestra BD de Mongo:
  // $ meteor mongo
  // $ db.tareas.insert({ texto: "Hola mundo!", fechaCreado: new Date() });
});
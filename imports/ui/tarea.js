import {Template} from 'meteor/templating';
import {Tareas} from '../api/tareas.js'; // colección en MongoDB
import './tarea.html';
 
Template.tarea.events({
  'click .toggle-checked'() {
    // definimos la propiedad checked contraria a su valor actual
    Tareas.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .borrar'() {
    Tareas.remove(this._id);
  },
});
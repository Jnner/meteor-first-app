import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import './tarea.html';
 
Template.tarea.events({
  'click .toggle-checked'() {
    // definimos la propiedad checked contraria a su valor actual
    Meteor.call('tareas.setChecked', this._id, !this.checked);
  },
  'click .borrar'() {
    Meteor.call('tareas.remove', this._id);
  },
});
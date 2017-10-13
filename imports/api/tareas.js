import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check'; //para hacer funcionar este paquete: $ meteor remove insecure

export const Tareas = new Mongo.Collection('tareas');

Meteor.methods({
  'tareas.insert'(texto) {
    check(texto, String);
 
    // nos aseguramos que el usuario está logueado antes de insertar tareas
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tareas.insert({
      texto: texto
      ,fechaCreado: new Date()
      ,propietario: Meteor.userId()
      ,usuario: Meteor.user().usuario
    });
  }
  ,'tareas.remove'(idTarea) {
    check(idTarea, String);
 
    Tareas.remove(idTarea);
  }
  ,'tareas.setChecked'(idTarea, setChecked) {
    check(idTarea, String);
    check(setChecked, Boolean);
 
    Tareas.update(idTarea, { $set: { checked: setChecked } });
  },
});
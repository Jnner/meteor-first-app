import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check'; //para hacer funcionar este paquete: $ meteor remove insecure

export const Tareas = new Mongo.Collection('tareas');

if (Meteor.isServer) { // esta parte solo se ejecuta en el servidor
  Meteor.publish('tareas', function tasksPublication(){
    return Tareas.find({ // solo publicar/mostrar tareas que pertenecen al usuario actual
      $or: [
        { privado: { $ne: true } }
        ,{ propietario: this.userId }
      ]
    });
  });
}

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

    const tarea = Tareas.findOne(idTarea);
    if (tarea.privado && tarea.propietario !== Meteor.userId()) {
      // si la tarea es privada, nos aseguramos que solamente el propietario puede borrarla
      throw new Meteor.Error('not-authorized');
    } 
    Tareas.remove(idTarea);
  }
  ,'tareas.setChecked'(idTarea, setChecked) {
    check(idTarea, String);
    check(setChecked, Boolean);

    const tarea = Tareas.findOne(idTarea);
    if (tarea.privado && tarea.propietario !== Meteor.userId()) {
      // si la tarea es privada, nos aseguramos que solamente el propietario puede marcarla como realizada
      throw new Meteor.Error('not-authorized');
    } 
    Tareas.update(idTarea, { $set: { checked: setChecked } });
  }
  ,'tareas.setPrivate'(idTarea, setToPrivate) {
    check(idTarea, String);
    check(setToPrivate, Boolean);

    const tarea = Tareas.findOne(idTarea);

    if (tarea.propietario !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Tareas.update(idTarea, { $set: { privado: setToPrivate } });
  }
});
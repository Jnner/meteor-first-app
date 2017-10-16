import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.publish('tasks', function taskPublication(){
    return Tasks.find({
      $or: [
        { private: { $ne: true } }
        ,{ propietario: this.userId }
      ]
    });
  });
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
 
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text: text
      ,fechaCreado: new Date()
      ,propietario: Meteor.userId()
      ,usuario: Meteor.user().usuario
    });
  }
  ,'tasks.remove'(idTarea) {
    check(idTarea, String);

    const task = Tasks.findOne(idTarea);
    if (task.private && task.propietario !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    } 
    Tasks.remove(idTarea);
  }
  ,'tasks.setChecked'(idTarea, setChecked) {
    check(idTarea, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(idTarea);
    if (task.private && task.propietario !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    } 
    Tasks.update(idTarea, { $set: { checked: setChecked } });
  }
  ,'tasks.setPrivate'(idTarea, setToPrivate) {
    check(idTarea, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(idTarea);
    if (task.propietario !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(idTarea, { $set: { private: setToPrivate } });
  }
});
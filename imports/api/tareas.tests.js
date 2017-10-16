/* eslint-env mocha */
import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'meteor/practicalmeteor:chai';
import {Tasks} from './task.js';
 
if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let idTarea;
 
      beforeEach(() => {
        Tasks.remove({});
        idTarea = Tareas.insert({
          text: 'test task'
          ,fechaCreado: new Date()
          ,propietario: userId
          ,usuario: 'tmeasday'
        });
      });

      it('puede borrar task propias', () => {
        const borrarTarea = Meteor.server.method_handlers['task.remove'];
 
        const invocation = { userId };
 
        borrarTarea.apply(invocation, [idTarea]);
 
        assert.equal(Tareas.find().count(), 0);
      });
    });
  });
}
/* eslint-env mocha */
import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'meteor/practicalmeteor:chai';
import {Tareas} from './tareas.js';
 
if (Meteor.isServer) {
  describe('Tareas', () => {
    describe('methods', () => {
      const userId = Random.id();
      let idTarea;
 
      beforeEach(() => {
        Tareas.remove({});
        idTarea = Tareas.insert({
          texto: 'test task'
          ,fechaCreado: new Date()
          ,propietario: userId
          ,usuario: 'tmeasday'
        });
      });

      it('puede borrar tareas propias', () => {
        // encontrar la implementación interna del método tarea de manera que podamos aislarla para probarla
        const borrarTarea = Meteor.server.method_handlers['tareas.remove'];
 
        // configurar una llamada falsa al método que se parezca a lo que el método espera
        const invocation = { userId };
 
        // ejecurar el método con 'this' establece la llamada falsa
        borrarTarea.apply(invocation, [idTarea]);
 
        // verifica que el método hace lo que esperamos
        assert.equal(Tareas.find().count(), 0);
      });
    });
  });
}
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tasks} from '../imports/api/tasks.js';
import '../imports/startup/accounts-config.js';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks () {
    const instancia = Template.instance();
    if (instancia.state.get('ocultarCompletos')) {
      return Tasks.find(
        { checked: { $ne: true } }
        ,{ sort: { fechaCreado: -1 } }
      );
    }
    return Tasks.find(
      {}
      ,{ sort: { fechaCreado: -1 } }
    );
  }
  ,countIncompletes() {
    return Tasks.find({checked: {$ne: true}}).count();
  }
});

Template.body.events({
  'submit .nueva-task'(evento) {
    evento.preventDefault();

    const ele = evento.target;
    const text = ele.text.value;
    
    Meteor.call('tasks.insert', text);

    ele.text.value = '';
  }
  ,'change .ocultar-completado input'(evento, instancia) {
    instancia.state.set('ocultarCompletos', evento.target.checked);
  }
  ,'click .toggle-checked'() {
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  }
  ,'click .borrar'() {
    Meteor.call('tasks.remove', this._id);
  }
  ,'click .btn-publicar'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  }
});
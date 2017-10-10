import {Template} from 'meteor/templating';

import './body.html';

Template.body.helpers({
  tareas: [
     {texto: 'esto es la tarea numero 1'}
    ,{texto: 'esto es la tarea numero 2'}
    ,{texto: 'esto es la tarea numero 3'}
  ]
});
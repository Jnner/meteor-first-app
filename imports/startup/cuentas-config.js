import {Accounts} from 'meteor/accounts-base'; // para hacer funcionar este paquete: $ meteor add accounts-ui accounts-password
 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
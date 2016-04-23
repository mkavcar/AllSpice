//login-button.component.js
angular
  .module('allSpiceApp')
  .component("saLoginButton", {
    controller: LoginButtonController,
    templateUrl: 'app/components/loginButton.html'
});

LoginButtonController.$inject = ['authService'];

function LoginButtonController(authService) {
  var ctrl = this;    
  ctrl.isLoggedIn = isLoggedIn;
  ctrl.login = login;
  ctrl.logout = logout;
  
  ////////////
  function isLoggedIn() {
    return authService.isLoggedIn();
  }

  function login() {
    authService.login().then(function (authData) {
      ctrl.authData = authData;
      console.log(ctrl.authData);
    });
  }

  function logout() {
    authService.logout();
  }
};
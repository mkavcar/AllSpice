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

  ctrl.isLoggedIn = function() {
    return authService.isLoggedIn();
  };

  ctrl.login = function() {
    authService.login().then(function (authData) {
      ctrl.authData = authData;
      console.log(ctrl.authData);
    });
  };

  ctrl.logout = function() {
    authService.logout();
  };
};
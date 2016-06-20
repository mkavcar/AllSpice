//app.component.js
angular
  .module('allSpiceApp')
  .component('app', {
    templateUrl: 'app/app.html',
    controller: AppController,
    $routeConfig: [
      {path: '/myFeed', name: 'MyFeed', component: 'myFeed', useAsDefault: true},
      {path: '/addSpice', name: 'AddSpice', component: 'addSpice' }
    ]
});

AppController.$inject = ['$rootScope', '$rootRouter', 'authService', 'spiceApi', '$mdDialog'];

function AppController($rootScope, $rootRouter, authService, spiceApi, $mdDialog) {
  var ctrl = this;
  ctrl.openAddSpice = openAddSpice;
  $rootScope.auth = authService;
  $rootScope.activeRoute = 'MyFeed';

  ////////////
  function openAddSpice(ev) {
    spiceApi.setObj(null);
    //$rootScope.activeRoute = 'AddSpice';
    //$rootRouter.navigate(['AddSpice']);

    $mdDialog.show({
      parent: angular.element(document.body),
      controller: AddSpiceController,
      template: '<md-dialog flex="80"><add-spice></add-spice></md-dialog>',
      targetEvent: ev,
      fullscreen: true
    });

  }

  //$rootRouter.navigate(['MyFeed']);
};

function AddSpiceController() {

};
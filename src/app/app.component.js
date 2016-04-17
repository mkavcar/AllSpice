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

AppController.$inject = ['$rootScope', '$rootRouter', 'authService', 'spiceApi'];

function AppController($rootScope, $rootRouter, authService, spiceApi) {
  var ctrl = this;

  $rootScope.auth = authService;
  $rootScope.activeRoute = 'MyFeed';

  ctrl.openAddSpice = function() {
    spiceApi.setObj(null);
    $rootScope.activeRoute = 'AddSpice';
    $rootRouter.navigate(['AddSpice']);
  };

  //$rootRouter.navigate(['MyFeed']);
};

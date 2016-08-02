//app.component.js
angular
  .module('allSpiceApp')
  .component('app', {
    templateUrl: 'app/app.html',
    controller: AppController,
    $routeConfig: [
      {path: '/myFeed', name: 'MyFeed', component: 'myFeed', useAsDefault: true}//,
      //{path: '/addSpice', name: 'AddSpice', component: 'addSpice' }
    ]
});

AppController.$inject = ['$rootScope', '$rootRouter', 'authService', 'spiceApi', '$mdDialog', 'searchService', '$scope' ,'$interval', 'logApi', '$http'];

function AppController($rootScope, $rootRouter, authService, spiceApi, $mdDialog, searchService, $scope ,$interval, logApi, $http) {
  var ctrl = this;
  $rootScope.auth = authService;
  
  ctrl.openAddSpice = openAddSpice;
  ctrl.onSearchChange = onSearchChange;

  searchService.subscribe($scope, function(){
    ctrl.search = searchService.get().text;
  });

  ////////////
  function openAddSpice(ev) {
    spiceApi.setObj(null);

    $mdDialog.show({
      parent: angular.element(document.body),
      template: '<md-dialog flex="80"><add-spice></add-spice></md-dialog>',
      targetEvent: ev,
      fullscreen: true
    });
  }

  function onSearchChange() {
    searchService.publish(ctrl.search);
  }
  
  $interval(function () {
    //logApi.shipLogs($http);
    
  }, 2000);
};

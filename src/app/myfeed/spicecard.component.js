//spicecard.component.js
angular
  .module('allSpiceApp')
  .component("saSpiceCard", {
    bindings: {
      spice: '<'
    },
    controller: SpiceCardController,
    templateUrl: 'app/myfeed/spice.html'
});

SpiceCardController.$inject = ['spiceApi', '$rootRouter', '$rootScope', 'authService'];

function SpiceCardController(spiceApi, $rootRouter, $rootScope, authService) {
  var 
  ctrl = this,
      user = authService.getUser();

  ctrl.togglePin = function(spiceObj) {
    spiceApi.togglePin(spiceObj);
  };

  ctrl.edit = function(spiceObj) {
    spiceApi.setObj(spiceObj);
    $rootScope.activeRoute = 'AddSpice';
    $rootRouter.navigate(['AddSpice']);
  };

  ctrl.delete = function(spiceObj) {
    spiceApi.remove(spiceObj);
  };
};
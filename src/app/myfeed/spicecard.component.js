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
  var ctrl = this,
      user = authService.getUser();

  ctrl.togglePin = togglePin;
  ctrl.edit = edit;
  ctrl.delete = remove;
  
  ////////////
  function togglePin(spiceObj) {
    spiceApi.togglePin(spiceObj);
  }
  
  function edit(spiceObj) {
    spiceApi.setObj(spiceObj);
    $rootScope.activeRoute = 'AddSpice';
    $rootRouter.navigate(['AddSpice']);
  }
  
  function remove(spiceObj) {
    spiceApi.remove(spiceObj);
  }
};
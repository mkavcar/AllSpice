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

SpiceCardController.$inject = ['spiceApi', '$rootRouter', '$rootScope', 'authService', '$mdDialog', 'searchService'];

function SpiceCardController(spiceApi, $rootRouter, $rootScope, authService, $mdDialog, searchService) {
  var ctrl = this,
      user = authService.getUser();

  ctrl.togglePin = togglePin;
  ctrl.edit = edit;
  ctrl.delete = remove;
  ctrl.filter = filter;
  
  ////////////
  function togglePin(spiceObj) {
    spiceApi.togglePin(spiceObj);
  }
  
  function edit(spiceObj, ev) {
    spiceApi.setObj(spiceObj);
    
    $mdDialog.show({
      parent: angular.element(document.body),
      template: '<md-dialog flex="80"><add-spice></add-spice></md-dialog>',
      targetEvent: ev,
      fullscreen: true
    });
  }
  
  function remove(spiceObj) {
    spiceApi.remove(spiceObj);
  }

  function filter(value) {
    searchService.publish(value);
  }
};

//addspice.component.js
angular
  .module('allSpiceApp')
  .component("addSpice", {
    controller: AddSpiceController,
    templateUrl: 'app/addspice/addspice.html'
});

AddSpiceController.$inject = ['$firebaseArray', 'spiceApi', '$timeout'];

function AddSpiceController($firebaseArray, spiceApi, $timeout) {
  var ctrl = this;
  
  ctrl.spice = spiceApi.getObj();
  ctrl.isUpdate = (ctrl.spice);

  ctrl.add = function() {
    if (!ctrl.isUpdate)
      spiceApi.add(ctrl.spice).then(function(error) {
        console.log('then');
        console.log(error);
      });
    else
      spiceApi.update(ctrl.spice);

    ctrl.spice = {};
    ctrl.spiceForm.$setPristine();
    ctrl.showStatus = true;      
  };

  ctrl.$routerCanReuse = function() {
    return false;
  };
  
  ctrl.ok = function() {
    ctrl.showStatus = false;
    ctrl.isUpdate = false;
  };
};
//addspice.component.js
angular
  .module('allSpiceApp')
  .component("addSpice", {
    controller: AddSpiceController,
    templateUrl: 'app/addspice/addspice.html'
});

AddSpiceController.$inject = ['$firebaseArray', 'spiceApi', '$mdDialog'];

function AddSpiceController($firebaseArray, spiceApi, $mdDialog) {
  var ctrl = this;
  ctrl.add = add;
  ctrl.filterTagList = filterTagList;
  ctrl.ok = ok;
  ctrl.cancel = cancel;

  init();
  
  ////////////
  function add() {
    if (angular.isArray(ctrl.tags)) {
      ctrl.spice.tags = ctrl.tags.map(function(item) {
        return item.text;
      }).join(',');
    }
    
    if (!ctrl.isUpdate)
      spiceApi.add(ctrl.spice);
    else
      spiceApi.update(ctrl.spice);

    ctrl.spice = {};
    ctrl.tags = null;
    ctrl.spiceForm.$setPristine();
    ctrl.showStatus = true;      
  }

  function init() {
    ctrl.spice = spiceApi.getObj();
    ctrl.tags = initTags();
    ctrl.isUpdate = (ctrl.spice);
    
    spiceApi.getTagList().then(function(data){
      tagList = data;
    });
  }
  
  function filterTagList(query) {
    if (angular.isArray(tagList)) {
      return tagList.filter(function(item){
        return item.text.toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    }
    
    return null;  
  }  
  
  function ok() {
    ctrl.showStatus = false;
    ctrl.isUpdate = false;
  }
  
  function initTags() {
    if (ctrl.spice && ctrl.spice.tags) {
      var arr = ctrl.spice.tags.split(',');      
      arr = arr.map(function(item) {
        return { text: item };
      });
      
      return arr;  
    }
    
    return null;
  }

  function cancel() {
    $mdDialog.hide();
  }
};

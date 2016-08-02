//myfeed.component.js
angular
  .module('allSpiceApp')
  .component("myFeed", {
    controller: MyFeedController,
    templateUrl: 'app/myfeed/myfeed.html'
});

MyFeedController.$inject = ['spiceApi', '$rootRouter', '$rootScope', 'authService', 'searchService', '$scope', '$log'];
  
function MyFeedController(spiceApi, $rootRouter, $rootScope, authService, searchService, $scope, $log) {
  var ctrl = this,
      search = {};    

  ctrl.filter = filter;

  //test warning
  //$log.warn('Test Warning');
  //throw test error
  //x=y;

  searchService.subscribe($scope, routerOnActivate());
  
  ////////////
  function filter(item) {
    return spiceApi.filter(item, search.uid, search.text);
  }
  
  function routerOnActivate(next) {
    search = searchService.get();
    
    spiceApi.getAll().$loaded(function(data) {
      ctrl.spices = data;
      ctrl.loadComplete = true;
    });
  }
};

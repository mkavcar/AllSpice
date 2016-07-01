//myfeed.component.js
angular
  .module('allSpiceApp')
  .component("myFeed", {
    controller: MyFeedController,
    templateUrl: 'app/myfeed/myfeed.html'
});

MyFeedController.$inject = ['spiceApi', '$rootRouter', '$rootScope', 'authService', 'searchService', '$scope'];
  
function MyFeedController(spiceApi, $rootRouter, $rootScope, authService, searchService, $scope) {
  var ctrl = this,
      search = {};    

  ctrl.filter = filter;

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

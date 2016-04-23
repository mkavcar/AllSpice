//myfeed.component.js
angular
  .module('allSpiceApp')
  .component("myFeed", {
    controller: MyFeedController,
    templateUrl: 'app/myfeed/myfeed.html'
});

MyFeedController.$inject = ['spiceApi', '$rootRouter', '$rootScope', 'authService'];
  
function MyFeedController(spiceApi, $rootRouter, $rootScope, authService) {
  var ctrl = this,
      uid = null;    

  ctrl.filter = filter;
  ctrl.$routerOnActivate = routerOnActivate;
  
  ////////////
  function filter(item) {
    return spiceApi.filter(item, uid, $rootScope.search);
  }
  
  function routerOnActivate(next) {
    console.log('route state: ' + next.params.state);

    if (next.params.state && authService.isLoggedIn()) {
      var user = authService.getUser();
      uid = user.uid;

      $rootScope.activeRoute = 'MySpice';
    }
    else {
      uid = null;
      $rootScope.activeRoute = 'MyFeed';
    }

    spiceApi.getAll().$loaded(function(data) {
      ctrl.spices = data;
      ctrl.loadComplete = true;
    });
  }
};

//myfeed.component.js
angular
  .module('allSpiceApp')
  .component("myFeed", {
    controller: MyFeedController,
    templateUrl: 'app/myfeed/myfeed.html'
});

MyFeedController.$inject = ['spiceApi', '$rootRouter', '$rootScope', 'authService'];
  
function MyFeedController(spiceApi, $rootRouter, $rootScope, authService) {
  var 
    ctrl = this,
    uid = null;    

  ctrl.filter = function(item) {
    var res = true;

    if (uid)
      res = ((item.user && item.user.uid === uid) || (item.pinnedUsers && item.pinnedUsers[uid] === true));

    if ($rootScope.search) {
      var search = $rootScope.search.toLowerCase();

      res = (item.name.toLowerCase().indexOf(search) >= 0 || item.user.name.toLowerCase().indexOf(search) >= 0)
      
      if (!res && item.description)
        res = (item.description.toLowerCase().indexOf(search) >= 0);
      
      if (!res && item.ingredients)
        res = (item.ingredients.toLowerCase().indexOf(search) >= 0);
         
      if (!res && item.directions) 
        res = (item.directions.toLowerCase().indexOf(search) >= 0);
        
      if (!res && item.tags)
        res = (item.tags.toLowerCase().indexOf(search) >= 0);
    }

    return res;
  };

  ctrl.$routerOnActivate = function(next) {
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
  };
};

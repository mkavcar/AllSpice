'use strict';

//app.module.js
angular
  .module('allSpiceApp', ['ngComponentRouter', 'firebase', 'ngTagsInput'])
  .config(config)
  .value('$routerRootComponent', 'app');

config.$inject = ['$locationProvider'];

function config($locationProvider) {
    $locationProvider.html5Mode(true);
}
angular.module('allSpiceApp').run(['$templateCache', function($templateCache) {
    $templateCache.put('app\app.html',
        "<nav class=\"navbar navbar-default navbar-inverse navbar-fixed-top\">\r\n      <div class=\"container-fluid\">\r\n        <!-- Brand and toggle get grouped for better mobile display -->\r\n        <div class=\"navbar-header\">\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\" aria-expanded=\"false\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n          <a class=\"navbar-brand\" ng-link=\"['MyFeed']\"><span style=\"color:#89E894\" class=\"glyphicon glyphicon-grain\" aria-hidden=\"true\"></span> All Spice</a>\r\n        </div>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navbar-collapse\">\r\n          <ul class=\"nav navbar-nav\">\r\n            <li ng-class=\"{'active' : $root.activeRoute === 'MyFeed'}\"><a ng-link=\"['MyFeed']\">My Feed <span class=\"sr-only\">(current)</span></a></li>\r\n            <li ng-show=\"$root.auth.isLoggedIn()\" ng-class=\"{'active' : $root.activeRoute === 'MySpice'}\"><a ng-link=\"['MyFeed', {state: 'mySpice'}]\">My Spice</a></li>\r\n          </ul>\r\n\r\n          <sa-login-button></sa-login-button>\r\n\r\n          <ul ng-show=\"$root.auth.isLoggedIn()\" class=\"nav navbar-nav navbar-right\" style=\"margin-right:0px;\">\r\n            <li ng-class=\"{'active' : $root.activeRoute === 'AddSpice'}\"><a href=\"#\" ng-click=\"$ctrl.openAddSpice()\"><span style=\"color:#89E894\" class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Add Spice</a></li>\r\n          </ul>\r\n\r\n          <form class=\"navbar-form navbar-right hidden-xs\" role=\"search\">\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <div class=\"input-group-addon\">\r\n                  <span style=\"color:#89E894\" class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\r\n                </div>\r\n                <input ng-model=\"$root.search\" ng-model-options=\"{ debounce: 250 }\" type=\"text\" class=\"form-control\" placeholder=\"Search\" style=\"border-left:0;width:155px\"></input>\r\n              </div>\r\n            </div>\r\n\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n    <ng-outlet></ng-outlet>");
}]);
//app.component.js
angular
  .module('allSpiceApp')
  .component('app', {
    templateUrl: 'app/app.html',
    controller: AppController,
    $routeConfig: [
      {path: '/myFeed', name: 'MyFeed', component: 'myFeed', useAsDefault: true},
      {path: '/addSpice', name: 'AddSpice', component: 'addSpice' }
    ]
});

AppController.$inject = ['$rootScope', '$rootRouter', 'authService', 'spiceApi'];

function AppController($rootScope, $rootRouter, authService, spiceApi) {
  var ctrl = this;

  $rootScope.auth = authService;
  $rootScope.activeRoute = 'MyFeed';

  ctrl.openAddSpice = function() {
    spiceApi.setObj(null);
    $rootScope.activeRoute = 'AddSpice';
    $rootRouter.navigate(['AddSpice']);
  };

  //$rootRouter.navigate(['MyFeed']);
};

angular.module('allSpiceApp').run(['$templateCache', function($templateCache) {
    $templateCache.put('app\addspice\addspice.html',
        "<form novalidate name=\"$ctrl.spiceForm\">\r\n      <div class=\"container-fluid\" style=\"max-width:1000px;background:#eee;\">\r\n        \r\n        <!-- Header -->\r\n        <div class=\"row\" style=\"background: #444;padding-left: 10px;\">\r\n          <h2 style=\"color: #89E894;\"><span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\" style=\"top: 2px;\"></span> {{ ($ctrl.isUpdate) ? 'Edit Spice' : 'Add Spice' }}</h2>\r\n        </div>\r\n        \r\n        <!-- Entry View -->\r\n        <div class=\"row\" ng-show=\"$ctrl.showStatus !== true\">\r\n          <div class=\"col-sm-6\" style=\"padding-top: 15px;\">\r\n            <div class=\"form-group\" ng-class=\"{ 'has-error': $ctrl.spiceForm.inputName.$invalid && !$ctrl.spiceForm.inputName.$pristine }\">\r\n              <label for=\"inputName\">Name</label>\r\n              <input type=\"text\" ng-model=\"$ctrl.spice.name\" class=\"form-control\" id=\"inputName\" name=\"inputName\" placeholder=\"Name\" required>\r\n              <div ng-show=\"$ctrl.spiceForm.inputName.$invalid && !$ctrl.spiceForm.inputName.$pristine\" ng-messages=\"$ctrl.spiceForm.inputName.$error\" class=\"help-block\" role=\"alert\">\r\n                <div ng-message=\"required\">This field is required</div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"inputDescription\">Description</label>\r\n              <textarea ng-model=\"$ctrl.spice.description\" class=\"form-control\" id=\"inputDescription\"></textarea>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"inputImageURL\">Image URL</label>\r\n              <input type=\"text\" ng-model=\"$ctrl.spice.imageURL\" class=\"form-control\" id=\"inputImageURL\" placeholder=\"Image URL\">\r\n            </div>\r\n            <img ng-show=\"$ctrl.spice.imageURL\" ng-src=\"{{$ctrl.spice.imageURL}}\" style=\"width:100%;margin-bottom: 15px;\">\r\n          </div>\r\n          <div class=\"col-sm-6\" style=\"background: #ddd;padding-top: 15px;\">\r\n            <div class=\"row\">\r\n              <div class=\"col-sm-4\">\r\n                <div class=\"form-group\" ng-class=\"{ 'has-error': $ctrl.spiceForm.inputPrepTime.$invalid && !$ctrl.spiceForm.inputPrepTime.$pristine }\">\r\n                  <label><span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\" style=\"top: 2px;\"></span> Prep (min)</label>\r\n                  <input name=\"inputPrepTime\" ng-model=\"$ctrl.spice.prepTime\" class=\"form-control\" type=\"number\" min=\"1\" max=\"999\" ng-maxlength=\"3\">\r\n                  <div ng-show=\"$ctrl.spiceForm.inputPrepTime.$invalid && !$ctrl.spiceForm.inputPrepTime.$pristine\" ng-messages=\"$ctrl.spiceForm.inputPrepTime.$error\" class=\"help-block\" role=\"alert\">\r\n                    <div ng-message=\"required\">Please enter 1-999</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-sm-4\">\r\n                <div class=\"form-group\" ng-class=\"{ 'has-error': $ctrl.spiceForm.inputCookTime.$invalid && !$ctrl.spiceForm.inputCookTime.$pristine }\">\r\n                  <label><span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\" style=\"top: 2px;\"></span> Cook (min)</label>\r\n                  <input name=\"inputCookTime\" ng-model=\"$ctrl.spice.cookTime\" class=\"form-control\" type=\"number\" min=\"1\" max=\"999\" ng-maxlength=\"3\">\r\n                  <div ng-show=\"$ctrl.spiceForm.inputCookTime.$invalid && !$ctrl.spiceForm.inputCookTime.$pristine\" ng-messages=\"$ctrl.spiceForm.inputCookTime.$error\" class=\"help-block\" role=\"alert\">\r\n                    <div ng-message=\"required\">Please enter 1-999</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-sm-4\">\r\n                <div class=\"form-group\" ng-class=\"{ 'has-error': $ctrl.spiceForm.inputServings.$invalid && !$ctrl.spiceForm.inputServings.$pristine }\">\r\n                  <label><span class=\"glyphicon glyphicon-cutlery\" aria-hidden=\"true\" style=\"top: 2px;\"></span> Servings</label>\r\n                  <input name=\"inputServings\" ng-model=\"$ctrl.spice.servings\" class=\"form-control\" type=\"number\" min=\"1\" max=\"99\" ng-maxlength=\"2\">\r\n                  <div ng-show=\"$ctrl.spiceForm.inputServings.$invalid && !$ctrl.spiceForm.inputServings.$pristine\" ng-messages=\"$ctrl.spiceForm.inputServings.$error\" class=\"help-block\" role=\"alert\">\r\n                    <div ng-message=\"required\">Please enter 1-99</div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"inputIngredients\">Ingredients</label>\r\n              <textarea ng-model=\"$ctrl.spice.ingredients\" rows=\"4\" class=\"form-control\" id=\"inputIngredients\"></textarea>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"inputDirections\">Directions</label>\r\n              <textarea ng-model=\"$ctrl.spice.directions\" rows=\"4\" class=\"form-control\" id=\"inputDirections\"></textarea>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"inputTags\">Tags</label>\r\n              <tags-input ng-model=\"$ctrl.tags\" max-tags=\"20\" add-on-space=\"true\">\r\n                <auto-complete source=\"$ctrl.getTagList($query)\" min-length=\"2\" max-results-to-show=\"6\"></auto-complete>\r\n              </tags-input>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\" ng-show=\"$ctrl.showStatus !== true\">\r\n          <div class=\"col-xs-12\" style=\"background:#89E894;padding-top: 15px;padding-bottom: 10px;\">\r\n            <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"$ctrl.add()\" ng-disabled=\"$ctrl.spiceForm.$invalid\"><span class=\"glyphicon glyphicon-send\" aria-hidden=\"true\"></span> Submit</button>\r\n          </div>\r\n        </div>\r\n        \r\n        <!-- Status View -->\r\n        <div class=\"row\" ng-show=\"$ctrl.showStatus === true\">\r\n          <div class=\"col-xs-12\" style=\"padding-top: 20px;\">\r\n            <div class=\"alert alert-success\" role=\"alert\" style=\"font-size: 18px;line-height: 34px;\">\r\n              <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\" style=\"top: 2px;\"></span> Spice submitted successfully!                        \r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\" ng-show=\"$ctrl.showStatus === true\">\r\n          <div class=\"col-xs-12\" style=\"background:#89E894;padding-top: 15px;padding-bottom: 10px;\">\r\n            <button class=\"btn btn-success pull-right\" ng-click=\"$ctrl.ok()\">OK</button>\r\n          </div>\r\n        </div>\r\n        \r\n      </div>\r\n    </form>");
}]);
//addspice.component.js
angular
  .module('allSpiceApp')
  .component("addSpice", {
    controller: AddSpiceController,
    templateUrl: 'app/addspice/addspice.html'
});

AddSpiceController.$inject = ['$firebaseArray', 'spiceApi', '$timeout'];

function AddSpiceController($firebaseArray, spiceApi, $timeout) {
  var 
    ctrl = this,
    tagList = spiceApi.getTagList();
  
  ctrl.spice = spiceApi.getObj();
  ctrl.tags = initTags();
  ctrl.isUpdate = (ctrl.spice);
  
  ctrl.add = function() {
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
  };

  ctrl.$routerCanReuse = function() {
    return false;
  };
  
  ctrl.getTagList = function(query) {
    if (angular.isArray(tagList)) {
      return tagList.filter(function(item){
        return item.text.toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    }
    
    return null;  
  };
  
  ctrl.ok = function() {
    ctrl.showStatus = false;
    ctrl.isUpdate = false;
  };
  
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
};
angular.module('allSpiceApp').run(['$templateCache', function($templateCache) {
    $templateCache.put('app\myfeed\myfeed.html',
        "<div class=\"form-group visible-xs-block\" style=\"padding: 10px;margin: 0;background: #5CB85C;\">\r\n    <div class=\"input-group\">\r\n        <div class=\"input-group-addon\">\r\n            <span style=\"color:#89E894\" class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\r\n        </div>\r\n        <input ng-model=\"$root.search\" ng-model-options=\"{ debounce: 250 }\" type=\"text\" class=\"form-control\" placeholder=\"Search\" style=\"border-left:0;-webkit-box-shadow:none;box-shadow:none;\"></input>\r\n    </div>\r\n</div>\r\n<sa-spice-card ng-repeat=\"spice in $ctrl.spices | orderBy:'-$id' | filter: $ctrl.filter\" spice=\"spice\"></sa-spice-card>");
}]);
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

    ctrl.spices = spiceApi.getAll();
  };
};
angular.module('allSpiceApp').run(['$templateCache', function($templateCache) {
    $templateCache.put('app\myfeed\spice.html',
        "<div class=\"container-fluid\" style=\"max-width:1000px;margin-bottom:15px;background:#ccc\">\r\n      <div class=\"row\" style=\"background:white;\">\r\n        <div class=\"col-sm-6\">\r\n          <div class=\"row\" ng-show=\"$root.auth.isLoggedIn()\">\r\n            <div ng-show=\"$ctrl.showConfirm !== true\" class=\"col-xs-12\" style=\"background:#89E894;padding-bottom:10px;padding-top:10px;\">\r\n              <button ng-hide=\"$root.auth.getUser().uid === $ctrl.spice.user.uid\"  ng-click=\"$ctrl.togglePin($ctrl.spice)\" class=\"btn btn-success btn-sm\"><span class=\"glyphicon glyphicon-heart\" aria-hidden=\"true\" style=\"top: 2px;\" title=\"Pin\\Unpin to My Feed\"></span> {{ ($ctrl.spice.pinnedUsers[$root.auth.getUser().uid] === true) ? 'Unpin' : 'Pin' }}</button>\r\n              <button ng-show=\"$root.auth.getUser().uid === $ctrl.spice.user.uid\" ng-click=\"$ctrl.edit($ctrl.spice)\" class=\"btn btn-success btn-sm\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\" style=\"top: 2px;\"></span> Edit</button>\r\n              <button ng-show=\"$root.auth.getUser().uid === $ctrl.spice.user.uid\" ng-click=\"$ctrl.showConfirm = true\" class=\"btn btn-success btn-sm\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\" style=\"top: 2px;\"></span> Delete</button>\r\n            </div>\r\n            <div ng-show=\"$ctrl.showConfirm === true\" class=\"col-xs-12\" style=\"padding: 0;\">\r\n              <div class=\"alert alert-danger clearfix\" style=\"border-radius:0;margin-bottom:0;\">\r\n                <div class=\"pull-left\" style=\"line-height:30px;\">\r\n                  <span class=\"glyphicon glyphicon-alert\" aria-hidden=\"true\" style=\"top: 2px;\"></span>&nbsp;&nbsp;Are you sure you want to delete this spice?    \r\n                </div>\r\n                <div class=\"pull-right\">\r\n                  <button ng-click=\"$ctrl.showConfirm = false\" class=\"btn btn-default btn-sm\">Cancel</button>\r\n                  <button ng-click=\"$ctrl.delete($ctrl.spice)\" class=\"btn btn-danger btn-sm\">Delete</button>  \r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <h2>{{::$ctrl.spice.name}}</h2>\r\n          <div class=\"clearfix\" style=\"padding-bottom: 10px;\">\r\n            <img ng-src=\"{{::$ctrl.spice.user.profileImageURL}}\" class=\"pull-left\" style=\"margin-right:10px;border-radius: 50%;width:32px;\">\r\n            <div class=\"pull-left\">\r\n              <a href=\"#\" ng-click=\"$root.search = $ctrl.spice.user.name\"><strong>{{::$ctrl.spice.user.name}}</strong></a>\r\n              <div><small>{{::$ctrl.spice.timestamp | date:'short'}}</small></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\" style=\"padding-bottom: 10px;\">\r\n            <div class=\"col-xs-4\">\r\n              <span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\" style=\"top: 2px;\"></span> Prep (min)\r\n              <div style=\"color: #26B937;font-size: 24px;\">{{::($ctrl.spice.prepTime) ? $ctrl.spice.prepTime : '-'}}</div>\r\n            </div>\r\n            <div class=\"col-xs-4\">\r\n              <span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\" style=\"top: 2px;\"></span> Cook (min)\r\n              <div style=\"color:#26B937; font-size: 24px;\">{{::($ctrl.spice.cookTime) ? $ctrl.spice.cookTime : '-'}}</div>\r\n            </div>\r\n            <div class=\"col-xs-4\">\r\n              <span class=\"glyphicon glyphicon-cutlery\" aria-hidden=\"true\" style=\"top: 2px;\"></span> Servings\r\n              <div style=\"color:#26B937; font-size: 24px;\">{{::($ctrl.spice.servings) ? $ctrl.spice.servings : '-'}}</div>\r\n            </div>\r\n          </div>\r\n          <div style=\"padding-bottom: 10px;\">{{::$ctrl.spice.description}}</div>\r\n          <div ng-show=\"$ctrl.spice.tags\" style=\"padding-bottom: 10px;\">\r\n            <button class=\"btn btn-warning btn-xs\" ng-repeat=\"tag in $ctrl.spice.tags.split(',')\" ng-click=\"$root.search = tag\" style=\"margin-right:4px;\">{{ ::tag }}</button>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-sm-6\" style=\"padding:0\">\r\n          <img style=\"width:100%;\" ng-src=\"{{::$ctrl.spice.imageURL}}\">\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-6\" style=\"background: #ddd;padding: 15px;\">\r\n          <h3 style=\"border-bottom: 1px solid #ccc;padding-bottom: 10px;margin-top:0px;\">Ingredients</h3>\r\n          <div style=\"white-space: pre-wrap;\">{{::$ctrl.spice.ingredients}}</div>\r\n        </div>\r\n        <div class=\"col-sm-6\" style=\"background: #eee;padding: 15px;\">\r\n          <h3 style=\"border-bottom: 1px solid #ccc;padding-bottom: 10px;margin-top:0px;\">Directions</h3>\r\n          <div style=\"white-space: pre-wrap;\">{{::$ctrl.spice.directions}}</div>\r\n        </div>\r\n      </div>\r\n    </div>");
}]);
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
angular.module('allSpiceApp').run(['$templateCache', function($templateCache) {
    $templateCache.put('app\components\loginbutton.html',
        "<div ng-hide=\"$ctrl.isLoggedIn()\" class=\"navbar-form navbar-right\">\r\n      <button class=\"btn btn-success\" ng-click=\"$ctrl.login()\"><span style=\"top: 2px;\" class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> Login</button>\r\n    </div>\r\n\r\n    <ul ng-show=\"$ctrl.isLoggedIn()\" class=\"nav navbar-nav navbar-right\" style=\"border-left:1px solid #89E894;\">\r\n      <li>\r\n        <a href=\"#\" style=\"padding-top: 10px;padding-bottom: 8px;\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n          <img style=\"height:32px;margin-right: 10px;border-radius: 50%;\" ng-src=\"{{$ctrl.authData.google.profileImageURL}}\">{{ $ctrl.authData.google.displayName }}&nbsp;&nbsp;<span style=\"color:#89E894;top: 2px;\" class=\"glyphicon glyphicon-chevron-down\"\r\n            aria-hidden=\"true\"></span>\r\n        </a>\r\n        <ul class=\"dropdown-menu\">\r\n          <li><a href=\"#\" ng-click=\"$ctrl.logout()\">Logout</a></li>\r\n        </ul>\r\n      </li>\r\n    </ul>");
}]);
"use strict";function config(e,t,n){e.html5Mode(!0),t.registerUrl({"default":n,spices:n+"/spices",tags:n+"/tags"})}function AppController(e,t,n,o){function i(){o.setObj(null),e.activeRoute="AddSpice",t.navigate(["AddSpice"])}var r=this;r.openAddSpice=i,e.auth=n,e.activeRoute="MyFeed"}function AddSpiceController(e,t){function n(){angular.isArray(u.tags)&&(u.spice.tags=u.tags.map(function(e){return e.text}).join(",")),u.isUpdate?t.update(u.spice):t.add(u.spice),u.spice={},u.tags=null,u.spiceForm.$setPristine(),u.showStatus=!0}function o(){return!1}function i(){u.spice=t.getObj(),u.tags=l(),u.isUpdate=u.spice,t.getTagList().then(function(e){tagList=e})}function r(e){return angular.isArray(tagList)?tagList.filter(function(t){return 0===t.text.toLowerCase().indexOf(e.toLowerCase())}):null}function a(){u.showStatus=!1,u.isUpdate=!1}function l(){if(u.spice&&u.spice.tags){var e=u.spice.tags.split(",");return e=e.map(function(e){return{text:e}})}return null}var u=this;u.add=n,u.$routerCanReuse=o,u.$routerOnActivate=i,u.filterTagList=r,u.ok=a}function LoginButtonController(e){function t(){return e.isLoggedIn()}function n(){e.login().then(function(e){i.authData=e,console.log(i.authData)})}function o(){e.logout()}var i=this;i.isLoggedIn=t,i.login=n,i.logout=o}function MyFeedController(e,t,n,o){function i(t){return e.filter(t,l,n.search)}function r(t){if(console.log("route state: "+t.params.state),t.params.state&&o.isLoggedIn()){var i=o.getUser();l=i.uid,n.activeRoute="MySpice"}else l=null,n.activeRoute="MyFeed";e.getAll().$loaded(function(e){a.spices=e,a.loadComplete=!0})}var a=this,l=null;a.filter=i,a.$routerOnActivate=r}function SpiceCardController(e,t,n,o){function i(t){e.togglePin(t)}function r(o){e.setObj(o),n.activeRoute="AddSpice",t.navigate(["AddSpice"])}function a(t){e.remove(t)}var l=this;o.getUser();l.togglePin=i,l.edit=r,l["delete"]=a}function authService(e,t){function n(){return null!==a}function o(){return null!==a?{uid:a.uid,name:a.google.displayName,profileImageURL:a.google.profileImageURL,provider:a.provider}:null}function i(){return l.$authWithOAuthPopup("google",{}).then(function(e){return a=e},function(e){t.reject(e)})}function r(){l.$unauth(),a=null}var a=null,l=e,u={isLoggedIn:n,getUser:o,login:i,logout:r};return u}function spiceApi(e,t,n,o){function i(){return m}function r(){return f}function a(e){f=e}function l(e){var t=A.getAll();return e.timestamp=Firebase.ServerValue.TIMESTAMP,e.user=o.getUser(),console.log(e),t.$add(e)}function u(e){var t=A.getAll();e.timestamp=Firebase.ServerValue.TIMESTAMP,console.log(e),t.$save(e)}function c(e){var t=A.getAll();console.log(e),t.$remove(e)}function s(e){var t=o.getUser();e.user.uid!==t.uid&&(e.pinnedUsers||(e.pinnedUsers={}),e.pinnedUsers[t.uid]=!(e.pinnedUsers[t.uid]===!0),A.update(e))}function p(){if(g){var e=n.defer();return e.resolve(g),e.promise}return v.once("value").then(function(e){return g=Object.keys(e.val()).map(function(e){return{text:e}})})}function d(e,t,n){var o=!0;return t&&(o=!!(e.user&&e.user.uid===t||e.pinnedUsers&&e.pinnedUsers[t]===!0)),n&&(n=n.toLowerCase(),o=e.name.toLowerCase().indexOf(n)>=0||e.user.name.toLowerCase().indexOf(n)>=0,!o&&e.description&&(o=e.description.toLowerCase().indexOf(n)>=0),!o&&e.ingredients&&(o=e.ingredients.toLowerCase().indexOf(n)>=0),!o&&e.directions&&(o=e.directions.toLowerCase().indexOf(n)>=0),!o&&e.tags&&(o=e.tags.toLowerCase().indexOf(n)>=0)),o}var g,f=null,m=(new Date,e(t.spices)),v=t.tags,A={getAll:i,getObj:r,setObj:a,add:l,update:u,remove:c,togglePin:s,getTagList:p,filter:d};return A}angular.module("allSpiceApp",["ngComponentRouter","firebase","ngTagsInput","ngAnimate"]).constant("FirebaseUrl","https://amber-heat-8766.firebaseio.com").config(config).value("$routerRootComponent","app"),config.$inject=["$locationProvider","$firebaseRefProvider","FirebaseUrl"],angular.module("allSpiceApp").component("app",{templateUrl:"app/app.html",controller:AppController,$routeConfig:[{path:"/myFeed",name:"MyFeed",component:"myFeed",useAsDefault:!0},{path:"/addSpice",name:"AddSpice",component:"addSpice"}]}),AppController.$inject=["$rootScope","$rootRouter","authService","spiceApi"],angular.module("allSpiceApp").component("addSpice",{controller:AddSpiceController,templateUrl:"app/addspice/addspice.html"}),AddSpiceController.$inject=["$firebaseArray","spiceApi"],angular.module("allSpiceApp").component("saLoginButton",{controller:LoginButtonController,templateUrl:"app/components/loginButton.html"}),LoginButtonController.$inject=["authService"],angular.module("allSpiceApp").component("myFeed",{controller:MyFeedController,templateUrl:"app/myfeed/myfeed.html"}),MyFeedController.$inject=["spiceApi","$rootRouter","$rootScope","authService"],angular.module("allSpiceApp").component("saSpiceCard",{bindings:{spice:"<"},controller:SpiceCardController,templateUrl:"app/myfeed/spice.html"}),SpiceCardController.$inject=["spiceApi","$rootRouter","$rootScope","authService"],angular.module("allSpiceApp").factory("authService",authService),authService.$inject=["$firebaseAuthService","$q"],angular.module("allSpiceApp").factory("spiceApi",spiceApi),spiceApi.$inject=["$firebaseArray","$firebaseRef","$q","authService"];
angular.module("allSpiceApp").run(["$templateCache", function($templateCache) {$templateCache.put("app/app.html","<nav class=\"navbar navbar-default navbar-inverse navbar-fixed-top\"><div class=\"container-fluid\"><sa-login-button class=\"pull-right\" style=\"margin-top:8px\"></sa-login-button><!-- Brand and toggle get grouped for better mobile display --><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" ng-link=\"[\'MyFeed\']\"><span style=\"color:#89E894\" class=\"glyphicon glyphicon-grain\" aria-hidden=\"true\"></span> All Spice</a></div><div class=\"collapse navbar-collapse\" id=\"navbar-collapse\"><ul class=\"nav navbar-nav\"><li ng-class=\"{\'active\' : $root.activeRoute === \'MyFeed\'}\"><a ng-link=\"[\'MyFeed\']\" data-toggle=\"collapse\" data-target=\".in\">My Feed <span class=\"sr-only\">(current)</span></a></li><li ng-show=\"$root.auth.isLoggedIn()\" ng-class=\"{\'active\' : $root.activeRoute === \'MySpice\'}\" data-toggle=\"collapse\" data-target=\".in\"><a ng-link=\"[\'MyFeed\', {state: \'mySpice\'}]\">My Spice</a></li></ul><ul ng-show=\"$root.auth.isLoggedIn()\" class=\"nav navbar-nav navbar-right\" style=\"margin-right:0px\"><li ng-class=\"{\'active\' : $root.activeRoute === \'AddSpice\'}\"><a href=\"#\" ng-click=\"$ctrl.openAddSpice()\" data-toggle=\"collapse\" data-target=\".in\"><span style=\"color:#89E894\" class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Add Spice</a></li></ul><form class=\"navbar-form navbar-right hidden-xs\" role=\"search\"><div class=\"form-group\"><div class=\"input-group\"><div class=\"input-group-addon\"><span style=\"color:#89E894\" class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></div><input ng-model=\"$root.search\" ng-model-options=\"{ debounce: 250 }\" type=\"text\" class=\"form-control search-input\" placeholder=\"Search\"></div></div></form></div></div></nav><ng-outlet></ng-outlet>");
$templateCache.put("app/addspice/addspice.html","<form novalidate name=\"$ctrl.spiceForm\"><div class=\"container-fluid\" style=\"max-width:1000px;background:#eee\"><!-- Header --><div class=\"row\" style=\"background: #444;padding-left: 10px\"><h2 style=\"color: #89E894\"><span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\" style=\"top: 2px\"></span> {{ ($ctrl.isUpdate) ? \'Edit Spice\' : \'Add Spice\' }}</h2></div><!-- Entry View --><div class=\"row\" ng-show=\"$ctrl.showStatus !== true\"><div class=\"col-sm-6\" style=\"padding-top: 15px\"><div class=\"form-group\" ng-class=\"{ \'has-error\': $ctrl.spiceForm.inputName.$invalid && !$ctrl.spiceForm.inputName.$pristine }\"><label for=\"inputName\">Name</label><input type=\"text\" ng-model=\"$ctrl.spice.name\" class=\"form-control\" id=\"inputName\" name=\"inputName\" placeholder=\"Name\" required><div ng-show=\"$ctrl.spiceForm.inputName.$invalid && !$ctrl.spiceForm.inputName.$pristine\" ng-messages=\"$ctrl.spiceForm.inputName.$error\" class=\"help-block\" role=\"alert\"><div ng-message=\"required\">This field is required</div></div></div><div class=\"form-group\"><label for=\"inputDescription\">Description</label><textarea ng-model=\"$ctrl.spice.description\" class=\"form-control\" id=\"inputDescription\"></textarea></div><div class=\"form-group\"><label for=\"inputImageURL\">Image URL</label><input type=\"text\" ng-model=\"$ctrl.spice.imageURL\" class=\"form-control\" id=\"inputImageURL\" placeholder=\"Image URL\"></div><img ng-show=\"$ctrl.spice.imageURL\" ng-src=\"{{$ctrl.spice.imageURL}}\" style=\"width:100%;margin-bottom: 15px\"></div><div class=\"col-sm-6\" style=\"background: #ddd;padding-top: 15px\"><div class=\"row\"><div class=\"col-sm-4\"><div class=\"form-group\" ng-class=\"{ \'has-error\': $ctrl.spiceForm.inputPrepTime.$invalid && !$ctrl.spiceForm.inputPrepTime.$pristine }\"><label><span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\" style=\"top: 2px\"></span> Prep (min)</label><input name=\"inputPrepTime\" ng-model=\"$ctrl.spice.prepTime\" class=\"form-control\" type=\"number\" min=\"1\" max=\"999\" ng-maxlength=\"3\"><div ng-show=\"$ctrl.spiceForm.inputPrepTime.$invalid && !$ctrl.spiceForm.inputPrepTime.$pristine\" ng-messages=\"$ctrl.spiceForm.inputPrepTime.$error\" class=\"help-block\" role=\"alert\"><div ng-message=\"required\">Please enter 1-999</div></div></div></div><div class=\"col-sm-4\"><div class=\"form-group\" ng-class=\"{ \'has-error\': $ctrl.spiceForm.inputCookTime.$invalid && !$ctrl.spiceForm.inputCookTime.$pristine }\"><label><span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\" style=\"top: 2px\"></span> Cook (min)</label><input name=\"inputCookTime\" ng-model=\"$ctrl.spice.cookTime\" class=\"form-control\" type=\"number\" min=\"1\" max=\"999\" ng-maxlength=\"3\"><div ng-show=\"$ctrl.spiceForm.inputCookTime.$invalid && !$ctrl.spiceForm.inputCookTime.$pristine\" ng-messages=\"$ctrl.spiceForm.inputCookTime.$error\" class=\"help-block\" role=\"alert\"><div ng-message=\"required\">Please enter 1-999</div></div></div></div><div class=\"col-sm-4\"><div class=\"form-group\" ng-class=\"{ \'has-error\': $ctrl.spiceForm.inputServings.$invalid && !$ctrl.spiceForm.inputServings.$pristine }\"><label><span class=\"glyphicon glyphicon-cutlery\" aria-hidden=\"true\" style=\"top: 2px\"></span> Servings</label><input name=\"inputServings\" ng-model=\"$ctrl.spice.servings\" class=\"form-control\" type=\"number\" min=\"1\" max=\"99\" ng-maxlength=\"2\"><div ng-show=\"$ctrl.spiceForm.inputServings.$invalid && !$ctrl.spiceForm.inputServings.$pristine\" ng-messages=\"$ctrl.spiceForm.inputServings.$error\" class=\"help-block\" role=\"alert\"><div ng-message=\"required\">Please enter 1-99</div></div></div></div></div><div class=\"form-group\"><label for=\"inputIngredients\">Ingredients</label><textarea ng-model=\"$ctrl.spice.ingredients\" rows=\"4\" class=\"form-control\" id=\"inputIngredients\"></textarea></div><div class=\"form-group\"><label for=\"inputDirections\">Directions</label><textarea ng-model=\"$ctrl.spice.directions\" rows=\"4\" class=\"form-control\" id=\"inputDirections\"></textarea></div><div class=\"form-group\" style=\"margin-bottom:0;padding-bottom:15px\"><label for=\"inputTags\">Tags</label><tags-input ng-model=\"$ctrl.tags\" max-tags=\"20\" add-on-space=\"true\"><auto-complete source=\"$ctrl.filterTagList($query)\" min-length=\"2\" max-results-to-show=\"6\"></auto-complete></tags-input></div></div></div><div class=\"row\" ng-show=\"$ctrl.showStatus !== true\"><div class=\"col-xs-12\" style=\"background:#89E894;padding-top: 15px;padding-bottom: 10px\"><button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"$ctrl.add()\" ng-disabled=\"$ctrl.spiceForm.$invalid\"><span class=\"glyphicon glyphicon-send\" aria-hidden=\"true\"></span> Submit</button></div></div><!-- Status View --><div class=\"row\" ng-show=\"$ctrl.showStatus === true\"><div class=\"col-xs-12\" style=\"padding: 15px\"><div class=\"app-alert app-alert-success\" style=\"border-color: #4BC74D\"><h4><span class=\"glyphicon glyphicon-ok\" style=\"top: 6px;padding-right: 10px;color: #4BC74D\"></span>Spice submitted successfully!</h4></div></div></div><div class=\"row\" ng-show=\"$ctrl.showStatus === true\"><div class=\"col-xs-12\" style=\"background:#89E894;padding-top: 15px;padding-bottom: 10px\"><button class=\"btn btn-success pull-right\" ng-click=\"$ctrl.ok()\">OK</button></div></div></div></form>");
$templateCache.put("app/components/loginButton.html","<button ng-if=\"!$ctrl.isLoggedIn()\" class=\"btn btn-success\" ng-click=\"$ctrl.login()\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span> Login</button><ul ng-if=\"$ctrl.isLoggedIn()\" class=\"userDropdown\"><li><a href=\"#\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img ng-src=\"{{$ctrl.authData.google.profileImageURL}}\"><span class=\"hidden-xs\">{{ $ctrl.authData.google.displayName }}&nbsp;&nbsp;</span><span style=\"color:#89E894\" class=\"glyphicon glyphicon-chevron-down\" aria-hidden=\"true\"></span></a><ul class=\"dropdown-menu\"><li><a href=\"#\" ng-click=\"$ctrl.logout()\">Logout</a></li></ul></li></ul>");
$templateCache.put("app/myfeed/myfeed.html","<div class=\"form-group visible-xs-block\" style=\"padding: 10px;margin: 0;background: #5CB85C\"><div class=\"input-group\"><div class=\"input-group-addon\"><span style=\"color:#89E894\" class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></div><input ng-model=\"$root.search\" ng-model-options=\"{ debounce: 250 }\" type=\"text\" class=\"form-control search-input\" placeholder=\"Search\" style=\"-webkit-box-shadow:none;box-shadow:none\"></div></div><sa-spice-card ng-repeat=\"spice in $ctrl.spices | orderBy:\'-timestamp\' | filter: $ctrl.filter as filteredSpices track by spice.$id\" spice=\"spice\"></sa-spice-card><div ng-if=\"$ctrl.loadComplete && filteredSpices.length === 0\" class=\"app-alert app-alert-warning\"><h4><span class=\"glyphicon glyphicon-grain\"></span> No spice found</h4></div>");
$templateCache.put("app/myfeed/spice.html","<div class=\"container-fluid\" style=\"max-width:1000px;margin-bottom:15px;background:#ccc\"><div class=\"row animate-show-flipInX\" ng-if=\"$root.auth.isLoggedIn()\"><div ng-if=\"$ctrl.showConfirm !== true\" class=\"col-xs-12 animate-show-flipInX\" style=\"background:#89E894;padding-bottom:10px;padding-top:10px\"><button ng-if=\"$root.auth.getUser().uid !== $ctrl.spice.user.uid\" ng-click=\"$ctrl.togglePin($ctrl.spice)\" class=\"btn btn-success btn-sm\"><span class=\"glyphicon glyphicon-heart\" aria-hidden=\"true\" title=\"Pin\\Unpin to My Feed\"></span> {{ ($ctrl.spice.pinnedUsers[$root.auth.getUser().uid] === true) ? \'Unpin\' : \'Pin\' }}</button> <button ng-if=\"$root.auth.getUser().uid === $ctrl.spice.user.uid\" ng-click=\"$ctrl.edit($ctrl.spice)\" class=\"btn btn-success btn-sm\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span> Edit</button> <button ng-if=\"$root.auth.getUser().uid === $ctrl.spice.user.uid\" ng-click=\"$ctrl.showConfirm = true\" class=\"btn btn-success btn-sm\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span> Delete</button></div><div ng-if=\"$ctrl.showConfirm === true\" class=\"col-xs-12 animate-show-flipInX\" style=\"padding: 0\"><div class=\"alert alert-danger clearfix\" style=\"border-radius:0;margin-bottom:0;padding: 9px 15px\"><div class=\"pull-left\" style=\"line-height:30px\"><span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\" style=\"font-size: 1.4em;top: 6px;padding-right: 10px\"></span>Are you sure you want to delete this spice?</div><div class=\"pull-right\"><button ng-click=\"$ctrl.showConfirm = false\" class=\"btn btn-default btn-sm\">Cancel</button> <button ng-click=\"$ctrl.delete($ctrl.spice)\" class=\"btn btn-danger btn-sm\">Delete</button></div></div></div></div><div class=\"row\"><div class=\"col-sm-6\" style=\"background:white\"><h2>{{::$ctrl.spice.name}}</h2><div class=\"clearfix\" style=\"padding-bottom: 10px\"><img ng-src=\"{{::$ctrl.spice.user.profileImageURL}}\" class=\"pull-left\" style=\"margin-right:10px;border-radius: 50%;width:32px\"><div class=\"pull-left\"><a href=\"#\" ng-click=\"$root.search = $ctrl.spice.user.name\"><strong>{{::$ctrl.spice.user.name}}</strong></a><div><small>{{::$ctrl.spice.timestamp | date:\'short\'}}</small></div></div></div><div class=\"row\" style=\"padding-bottom: 10px\"><div class=\"col-xs-4\"><span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\"></span> Prep (min)<div style=\"color: #26B937;font-size: 24px\">{{::($ctrl.spice.prepTime) ? $ctrl.spice.prepTime : \'-\'}}</div></div><div class=\"col-xs-4\"><span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\"></span> Cook (min)<div style=\"color:#26B937; font-size: 24px\">{{::($ctrl.spice.cookTime) ? $ctrl.spice.cookTime : \'-\'}}</div></div><div class=\"col-xs-4\"><span class=\"glyphicon glyphicon-cutlery\" aria-hidden=\"true\"></span> Servings<div style=\"color:#26B937; font-size: 24px\">{{::($ctrl.spice.servings) ? $ctrl.spice.servings : \'-\'}}</div></div></div><div style=\"padding-bottom: 10px\">{{::$ctrl.spice.description}}</div><div ng-if=\"::$ctrl.spice.tags\" style=\"padding-bottom: 10px\"><button class=\"btn btn-warning btn-xs\" ng-repeat=\"tag in ::$ctrl.spice.tags.split(\',\')\" ng-click=\"$root.search = tag\" style=\"margin-right:4px\">{{ ::tag }}</button></div></div><div class=\"col-sm-6\" style=\"padding:0\"><img style=\"width:100%\" ng-src=\"{{::$ctrl.spice.imageURL}}\"></div></div><div class=\"row\"><div class=\"col-sm-6\" style=\"background: #ddd;padding: 15px\"><h3 style=\"border-bottom: 1px solid #ccc;padding-bottom: 10px;margin-top:0px\">Ingredients</h3><div style=\"white-space: pre-wrap\">{{::$ctrl.spice.ingredients}}</div></div><div class=\"col-sm-6\" style=\"background: #eee;padding: 15px\"><h3 style=\"border-bottom: 1px solid #ccc;padding-bottom: 10px;margin-top:0px\">Directions</h3><div style=\"white-space: pre-wrap\">{{::$ctrl.spice.directions}}</div></div></div></div>");}]);
'use strict';

//app.module.js
angular
  .module('allSpiceApp', ['ngComponentRouter', 'firebase', 'ngTagsInput'])
  .config(config)
  .value('$routerRootComponent', 'app');

config.$inject = ['$locationProvider', '$firebaseRefProvider'];

function config($locationProvider, $firebaseRefProvider) {
    $locationProvider.html5Mode(true);
    $firebaseRefProvider.registerUrl('https://amber-heat-8766.firebaseio.com');
}

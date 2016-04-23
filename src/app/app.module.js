'use strict';

//app.module.js
angular
  .module('allSpiceApp', ['ngComponentRouter', 'firebase', 'ngTagsInput', 'ngAnimate'])
  .constant('FirebaseUrl', 'https://amber-heat-8766.firebaseio.com')
  .config(config)
  .value('$routerRootComponent', 'app');

config.$inject = ['$locationProvider', '$firebaseRefProvider', 'FirebaseUrl'];

function config($locationProvider, $firebaseRefProvider, FirebaseUrl) {
    $locationProvider.html5Mode(true);
    $firebaseRefProvider.registerUrl({
      default: FirebaseUrl,
      spices: FirebaseUrl + '/spices',
      tags: FirebaseUrl + '/tags'
    });
}
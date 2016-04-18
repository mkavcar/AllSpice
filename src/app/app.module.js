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
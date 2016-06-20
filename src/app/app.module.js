'use strict';

//app.module.js
angular
  .module('allSpiceApp', ['ngComponentRouter', 'firebase', 'ngAnimate', 'ngMaterial'])
  .constant('FirebaseUrl', 'https://amber-heat-8766.firebaseio.com')
  .config(config)
  .value('$routerRootComponent', 'app');

config.$inject = ['$locationProvider', '$firebaseRefProvider', 'FirebaseUrl', '$mdThemingProvider'];

function config($locationProvider, $firebaseRefProvider, FirebaseUrl, $mdThemingProvider) {
    $locationProvider.html5Mode(true);
    $firebaseRefProvider.registerUrl({
      default: FirebaseUrl,
      spices: FirebaseUrl + '/spices',
      tags: FirebaseUrl + '/tags'
    });
    
    //theme
    var customPrimary = {
        '50': '#7be487',
        '100': '#66df74',
        '200': '#50db60',
        '300': '#3bd74d',
        '400': '#2ace3d',
        '500': '#26B937',
        '600': '#22a431',
        '700': '#1d8f2a',
        '800': '#197a24',
        '900': '#15641e',
        'A100': '#90e89a',
        'A200': '#a5edad',
        'A400': '#baf1c0',
        'A700': '#104f18'
    };
    $mdThemingProvider
        .definePalette('customPrimary', 
                        customPrimary);

    var customAccent = {
        '50': '#985f0d',
        '100': '#b06d0f',
        '200': '#c77c11',
        '300': '#df8a13',
        '400': '#ec971f',
        '500': '#eea236',
        '600': '#f2b865',
        '700': '#f4c37d',
        '800': '#f6ce95',
        '900': '#f8d9ac',
        'A100': '#f2b865',
        'A200': '#f0ad4e',
        'A400': '#eea236',
        'A700': '#fae3c4'
    };
    $mdThemingProvider
        .definePalette('customAccent', 
                        customAccent);

    var customBackground = {
        '50': '#b7b7b7',
        '100': '#aaaaaa',
        '200': '#9d9d9d',
        '300': '#909090',
        '400': '#848484',
        '500': '#777',
        '600': '#6a6a6a',
        '700': '#5d5d5d',
        '800': '#515151',
        '900': '#444444',
        'A100': '#c3c3c3',
        'A200': '#d0d0d0',
        'A400': '#dddddd',
        'A700': '#373737'
    };
    $mdThemingProvider
        .definePalette('customBackground', 
                        customBackground);

   $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent');
       //.backgroundPalette('customBackground')
}
/* global quizeditorApp:true */
'use strict';

/**
 * @ngdoc overview
 * @name quizEditorApp
 * @description
 * # quizEditorApp
 *
 * Main module of the application.
 */

var quizeditorApp = angular.module('quizEditorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
  ]);

quizeditorApp.config(['$routeProvider', 
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html'
      })
      .when('/help', {
        templateUrl: 'views/help.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

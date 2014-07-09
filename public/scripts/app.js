'use strict';

/**
 * @ngdoc overview
 * @name quizEditorApp
 * @description
 * # quizEditorApp
 *
 * Main module of the application.
 */

var quizEditorApp = angular.module('quizEditorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'quizEditorControllers'
  ]);

quizEditorApp.config(['$routeProvider', 
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
      .otherwise({
        redirectTo: '/'
      });
  }]);

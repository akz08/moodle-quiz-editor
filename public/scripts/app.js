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
        templateUrl: 'views/summary.html',
        controller: 'SummaryCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

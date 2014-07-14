'use strict';

var quizEditorControllers = angular.module('quizEditorControllers', []);

quizEditorControllers.controller('MainCtrl', ['$scope', 'Restangular', 
	function ($scope, Restangular) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.questionType = 'trueFalse';

    var baseQuestions = Restangular.all('questions');
    // $scope.data = oneQuestion.getList();

    baseQuestions.getList().then(function(questions) {
      $scope.data = questions;
    });

  }]);

quizEditorControllers.controller('TabCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }]);

quizEditorControllers.controller('AboutCtrl', ['$scope',
	function ($scope) {
    $scope.dummy = 1;
  }]);

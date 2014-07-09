
var quizEditorControllers = angular.module('quizEditorControllers', []);

quizEditorControllers.controller('MainCtrl', ['$scope', 
	function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

quizEditorControllers.controller('AboutCtrl', ['$scope',
	function ($scope) {
    $scope.awesomeThings = [
      'me',
      'me again',
      'I'
    ];
  }]);

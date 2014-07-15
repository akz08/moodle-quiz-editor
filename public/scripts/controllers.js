'use strict';

var quizEditorControllers = angular.module('quizEditorControllers', []);

quizEditorControllers.controller('MainCtrl', ['$scope', 'Restangular', 
	function ($scope, Restangular) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // set default question type
    $scope.questionType = 'trueFalse';

    // setup base route for questions
    var baseQuestions = Restangular.all('questions');

    // retrieve questions to display
    $scope.updateQuestions = function() {
      baseQuestions.getList().then(function(allQuestions) {
        $scope.questionPreview = allQuestions;
      });
    };

    // retrieve questions on page load
    $scope.updateQuestions();

    $scope.createQuestion = function() {
      var newMessage = {
        "title": $scope.questionTitle,
        "type": $scope.questionType
      };

      baseQuestions.post(newMessage).then(function(newMsg) {

        $scope.updateQuestions();

      });
    };

    $scope.deleteQuestion = function(id) {
      baseQuestions.get(id).then(function(question) {
        question.remove();
        $scope.updateQuestions();
      });
    };

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

'use strict';

quizeditorApp.controller('SummaryCtrl', ['$scope', 'Questions', 
	function ($scope, Questions) {

    $scope.question = {title: "", type: "trueFalse"};

    Questions.getList().then(function(questions) {
      $scope.questions = questions;
    });

    $scope.createQuestion = function() {
      Questions.post($scope.question).then(function(question) {
        $scope.questions.push(question);
        $scope.question = {title: "", type: "trueFalse"};
      });
    };

    $scope.deleteQuestion = function(question) {
      question.remove().then(function() {
        var i = $scope.questions.indexOf(question);
        $scope.questions.splice(i, 1);
      });
    }

  }]);

quizeditorApp.controller('NavCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }]);

quizeditorApp.controller('AboutCtrl', ['$scope',
	function ($scope) {
    $scope.dummy = 1;
  }]);

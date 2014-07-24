'use strict';

quizeditorApp.controller('NavCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
}])

.controller('MainCtrl', [  
  function () {

}])

.controller('SidebarCtrl', ['$scope', 'Questions',
  function($scope, Questions) {
    $scope.question = {title: '', type: 'trueFalse'};

    Questions.getAll().then(function(questions) {
      $scope.questions = questions;
    });

    $scope.createQuestion = function() {
      Questions.create($scope.question).then(function(question) {
        $scope.questions.push(question);
        $scope.question = {title: '', type: 'trueFalse'};
      });
    };

    $scope.deleteQuestion = function(question) {
      Questions.delete(question.id).then(function() {
        var i = $scope.questions.indexOf(question);
        $scope.questions.splice(i, 1);
      });
    };

    $scope.editQuestion = function(question) {
      Questions.edit(question);
    };

  }])

.controller('EditorCtrl', ['$scope', 'Questions',
  function($scope, Questions) {
    $scope.question = 'dummy';

    var updateQuestion = function() {
      $scope.question = Questions.getCurrent();
    };

    Questions.registerEditObserverCallback(updateQuestion);
}]);
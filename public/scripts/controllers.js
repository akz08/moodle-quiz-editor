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
    $scope.question = {q_title: '', q_type: 'trueFalse'};

    Questions.getAll().then(function(questions) {
      $scope.questions = questions;
    });

    $scope.createQuestion = function() {
      Questions.create($scope.question).then(function(question) {
        $scope.questions.push(question);
        $scope.question = {q_title: '', q_type: 'trueFalse'};
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
      console.log('editing a question');
    };

  }])

.controller('EditorCtrl', ['$scope', '$window', 'Questions',
  function($scope, $window, Questions) {
    $scope.question = {'q_title': 'default title',
                      'q_type': 'default type'};

    var updateQuestion = function() {
      $scope.question = Questions.getCurrent();
    };

    Questions.registerEditObserverCallback(updateQuestion);

    $scope.getMoodleXml = function() {
      // slight hack to get things running. the FULL url should be returned by the service
      var baseUrl = Questions.getCurrentMoodleXmlUrl();
      console.log(baseUrl);

      // open a new window to download the xml file
      $window.open(baseUrl + '/export?type=moodle_xml');
    };
}]);
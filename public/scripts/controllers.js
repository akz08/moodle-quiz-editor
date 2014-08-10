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
    /*jshint camelcase: false */
    $scope.question = {q_name: '', q_type: 'true_false'};

    Questions.getAll().then(function(questions) {
      $scope.questions = questions;
    });

    $scope.createQuestion = function() {
      Questions.create($scope.question).then(function(question) {
        $scope.questions.push(question);
        // update the current question
        $scope.currentQuestion = $scope.question;
        // reset to default empty name and default type
        $scope.question = {q_name: '', q_type: 'true_false'};
      });
    };

    $scope.deleteQuestion = function(question) {
      Questions.delete(question.id).then(function() {
        var i = $scope.questions.indexOf(question);
        $scope.questions.splice(i, 1);

        // set the editor view to 'default'
        $scope.currentQuestion = {'q_name': 'default title',
                      'q_type': 'default type'};
      });
    };

    $scope.editQuestion = function(question) {
      // CALLBACK
      // Questions.edit(question);
      $scope.currentQuestion = question;
      console.log('editing a question');
    };

    $scope.clickError = function() {
      // $dialogs.error('This is my error message');
    };

  }])

.controller('EditorCtrl', ['$scope', '$window', 'Questions',
  function($scope, $window, Questions) {
    /*jshint camelcase: false */
    $scope.currentQuestion = {'q_name': 'default title',
                      'q_type': 'default type'};

    // USED FOR CALLBACK
    // var updateQuestion = function() {
    //   $scope.question = Questions.getCurrent();
    // };

    // Questions.registerEditObserverCallback(updateQuestion);

    $scope.getMoodleXml = function() {
      // slight hack to get things running. the FULL url should be returned by the service
      var baseUrl = Questions.getCurrentMoodleXmlUrl();
      console.log(baseUrl);

      // open a new window to download the xml file
      $window.open(baseUrl + '/export?type=moodle_xml');
    };
}]);
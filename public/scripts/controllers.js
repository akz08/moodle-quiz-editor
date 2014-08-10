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

.controller('SidebarCtrl', ['$scope', '$modal', 'Questions',
  function($scope, $modal, Questions) {
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

    $scope.putQuestion = function(oldQuestion, newQuestion) {
      Questions.put(oldQuestion, newQuestion).then(function(question) {
        // find the current question 
        var index = $scope.questions.indexOf(oldQuestion);
        // replace its value with the updated value
        $scope.questions[index] = question;
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
      // callback to inform observers a question is being edited
      Questions.edit(question);
      $scope.currentQuestion = question;
      console.log('editing a question');
    };
      
    $scope.modalCreate = function() {

      var modalInstance = $modal.open({
        templateUrl: 'views/modalCreateQuestion.html',
        controller: 'ModalCreateQuestionCtrl',
        resolve: { 
          question: function() {
            return $scope.question;
          }
        }
      });

      modalInstance.result.then(function() {
        $scope.createQuestion();
      }, function() {
        console.log('Create Modal Closed');
      });

    }; 

    $scope.modalDelete = function(question) {
      
        // NOTE: passing 'question' back and forth seems unnecessary
        var modalInstance = $modal.open({
          templateUrl: 'views/modalDelete.html',
          controller: 'ModalDeleteCtrl',
          resolve: { 
            question: function() {
              return question;
            }
          }
        });
        
        modalInstance.result.then(function(question){
          //on ok button press 
          $scope.deleteQuestion(question);
        },function(){
          //on cancel button press
          console.log('Delete Modal Closed');
        });
    };   

    $scope.modalEditName = function(oldQuestion) {

      var modalInstance = $modal.open({
        templateUrl: 'views/modalEditName.html',
        controller: 'ModalEditNameCtrl',
        resolve: {
          question: function() {
              return oldQuestion;
            }
        }
      });

      modalInstance.result.then(function(newQuestion) {
        $scope.putQuestion(oldQuestion, newQuestion);
      }, function() {
        console.log('Edit Modal Closed');
      });

    }; 
}])

.controller('EditorCtrl', ['$scope', '$window', 'Questions',
  function($scope, $window, Questions) {
    /*jshint camelcase: false */
    $scope.currentQuestion = {'q_name': 'default title',
                      'q_type': 'default type'};

    // USED FOR CALLBACK
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
}])

.controller('ModalCreateQuestionCtrl', ['$scope', '$modalInstance', 'question',
  function($scope, $modalInstance, question) {

    $scope.question = question;

    $scope.confirm = function() {
      $modalInstance.close();
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

}])

.controller('ModalDeleteCtrl', ['$scope', '$modalInstance', 'question',
  function($scope, $modalInstance, question) {

    $scope.question = question;

    $scope.yes = function() {
      $modalInstance.close($scope.question);
    };

    $scope.no = function() {
      $modalInstance.dismiss('no');
    };

}])

.controller('ModalEditNameCtrl', ['$scope', '$modalInstance', 'question',
  function($scope, $modalInstance, question) {

    $scope.currentQuestion = question;
    $scope.newQuestion = angular.copy(question);

    $scope.confirm = function() {
      $modalInstance.close($scope.newQuestion);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
}]);
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

.controller('SidebarCtrl', ['$scope', '$modal', '$window', 'Categories', 'Editor', 'Questions',
  function($scope, $modal, $window, Categories, Editor, Questions) {
    /*jshint camelcase: false */

    /** CATEGORIES **/

    $scope.getMoodleXml = function(category) {
      // slight hack to get things running. the FULL url should be returned by the service
      var baseUrl = Categories.getMoodleXmlUrl(category);
      console.log(baseUrl);

      // open a new window to download the xml file
      $window.open(baseUrl + '/export?type=moodle_xml');
    }; 

    // initialisation
    $scope.category = {c_name: '', c_description: ''};

    Categories.getAll().then(function(categories) {
      console.log('initialise the categories and set it up');
      $scope.categories = categories;

      // set the first category (default created category) to be the current category
      $scope.currentCategory = categories[0];

      // load all the questions in this category
      $scope.loadCategoryQuestions($scope.currentCategory.id);
    });

    $scope.createCategory = function() {
      Categories.create($scope.category).then(function(category) {
        $scope.categories.push(category);
        // update the current category (could also use the callback)
        $scope.currentCategory = category;
        // reset to default empty category values
        $scope.category = {c_name: '', c_description: ''};
        // load the questions in this new category
        $scope.loadCategoryQuestions($scope.currentCategory.id);
      });
    };

    $scope.putCategory = function(oldCategory, newCategory) {
      Categories.edit(oldCategory, newCategory).then(function(category) {
        // replace the old category in the list
        var index = $scope.categories.indexOf(oldCategory);
        $scope.categories[index] = category;
        // update the current category?
      });
    };

    $scope.deleteCategory = function(category) {
      Categories.delete(category.id).then(function() {
        var i = $scope.categories.indexOf(category);
        $scope.categories.splice(i, 1);
      });
    };

    $scope.modalCreateCategory = function() {

      var modalInstance = $modal.open({
        templateUrl: 'views/modalCreateCategory.html',
        controller: 'ModalCreateCategoryCtrl',
        resolve: { 
          category: function() {
            return $scope.category;
          }
        }
      });

      modalInstance.result.then(function() {
        $scope.createCategory();
      }, function() {
        console.log('Create Modal Closed');
      });

    };

    $scope.modalEditCategory = function(oldCategory) {

      var modalInstance = $modal.open({
        templateUrl: 'views/modalEditCategory.html',
        controller: 'ModalEditCategoryCtrl',
        resolve: {
          category: function() {
              return oldCategory;
            }
        }
      });

      modalInstance.result.then(function(newCategory) {
        $scope.putCategory(oldCategory, newCategory);
      }, function() {
        console.log('Edit Modal Closed');
      });

    };

    $scope.modalDeleteCategory = function(category) {
      
        var modalInstance = $modal.open({
          templateUrl: 'views/modalDeleteCategory.html',
          controller: 'ModalDeleteCategoryCtrl',
          resolve: { 
            category: function() {
              return category;
            }
          }
        });
        
        modalInstance.result.then(function(category){
          //on ok button press 
          $scope.deleteCategory(category);
        },function(){
          //on cancel button press
          console.log('Delete Modal Closed');
        });
    }; 

    $scope.selectCategory = function(category) {
      $scope.currentCategory = category;
      $scope.loadCategoryQuestions(category.id);
    };

    $scope.loadCategoryQuestions = function(categoryId) {
      Categories.getQuestions(categoryId).then(function(questions) {
        console.log('loadCategoryQuestions');
        $scope.questions = questions;
      });
    };

    /** QUESTIONS **/

    // initialisation
    $scope.question = {q_name: '', q_type: 'true_false'};

    $scope.isDefaultQuestion = function() {
      return $scope.currentQuestion.q_name === 'default title';
    };

    // just grab all the questions (for now)
    $scope.loadAllQuestions = function() {
        Questions.getAll().then(function(questions) {
          $scope.questions = questions;
        });

        // set the currentCategory to falsey value to remove css rule on selected category
        $scope.currentCategory = false;
    };

    // default load questions in the current category
    // $scope.loadCategoryQuestions($scope.currentCategory);
    // console.log($scope.currentCategory.id);

    $scope.createQuestion = function() {
      Questions.create($scope.question).then(function(question) {
        $scope.questions.push(question);
        // update the current question
        $scope.currentQuestion = question;
        Questions.editor(question);
        // reset to default empty name and default type
        $scope.question = {q_name: '', q_type: 'true_false'};

        // check if currentCategory exists first
        if ($scope.currentCategory) {
          Categories.registerQuestion($scope.currentCategory.id, question).then(function(categoryQuestions) {
            console.log(categoryQuestions);
          });
        }
      });
    };

    $scope.putQuestion = function(oldQuestion, newQuestion) {
      Questions.edit(oldQuestion, newQuestion).then(function(question) {
        // find the current question 
        var index = $scope.questions.indexOf(oldQuestion);
        // replace its value with the updated value
        $scope.questions[index] = question;
        // update the editor question
        Questions.editor(newQuestion);
      });
    };

    $scope.saveQuestion = function(question) {
      // update the backend question
      $scope.putQuestion(question, question);
      // TODO: update the backend answers 
    };

    $scope.saveCurrentQuestion = function() {
      $scope.putQuestion($scope.currentQuestion, $scope.currentQuestion);
      console.log('saved the current question via the save button');
    };

    // since the controller is called twice, it's registering the thing twice!
    console.log('registering saveCurrentQuestion');
    Editor.registerSaveObserverCallback($scope.saveCurrentQuestion);

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
      // callback to inform observers a question is to be edited in the editor
      Questions.editor(question);
      // $scope.currentQuestion = question;
      // console.log('editing a question');
    };
      
    $scope.modalCreateQuestion = function() {

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
        // console.log('Create Modal Closed');
      });

    }; 

    $scope.modalDeleteQuestion = function(question) {
      
        // NOTE: passing 'question' back and forth seems unnecessary
        var modalInstance = $modal.open({
          templateUrl: 'views/modalDeleteQuestion.html',
          controller: 'ModalDeleteQuestionCtrl',
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
          // console.log('Delete Modal Closed');
        });
    };   

    $scope.modalEditQuestionName = function(oldQuestion) {

      var modalInstance = $modal.open({
        templateUrl: 'views/modalEditQuestionName.html',
        controller: 'ModalEditQuestionNameCtrl',
        resolve: {
          question: function() {
              return oldQuestion;
            }
        }
      });

      modalInstance.result.then(function(newQuestion) {
        $scope.putQuestion(oldQuestion, newQuestion);
      }, function() {
        // console.log('Edit Modal Closed');
      });

    }; 

}])

.controller('AnswersTrueFalseCtrl', ['$rootScope', '$scope', 'Editor', 'Questions', 
  function($rootScope, $scope, Editor, Questions){
    /*jshint camelcase: false */

    // the controller is only called once if types of the same
    // kind are chosen consecutively - need to somehow move the answer 
    // loading logic into here
    console.log('called the answers controller');

    // CALLBACK FUNCTION
    var updateAnswers = function() {
      console.log('called updateAnswers');

      $scope.loadAnswers();

    };

    Questions.registerEditObserverCallback(updateAnswers);

    // $rootScope.$on('editorLoaded', function(event, args) {
    //   console.log(event);
    //   console.log(args);
    // });

    $scope.loadAnswers = function() {
        Questions.getAllAnswers().then(function(answers) {
        // console.log(questions);
        $scope.answers = answers;
        // console.log(answers);

        // if it doesn't have any answers, default add two true/false answers
        console.log($scope.answers.length);

        if ($scope.answers.length === 0) {
        
          Questions.createAnswer({a_answer: 'true'}).then(function(answer) {
            // add the newly created answer to the local list
            $scope.answers.push(answer);
          });
          
          Questions.createAnswer({a_answer: 'false'}).then(function(answer) {
            // add the newly created answer to the local list
            $scope.answers.push(answer);
          });
        }

      });
    };

    // $scope.editAnswer = function(answer) {
    //   answer.editing = true;
    // };

    $scope.putAnswer = function(answer) {
      Questions.editAnswer(answer).then(function(answer) {
        console.log(answer);
      });
    };

    var putAllAnswers = function() {
      for(var i = 0; i < $scope.answers.length; i++) {
        $scope.putAnswer($scope.answers[i]);
      }
    };

    Editor.registerSaveObserverCallback(putAllAnswers);

    // $scope.doneEditing = function(answer) {
    //   if (! angular.element(answer.srcElement).hasClass('editable')) {
    //     angular.forEach($scope.answers, function(answer) {
    //       // set the answer editing value to false to trigger ng-show/hide
    //       answer.editing = false;
    //       // console.log(answer);
    //     });
    //   }
    //   // update the answer in the backend
    //   $scope.putAnswer(answer);
    // };

    $scope.toggleCorrect = function() {
      if ($scope.answers[0].a_fraction) {
        $scope.answers[0].a_fraction = 0;
        $scope.answers[1].a_fraction = 100;
      } else {
        $scope.answers[0].a_fraction = 100;
        $scope.answers[1].a_fraction = 0; 
      }
    };

    // $scope.newAnswer = function() {
    //   // create a new answer with blank text
    //   var newAnswerTemplate = {a_answer: '', editing: false};
    //   Questions.createAnswer(newAnswerTemplate).then(function(answer) {
    //     // add the newly created answer to the local list
    //     $scope.answers.push(answer);
    //   });
    // };

    // $scope.deleteAnswer = function(answer) {
    //   Questions.deleteAnswer(answer.id).then(function() {
    //     console.log('controller:');
    //     console.log(answer);
    //     var i = $scope.answers.indexOf(answer);
    //     $scope.answers.splice(i, 1);
    //   });
    // };
  
}])

.controller('EditorCtrl', ['$rootScope', '$scope', '$window', 'Editor', 'Questions',
  function($rootScope, $scope, $window, Editor, Questions) {
    /*jshint camelcase: false */
    $scope.currentQuestion = {'q_name': 'default title',
                      'q_type': 'default type'};

    $scope.answers = [];

    $scope.saveEditor = function() {
      Editor.save();
      console.log('clicked on save button!');
    };

    // CALLBACK FUNCTION
    var updateQuestion = function() {
      console.log('called updateQuestion');
      // update the question in the editor to the selected one
      $scope.currentQuestion = Questions.getCurrent();
      // var args = 1;
      // $rootScope.$emit('editorLoaded', args);
      // update its answers too 
      //  : TO BE REMOVED AND PUT INTO ANSWER CTRL LOGIC (somehow)
      // $scope.loadAnswers();

    };

    Questions.registerEditObserverCallback(updateQuestion);

    // returns a boolean if the current question type matches the 
    // given answer type 
    $scope.isTypeMatched = function(answerType) {
      // replace hyphens with underscores to match the 
      //  backend data representation as a convenience

      answerType = answerType.replace('-', '_');

      if ($scope.currentQuestion.q_type === answerType) {
        return true;
      } else {
        return false;
      }
    };

    // $scope.getMoodleXml = function() {
    //   // slight hack to get things running. the FULL url should be returned by the service
    //   var baseUrl = Questions.getCurrentMoodleXmlUrl();
    //   console.log(baseUrl);

    //   // open a new window to download the xml file
    //   $window.open(baseUrl + '/export?type=moodle_xml');
    // };

    // TinyMCE options
    $scope.tinymceOptions = {
      // handle_event_callback: function (e) {

      // },
      menubar: '',
      toolbar: false
    };



    // // some test code to try prototype the answer creation blocks
    // // $scope.answers = [{ a_answer: 'answer 1', editing: false}, {a_answer: 'answer 2', editing: false}];
    // // $scope.answers = [];

    // $scope.editAnswer = function(answer) {
    //   answer.editing = true;
    // };

    // $scope.putAnswer = function(answer) {
    //   Questions.editAnswer(answer).then(function(answer) {
    //     console.log(answer);
    //   });
    // };

    // $scope.doneEditing = function(answer) {
    //   if (! angular.element(answer.srcElement).hasClass('editable')) {
    //     angular.forEach($scope.answers, function(answer) {
    //       // set the answer editing value to false to trigger ng-show/hide
    //       answer.editing = false;
    //       // console.log(answer);
    //     });
    //   }
    //   // update the answer in the backend
    //   $scope.putAnswer(answer);
    // };

    // $scope.newAnswer = function() {
    //   // create a new answer with blank text
    //   var newAnswerTemplate = {a_answer: '', editing: false};
    //   Questions.createAnswer(newAnswerTemplate).then(function(answer) {
    //     // add the newly created answer to the local list
    //     $scope.answers.push(answer);
    //   });
    // };

    // $scope.deleteAnswer = function(answer) {
    //   Questions.deleteAnswer(answer.id).then(function() {
    //     console.log('controller:');
    //     console.log(answer);
    //     var i = $scope.answers.indexOf(answer);
    //     $scope.answers.splice(i, 1);
    //   });
    // };

}])

.controller('ModalCreateCategoryCtrl', ['$scope', '$modalInstance', 'category',
 function($scope, $modalInstance, category) {

  $scope.category = category;

  $scope.confirm = function() {
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
  
}])

.controller('ModalEditCategoryCtrl', ['$scope', '$modalInstance', 'category',
 function($scope, $modalInstance, category) {
  
    $scope.currentCategory = category;
    $scope.newCategory = angular.copy(category);

    $scope.confirm = function() {
      $modalInstance.close($scope.newCategory);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

}])

.controller('ModalDeleteCategoryCtrl', ['$scope', '$modalInstance', 'category',
 function($scope, $modalInstance, category){
  
    $scope.category = category;

    $scope.yes = function() {
      $modalInstance.close($scope.category);
    };

    $scope.no = function() {
      $modalInstance.dismiss('no');
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

.controller('ModalDeleteQuestionCtrl', ['$scope', '$modalInstance', 'question',
  function($scope, $modalInstance, question) {

    $scope.question = question;

    $scope.yes = function() {
      $modalInstance.close($scope.question);
    };

    $scope.no = function() {
      $modalInstance.dismiss('no');
    };

}])

.controller('ModalEditQuestionNameCtrl', ['$scope', '$modalInstance', 'question',
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
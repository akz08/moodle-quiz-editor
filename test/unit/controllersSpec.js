'use strict';

describe('QuizEditor controllers', function () {

  describe('MainCtrl', function() {

    // load the controller's module
    beforeEach(module('quizEditorApp'));

    var ctrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {
        $scope: scope
      });
    }));

    it('should have an empty input title', function () {
      expect(scope.question.title).toBe("");
    });

  });

});

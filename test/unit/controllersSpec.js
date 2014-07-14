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

    it('should attach a list of awesomeThings to the scope', function () {
      expect(scope.awesomeThings.length).toBe(3);
    });

  });

});

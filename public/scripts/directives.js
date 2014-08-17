'use strict';

quizeditorApp.directive('layoutContainer', function() {
    return {
    	scope: {},
        link: function (scope, element) {
                /*jshint camelcase: false */
	        	element.layout({
	                west: {
                        resizable : false,
                        initClosed : false,
                        // livePaneResizing: true,
                        size: 600,
                        // minSize: 300,
                        // maxSize: 400,
                        spacing_open: 10,
                        spacing_closed: 10
	                }
	            });
        }
    };
})
.directive('categorySidebar', function() {
    return {
        restrict: 'A', 
        controller: 'SidebarCtrl',
        templateUrl: 'views/categorySidebar.html'
    };
})
.directive('questionSidebar', function() {
    return {
        restrict: 'A', 
        controller: 'SidebarCtrl', // by sharing the controller, the controller is 'called' twice
        templateUrl: 'views/questionSidebar.html'
    };
})
.directive('editorMain', function() {
    return {
        restrict: 'A',
        controller: 'EditorCtrl',
        templateUrl: 'views/editor.html'
    };
})
.directive('answersTrueFalse', function() {
    return {
        restrict: 'E',
        scope: {
            answers: '=answers'
        },
        // template: 'You have loaded the tf answers directive',
        controller: 'AnswersTrueFalseCtrl',
        templateUrl: 'views/answersTrueFalse.html'
    };
})
.directive('answersMultipleChoice', function() {
    return {
        restrict: 'E',
        // template: 'You have loaded the mcq answers directive',
        templateUrl: 'views/answersMultipleChoice.html'
    };
});
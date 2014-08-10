'use strict';

quizeditorApp.directive('layoutContainer', function() {
    return {
    	scope: {},
        link: function (scope, element) {
                /*jshint camelcase: false */
	        	element.layout({
	                west: {
	                  resizable : true,
	                  initClosed : false,
	                  livePaneResizing: true,
	                  size: 300,
                        minSize: 300,
                        maxSize: 400,
                        spacing_open: 10,
                        spacing_closed: 10
	                }
	            });
        }
    };
})
.directive('editorSidebar', function() {
    return {
        replace: false,
        restrict: 'A', 
        controller: 'SidebarCtrl',
        templateUrl: 'views/sidebar.html'
    };
})
.directive('editorMain', function() {
    return {
        replace: false,
        restrict: 'A',
        controller: 'EditorCtrl',
        templateUrl: 'views/editor.html'
    };
});
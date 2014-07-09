'use strict';

/* Services */

var quizEditorServices = angular.module('quizEditorServices', ['ngResource']);

quizEditorServices.factory('Question', ['$resource', 
	function($resource) {
		return $resource('api/questions/:questionId.json', {}, {
			
		});
	}]);
'use strict';

/* Services */

quizeditorApp.factory('Questions', ['Restangular',
	function(Restangular) {
		var restAngular =
			Restangular.withConfig(function(Configurer) {
				Configurer.setBaseUrl('/api');

				// setup to use .originalElement to access 'unrestangularized' element
				Configurer.setResponseExtractor(function(response) {
				  var newResponse = response;
				  if (angular.isArray(response)) {
				    angular.forEach(newResponse, function(value, key) {
				      newResponse[key].originalElement = angular.copy(value);
				    });
				  } else {
				    newResponse.originalElement = angular.copy(response);
				  }

				  return newResponse;
				});
			});

		var _Questions = restAngular.all('questions');

		var currentQuestion = {};

		// to register observers when a question is to be edited
		var editObserverCallbacks = [];

		// notify observers of the current question to edit
		var notifyEditObservers = function() {
			angular.forEach(editObserverCallbacks, function(callback) {
				callback();
			});
		};

		return {
			registerEditObserverCallback : function(callback) {
				editObserverCallbacks.push(callback);
			},
			setCurrent: function(question) {
				currentQuestion = question;
			},
			getCurrent: function() {
				return currentQuestion;
			},
			getCurrentMoodleXmlUrl: function() {
				// returns the base Moodle XML url. need to incorporate /export?type=moodle_xml in somehow.
				return restAngular.one('questions', currentQuestion.id).getRestangularUrl();
			},
			getAll: function() {
				return _Questions.getList();			
			},
			create: function(newQuestion) {
				return _Questions.post(newQuestion).then(function(result) {
					return result;
				});
			},
			// for when the question is selected for the edit window
			edit: function(question) {

				this.setCurrent(question); 
				notifyEditObservers();
			},
			// this actually edits the question (some renaming is in order)
			put: function() {

			},
			delete: function(questionId) {
				// get question by the given id, and delete if found
				return _Questions.get(questionId).then(function(question) {
					question.remove();
				});
			}

		};
	}
]);

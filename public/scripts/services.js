'use strict';

/* Services */

quizeditorApp.factory('Questions', ['Restangular',
	function(Restangular) {
		var restAngular =
			Restangular.withConfig(function(Configurer) {
				Configurer.setBaseUrl('/api');
			});

		var _Questions = restAngular.all('questions');

		return {
			getAll: function() {
				// TODO: sanitize this object. it currently returns an entire restangular object collection
				return _Questions.getList();			
			},
			create: function(newQuestion) {
				return _Questions.post(newQuestion).then(function(result) {
					// add the id to the original sent item
					newQuestion.id = result.id;	

					return newQuestion;
				});
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

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
			getAllAnswers: function() {
				// return the answers of the currentQuestion
				return _Questions.get(currentQuestion.id).then(function(question) {
					return question.getList('answers');
				});
			},
			create: function(newQuestion) {
				return _Questions.post(newQuestion).then(function(result) {
					return result;
				});
			},
			createAnswer: function(newAnswer) {
				return restAngular.one('questions', currentQuestion.id).all('answers').post(newAnswer).then(function(result) {
					return result;
				});
			},
			// for when the question is selected for the editor window
			editor: function(question) {
				currentQuestion = question;
				notifyEditObservers();
			},
			edit: function(oldQuestion, newQuestion) {
				return restAngular.one('questions', newQuestion.id).customPUT(newQuestion).then(function(result) {
					return result;
				});
			},
			editAnswer: function(answer) {
				return answer.customPUT(answer).then(function(result) {
					return result;
				});
			},
			delete: function(questionId) {
				// get question by the given id, and delete if found
				return _Questions.get(questionId).then(function(question) {
					question.remove();
				});
			},
			deleteAnswer: function(answerId) {
				// console.log(answerId);
				return restAngular.one('questions',currentQuestion.id).one('answers', answerId).get().then(function(answer) {
					answer.remove();
				});

				// currentQuestion.getList('answers').then(function(answer) {
				// 		console.log(answer.get(answerId));
						// console.log(answer);
					// });
				// });
			}

		};
	}
])
.factory('Categories', ['Restangular', 
	function(Restangular){
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

		var _Categories = restAngular.all('categories');

		var currentCategory = {};

		// to register observers when a category is to be edited
		var editObserverCallbacks = [];

		// notify observers of the current category to edit
		var notifyEditObservers = function() {
			angular.forEach(editObserverCallbacks, function(callback) {
				callback();
			});
		};

		return {
			registerCategoryObserverCallback : function(callback) {
				editObserverCallbacks.push(callback);
			},
			setCurrent: function(category) {
				currentCategory = category;
			},
			getCurrent: function() {
				return currentCategory;
			},
			selectCategory: function(category) {
				this.setCurrent(category);
				notifyEditObservers();
			},
			getQuestions: function(categoryId) {
				// restAngular.all('categories').get(categoryId).then(function(categories) {
				// 	console.log(categories);
				// 	console.log(categories.getList('questions'));
				// });

				return _Categories.get(categoryId).then(function(category) {
					// console.log(category.getList('questions'));

					return category.getList('questions');
				});

				// var category = _Categories.getList();
				// return category;
			},
			registerQuestion: function(categoryId, question) {
				// post a question to the category/:c_id/questions route
				// where :c_id is categoryId
				return _Categories.get(categoryId).then(function(category) {
					return category.post('questions', question);
				});
			},
			getAll: function() {
				return _Categories.getList();
			},
			create: function(newCategory) {
				return _Categories.post(newCategory).then(function(result) {
					return result;
				});
			},
			edit: function(oldCategory, newCategory) {
				return oldCategory.customPUT(newCategory).then(function(result) {
					return result;
				});
			},
			delete: function(categoryId) {
				// get category by the given id, and delete if found
				return _Categories.get(categoryId).then(function(category) {
					category.remove();
				});
			}
		};
	}
])
.factory('Editor', [function(){

	var saveObserverCallbacks = [];

	var notifySaveObservers = function() {
		angular.forEach(saveObserverCallbacks, function(callback) {
			callback();
		});
	};

	return {
		registerSaveObserverCallback: function(callback){
			saveObserverCallbacks.push(callback);
		},
		save: function() {
			notifySaveObservers();
			console.log('this many observer callbacks:');
			console.log(saveObserverCallbacks.length);
		}
	};
}]);

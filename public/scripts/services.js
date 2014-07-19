'use strict';

/* Services */

quizeditorApp.factory('Questions', ['Restangular', 
	function(Restangular) {
		return Restangular.service('questions');
	}
]);

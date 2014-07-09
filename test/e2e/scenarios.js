'use strict'

describe('QuizEditor App', function() {

	it('should redirect index.html to index.html#/', function() {
		browser.get('index.html');
		browser.getLocationAbsUrl().then(function(url) {
			expect(url.split('#')[1]).toBe('/');
		});
	});

});
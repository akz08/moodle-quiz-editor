'use strict'

/* NOTE: using the ACTUAL back-end for testing, so the data WILL persist.
	this means that some tests may fail if run many times 
	- this needs to be fixed */

describe('QuizEditor App', function() {
	var ptor;

	beforeEach(function() {
		browser.get('#/');
		ptor = protractor.getInstance();
	});

	describe('Page Navigation', function() {
		it('should navigate to the /about page when clicking', function() {
			element(by.css('.navbar-collapse ul:first-child li:nth-child(2)')).click();
			expect(ptor.getCurrentUrl()).toMatch(/\/about/);
		});

		it('should navigate to the /contact page when clicking', function() {
			element(by.css('.navbar-collapse ul:first-child li:nth-child(3)')).click();
			expect(ptor.getCurrentUrl()).toMatch(/\/contact/);
		});

		it('should have a default category', function() {
			expect(element.all(by.repeater('category in categories')).first().getText()).toContain('Default Category');
		});
	});

	describe('Categories', function() {
		var startCount;

		beforeEach(function() {
			// resolving promise to get count (a bit of a bother, really)
			element.all(by.repeater('category in categories')).count().then(function(originalCount) {
				startCount = originalCount;
			});
		});

		it('should add a category using the category modal', function() {
			element(by.css('.category-sidebar .sidebar-static-bottom input')).click();

			// add and submit the new category's details
			element(by.model('category.c_name')).sendKeys('Test Category');
			element(by.model('category.c_description')).sendKeys('Test Description');
			element(by.css('.modal-footer button:first-child')).click();

			// verify the addition
			expect(element.all(by.repeater('category in categories')).count()).toEqual(startCount + 1);
			expect(element.all(by.repeater('category in categories')).last().getText()).toContain('Test Category');
		});

		it('should allow a category to be edited', function() {
			// open the edit modal on the last item
			element.all(by.repeater('category in categories')).last().element(by.css('.dropdown-toggle')).click();
			element.all(by.repeater('category in categories')).last().element(by.css('.dropdown-menu')).element(by.css('ul li:nth-child(3) a')).click();

			// change the name and description (NOTE: may want to change the model name in the future)
			element(by.model('newCategory.c_name')).clear();
			element(by.model('newCategory.c_description')).clear();
			element(by.model('newCategory.c_name')).sendKeys('Changed Category');
			element(by.model('newCategory.c_description')).sendKeys('Changed Description');
			element(by.css('.modal-footer button:first-child')).click();

			// verify the change
			expect(element.all(by.repeater('category in categories')).last().getText()).toContain('Changed Category');
			expect(element.all(by.repeater('category in categories')).last().getText()).toContain('Changed Description');
		}); 

		it('should allow a category to be deleted', function() {
			// open the delete modal on the last item
			element.all(by.repeater('category in categories')).last().element(by.css('.dropdown-toggle')).click();
			element.all(by.repeater('category in categories')).last().element(by.css('.dropdown-menu')).element(by.css('ul li:nth-child(4) a')).click();

			// delete the category
			element(by.css('.modal-footer button:first-child')).click();

			// verify the deletion
			expect(element.all(by.repeater('category in categories')).count()).toEqual(startCount - 1);
		});
	});

	describe('Questions', function() {
		var startCount;

		beforeEach(function() {
			// resolving promise to get count (a bit of a bother, really)
			element.all(by.repeater('question in questions')).count().then(function(originalCount) {
				startCount = originalCount;
			});
		});

		it('should add a question using the question modal', function() {
			element(by.css('.question-sidebar .sidebar-static-bottom input')).click();

			// add and submit the new question's details
			element(by.model('question.q_name')).sendKeys('Test Question');
			element(by.css('.modal-footer button:first-child')).click();

			// verify the addition
			expect(element.all(by.repeater('question in questions')).count()).toEqual(startCount + 1);
			expect(element.all(by.repeater('question in questions')).last().getText()).toContain('Test Question');
		});

		it('should allow a question to be renamed', function() {
			// open the rename modal on the last item
			element.all(by.repeater('question in questions')).last().element(by.css('.dropdown-toggle')).click();
			element.all(by.repeater('question in questions')).last().element(by.css('.dropdown-menu')).element(by.css('ul li:nth-child(1) a')).click();

			// change the name (NOTE: may want to change the model name in the future)
			element(by.model('newQuestion.q_name')).clear();
			element(by.model('newQuestion.q_name')).sendKeys('Changed Question');
			element(by.css('.modal-footer button:first-child')).click();

			// verify the change
			expect(element.all(by.repeater('question in questions')).last().getText()).toContain('Changed Question');
		}); 

		it('should allow a question to be deleted', function() {
			// open the delete modal on the last item
			element.all(by.repeater('question in questions')).last().element(by.css('.dropdown-toggle')).click();
			element.all(by.repeater('question in questions')).last().element(by.css('.dropdown-menu')).element(by.css('ul li:nth-child(2) a')).click();

			// delete the question
			element(by.css('.modal-footer button:first-child')).click();

			// verify the deletion
			expect(element.all(by.repeater('question in questions')).count()).toEqual(startCount - 1);
		});

		it('should allow a question to be saved in the editor', function() {
			// create a new question 
			element(by.css('.question-sidebar .sidebar-static-bottom input')).click();
			element(by.model('question.q_name')).sendKeys('Saved Question');
			element(by.css('.modal-footer button:first-child')).click();

			// verify it's loaded in the editor
			expect(element(by.css('.question-editor h1')).getText()).toContain('Saved Question');
			expect(element(by.css('.question-editor h2')).getText()).toContain('true_false');

			// complete the question
			element(by.model('currentQuestion.q_body')).sendKeys('Does this work?');
			element.all(by.repeater('answer in answers')).first().element(by.css('i.correct-icon')).click();
			expect(element.all(by.repeater('answer in answers')).first().element(by.css('i.correct-icon')).getAttribute('class')).toMatch(/answer-btn-correct-toggled/);

			// save the question
			element(by.css('.editor-navbar ul li:first-child a')).click();

			// create and delete a question to refresh the editor (rework this)
			element(by.css('.question-sidebar .sidebar-static-bottom input')).click();
			element(by.model('question.q_name')).sendKeys('Delete Me!');
			element(by.css('.modal-footer button:first-child')).click();
			element.all(by.repeater('question in questions')).last().element(by.css('.dropdown-toggle')).click();
			element.all(by.repeater('question in questions')).last().element(by.css('.dropdown-menu')).element(by.css('ul li:nth-child(2) a')).click();
			element(by.css('.modal-footer button:first-child')).click();

			// load up the saved question in the editor
			element.all(by.repeater('question in questions')).last().element(by.css('button.col-sm-10')).click();

			// verify it loaded as saved
			expect(element(by.model('currentQuestion.q_body')).getText()).toContain('Does this work?');
			expect(element.all(by.repeater('answer in answers')).first().element(by.css('i.correct-icon')).getAttribute('class')).toMatch(/answer-btn-correct-toggled/);
		});
	});
});

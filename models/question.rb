class Question < ActiveRecord::Base

	valid_types = [ "calculated", "description", "essay", "matching", "embeddedAnswers", 
					"multipleChoice", "shortAnswer", "numerical", "trueFalse" ]

	validates :q_name, presence: true
	validates :q_type, presence: true, 
  				inclusion: { in: valid_types,
  					message: "%{value} is not a valid type" }


end

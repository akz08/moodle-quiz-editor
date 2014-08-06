class Answer < ActiveRecord::Base
	# Association
	belongs_to :question
end
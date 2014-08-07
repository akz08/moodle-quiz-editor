class Answer < ActiveRecord::Base
	## Association
	belongs_to :question

  ## Validation
  validates :question_id, presence: true
end
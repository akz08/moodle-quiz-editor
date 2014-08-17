class Question < ActiveRecord::Base
	## Association
	belongs_to :user
	has_many :answers, dependent: :destroy
	has_and_belongs_to_many :categories

	## Validation
  validates :user_id, presence: true

	valid_types = [ "multiple_choice", "true_false" ]

  # Remaining Moodle question types to be implemented
  # valid_types.concat( ["calculated", "description", "essay", "matching", 
          # "embedded_answers", "short_answer", "numerical"] )

	validates :q_name, presence: true
	validates :q_type, presence: true, 
  				inclusion: { in: valid_types,
  					message: "%{value} is not a valid type" }

  ## Defaults (to stub out user_id)
  after_initialize :defaults

	def defaults
 		# Defaults to the seeded admin account
 		self.user_id ||= 1
 	end	
end

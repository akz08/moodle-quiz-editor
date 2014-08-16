# @note In Moodle, question categories can be nested. 
#   For simplicity, this is not currently supported.

class Category < ActiveRecord::Base
	## Association
	has_and_belongs_to_many :questions

  ## Validation
  validates :c_name, presence: true
end
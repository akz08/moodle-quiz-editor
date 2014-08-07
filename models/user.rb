class User < ActiveRecord::Base
	## Association
	has_many :questions, dependent: :destroy

	## Validation
	validates :u_email, presence: true
	validates :u_password, presence: true
end
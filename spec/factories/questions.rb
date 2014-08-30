FactoryGirl.define do
	factory :question do
		q_name "A question title"
		q_type "true_false"
	end 

  factory :answer do
    a_answer "An answer"

    question 
  end
end
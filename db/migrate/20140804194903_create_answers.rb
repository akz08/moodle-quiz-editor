class CreateAnswers < ActiveRecord::Migration
  def change
  	create_table :multiple_choice_answers do |t|
  	  # Foreign-key reference
	  	t.integer :question_id
	  	t.timestamps
	  end

	  create_table :true_false_answers do |t|
	  	# Foreign-key reference
	  	t.integer :question_id
	  	t.timestamps
	  end
  end
end

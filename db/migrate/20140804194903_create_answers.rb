class CreateAnswers < ActiveRecord::Migration
  def change
  	create_table :answers do |t|
  	  # Foreign-key reference
	  	t.integer :question_id

      t.text :a_answer
      # the fraction of the overall available marks
      t.decimal :a_fraction
      t.text :a_feedback
	  	t.timestamps
	  end
  end
end

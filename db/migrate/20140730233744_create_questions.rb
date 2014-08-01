class CreateQuestions < ActiveRecord::Migration
  def up
    create_table :questions do |t|
      t.string :q_title
      t.string :q_type
      t.timestamps
    end
    # Question.create(q_title: "My first question", q_type: "And a type")
  end
  def down
    drop_table :questions
  end
end

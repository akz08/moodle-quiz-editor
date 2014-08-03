class CreateQuestions < ActiveRecord::Migration
  def up
    create_table :questions do |t|
      t.string :q_name
      t.string :q_type
      t.timestamps
    end
    add_index :questions, :q_name
    # Question.create(q_name: "My first question", q_type: "And a type")
  end
  def down
    drop_table :questions
  end
end

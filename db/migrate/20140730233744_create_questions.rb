class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      # Foreign-key reference
      t.integer :user_id

      t.string :q_name
      t.string :q_type
      t.text   :q_body
      t.timestamps
    end
    add_index :questions, :q_name
    # Question.create(q_name: "My first question", q_type: "And a type")
  end
end

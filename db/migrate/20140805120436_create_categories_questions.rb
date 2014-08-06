class CreateCategoriesQuestions < ActiveRecord::Migration
  def change
  	create_table :categories_questions, id: false do |t|
  		t.references :category
  		t.references :question
  	end
  end
end

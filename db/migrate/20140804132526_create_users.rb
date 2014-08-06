class CreateUsers < ActiveRecord::Migration
  def change
  	create_table :users do |t|
  		t.string :u_name
  		t.string :u_email
  		# CHANGE THIS TO BE SECURE!!!
  		t.string :u_password
  		t.timestamps
  	end
  	add_index :users, :u_name
  end
end

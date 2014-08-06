# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140805120436) do

  create_table "answers", force: true do |t|
    t.integer  "question_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", force: true do |t|
    t.string   "c_name"
    t.text     "c_description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories_questions", id: false, force: true do |t|
    t.integer "category_id"
    t.integer "question_id"
  end

  create_table "questions", force: true do |t|
    t.integer  "user_id"
    t.string   "q_name"
    t.string   "q_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "questions", ["q_name"], name: "index_questions_on_q_name", using: :btree

  create_table "users", force: true do |t|
    t.string   "u_name"
    t.string   "u_email"
    t.string   "u_password"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["u_name"], name: "index_users_on_u_name", using: :btree

end

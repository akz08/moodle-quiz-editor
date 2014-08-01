ENV['RACK_ENV'] = 'test'

require "rubygems"
require "bundler"

Bundler.setup(:default, :test)

require "database_cleaner"
require "factory_girl"
FactoryGirl.definition_file_paths = %w{./factories ./test/factories ./spec/factories}
FactoryGirl.find_definitions
Dir[File.dirname(__FILE__)+"/support/*.rb"].each {|file| require file }

require "rspec"
require "rack/test"
require "sinatra"
require "sinatra/activerecord"
	
require_relative "../app_api"

set :environment, :test

def get_json(path)
	get path
	json_parse(last_response.body)
end

def post_json(url, data)
	post(url, json(data), { "Content-Type" => "application/json" })
	json_parse(last_response.body)
end

# JSON helpers

def json_parse(body)
	MultiJson.load(body, symbolize_keys: true)
end

def json(hash)
	MultiJson.dump(hash, pretty: true)
end

def app
	QuizEditor::App 
end

RSpec.configure do |config|
	config.include Rack::Test::Methods
	# config.include FactoryGirl::Syntax::Methods # was causing problems...

	config.color = true

	config.before(:suite) do
		# FactoryGirl.lint
		DatabaseCleaner.strategy = :transaction
		DatabaseCleaner.clean_with :transaction

	end

	config.before(:each) do
		DatabaseCleaner.start
	end

	config.after(:each) do
		DatabaseCleaner.clean
	end
end

FactoryGirl.register_strategy(:json, JsonStrategy)
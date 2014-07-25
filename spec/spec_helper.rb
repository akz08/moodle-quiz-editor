ENV['RACK_ENV'] = 'test'

require 'bundler'
Bundler.require :test

require_relative '../app'

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
	Sinatra::Application
end

RSpec.configure do |config|
	config.include Rack::Test::Methods

	config.color = true

	config.before(:each) { DataMapper.auto_migrate! }
end
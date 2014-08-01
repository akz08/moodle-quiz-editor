require "multi_json"

require "sinatra/base"
require "sinatra/namespace"
require "sinatra/activerecord"

require_relative "helpers/init"
require_relative "models/init"
require_relative "routes/init"

module QuizEditor
	class App < Sinatra::Base
		# Routes
		use Routes::Questions
	end
end

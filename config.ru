require "./app_api"
require "./app_frontend"

# Frontend app
map "/" do

	map "/bower_components" do
		run Rack::Directory.new("./bower_components")
	end

	run FrontEnd::App
end

# API app
map "/api" do
	run QuizEditor::App 
end

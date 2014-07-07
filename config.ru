require File.expand_path('../app.rb', __FILE__)
require 'sinatra'
use Rack::ShowExceptions

set :environment, ENV['RACK_ENV'].to_sym
disable :run, :reload

# map the resource directories
map "/bower_components" do
	run Rack::Directory.new("./bower_components")
end

map "/styles" do
	run Rack::Directory.new("./app/styles")
end

map "/scripts" do
	run Rack::Directory.new("./app/scripts")
end

map "/views" do
	run Rack::Directory.new("./app/views")
end

map "/images" do
	run Rack::Directory.new("./app/images")
end

run MyApp.new
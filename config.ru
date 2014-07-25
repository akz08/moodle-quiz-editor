require File.expand_path('../app.rb', __FILE__)
require 'sinatra'
require 'rack-livereload'

use Rack::LiveReload
use Rack::ShowExceptions

set :environment, ENV['RACK_ENV'].to_sym

# map the resource directories
map "/bower_components" do
	run Rack::Directory.new("./bower_components")
end

map "/styles" do
	run Rack::Directory.new("./public/styles")
end

map "/scripts" do
	run Rack::Directory.new("./public/scripts")
end

map "/views" do
	run Rack::Directory.new("./public/views")
end

map "/images" do
	run Rack::Directory.new("./public/images")
end

run Sinatra::Application
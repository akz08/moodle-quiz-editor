require 'rubygems'
require 'sinatra/base'

class MyApp < Sinatra::Base

	get '/' do 
		'Hello world! Everything is finally set up! This is development. It really is!'
	end

end
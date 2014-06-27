require 'rubygems'
require 'sinatra/base'

class MyApp < Sinatra::Base

	get '/' do 
		'Hello world! Everything is finally set up!'
	end

end
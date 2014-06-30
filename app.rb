require 'rubygems'
require 'sinatra/base'

class MyApp < Sinatra::Base

	get '/' do 
  		File.read(File.join('public', 'index.html'))
	end

end
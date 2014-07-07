require 'rubygems'
require 'sinatra'
require 'data_mapper'
require 'json'
require 'dm-migrations'

class MyApp < Sinatra::Base
	
	DataMapper::Logger.new($stdout, :debug)

	DataMapper.setup(:default, 'mysql://root:uclthesis@localhost/moodle_quiz_editor')

	get '/' do 
  		File.read(File.join('app', 'index.html'))
	end


	require './models/init'
	require './helpers/init'
	require './routes/init'

	DataMapper.finalize

end


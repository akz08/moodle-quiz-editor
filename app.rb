ENV['RACK_ENV'] ||= 'development'

require 'bundler'
Bundler.require

enable :sessions
register Sinatra::Flash

DataMapper.setup(:default, 'mysql://root:uclthesis@localhost/moodle_quiz_editor')

configure :test do
	DataMapper.setup(:default, 'sqlite::memory:')
end

get '/' do 
	File.read(File.join('public', 'index.html'))
end


require './models/init'
require './helpers/init'
require './routes/init'

DataMapper.finalize
DataMapper.auto_upgrade!

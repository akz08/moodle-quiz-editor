require File.dirname(__FILE__) + '/spec_helper'

describe 'Quiz Editor' do

	def app
		Sinatra::Application
	end	

	it 'should' do
		get '/'
		expect(last_response).to be_ok
	end
end
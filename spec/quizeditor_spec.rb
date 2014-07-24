require File.dirname(__FILE__) + '/spec_helper'

describe 'Quiz Editor API' do

	describe "GET /api/questions" do

		before(:example) { get '/api/questions' }
		let(:json) { JSON.parse last_response.body }

		it 'responds successfully' do
			expect(last_response).to be_ok
		end

	end
end
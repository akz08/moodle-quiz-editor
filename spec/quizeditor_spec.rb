require File.dirname(__FILE__) + '/spec_helper'

describe 'Quiz Editor API' do

	describe "POST /questions" do

		before(:each) do
			post_json('/api/questions', {
					title: "Question Title",
					type: "trueFalse"
			})
		end

		let(:resp) { json_parse last_response.body }

		it 'should return the posted object' do 
			expect(last_response).to be_successful
			expect(resp[:id]).to be > 0
			expect(resp[:title]).to eq("Question Title")
			expect(resp[:type]).to eq("trueFalse")
		end

	end

	describe "GET /questions" do

		before(:each) do
			get '/api/questions'
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do
			expect(last_response).to be_ok
		end

	end

	describe "DELETE /questions" do

		it 'should delete the posted object' do

		end
	end
end
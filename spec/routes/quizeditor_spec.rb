require_relative "../spec_helper"

describe "QuizEditor API" do

	describe "POST /questions" do


		before(:each) do
			test = post_json('/questions', {
					q_name: "Question Title",
					q_type: "trueFalse"
			})
		end

		let(:resp) { json_parse last_response.body }

		it 'should return the posted object' do 
			expect(last_response).to be_successful
			expect(resp[:q_name]).to eq("Question Title")
			expect(resp[:q_type]).to eq("trueFalse")
		end

	end

	describe "GET /questions" do

		before(:each) do
			10.times {FactoryGirl.create(:question)}
			get '/questions'
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do
			expect(last_response).to be_ok
			expect(resp.length).to eq 10
		end

	end

	# describe "DELETE /questions" do

	# 	it 'should delete the posted object' do

	# 	end
	# end
end
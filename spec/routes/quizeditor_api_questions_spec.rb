require_relative "../spec_helper"

describe "QuizEditor API" do

	describe "GET /questions" do

		before(:each) do
			10.times {FactoryGirl.create(:question)}
			get '/questions'
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do
			expect(last_response).to be_ok
		end

		it 'returns a list of questions' do
			expect(resp.length).to eq 10
		end

	end

	describe "GET /questions/:q_id" do

		before(:each) do
			FactoryGirl.create(:question)
			get '/questions/1'
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do
			expect(last_response).to be_ok
		end

	end

	describe "GET /questions/:q_id/export?type=moodle_xml" do

		before(:each) do
			FactoryGirl.create(:question)
			get '/questions/1/export?type=moodle_xml'
		end

		it 'responds successfully' do
			expect(last_response).to be_ok
		end

		it 'returns an xml attachment' do
			expect(last_response.headers['Content-Type']).to eql('application/xml;charset=utf-8')
		end

	end

	describe "PUT /questions/:q_id" do

		before(:each) do
			FactoryGirl.create(:question)
			put_json('/questions/1', {
					q_name: "A new Question Title",
					q_type: "essay"
			})
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do
			expect(last_response).to be_ok
		end

		it 'returns the changed question' do 
			expect(resp[:q_name]).to eq("A new Question Title")
			expect(resp[:q_type]).to eq("essay")
		end

	end

	describe "POST /questions" do

		before(:each) do
			post_json('/questions', {
					q_name: "Test Question Title",
					q_type: "multiple_choice"
			})
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do 
			expect(last_response).to be_successful
		end
		
		it 'returns the posted question' do 
			expect(resp[:q_name]).to eq("Test Question Title")
			expect(resp[:q_type]).to eq("multiple_choice")
		end

	end

	describe "DELETE /questions" do

		before(:each) do
			FactoryGirl.create(:question)
			delete '/questions/1'
		end

		it 'responds successfully' do
			expect(last_response).to be_ok
		end

		it 'deletes the specified question' do
			get '/questions/1'
			expect(last_response.status).to eql(404) 
		end

	end

end
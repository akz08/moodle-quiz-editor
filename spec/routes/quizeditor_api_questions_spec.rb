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
					q_type: "true_false"
			})
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do
			expect(last_response).to be_ok
		end

		it 'returns the changed question' do 
			expect(resp[:q_name]).to eq("A new Question Title")
			expect(resp[:q_type]).to eq("true_false")
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

	describe "GET /questions/:q_id/answers" do 
		before(:each) do
			FactoryGirl.create(:question)
			2.times {FactoryGirl.create(:answer, question_id: 1)}
			get '/questions/1/answers'
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do
			expect(last_response).to be_ok
		end

		it 'returns a list of answers' do
			expect(resp.length).to eq 2
		end
	end

	describe "GET /questions/:q_id/answers/:a_id" do
		before(:each) do
			FactoryGirl.create(:answer)
			get '/questions/1/answers/1' 
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do 
			expect(last_response).to be_ok
		end

		it 'returns an answer' do
			expect(resp.length).to eq 7
			expect(resp[:a_answer]).to eq("An answer")
		end
	end

	describe "PUT /questions/:q_id/answers/:a_id" do
		before(:each) do
			FactoryGirl.create(:answer)
			put_json('/questions/1/answers/1', {
					question_id: "1",
					a_answer: "A new answer",
					a_fraction: "0.5"
			})
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do
			expect(last_response).to be_successful
		end

		it 'returns the changed answer' do
			expect(resp[:question_id]).to eq(1)
			expect(resp[:a_answer]).to eq("A new answer")
			expect(resp[:a_fraction]).to eq("0.5")
		end
	end

	describe "POST /questions/:q_id/answers" do
		before(:each) do
			FactoryGirl.create(:question)
			post_json('/questions/1/answers', {
					question_id: "1",
					a_answer: "Some answer"
			})
		end

		let(:resp) { json_parse last_response.body }

		it 'responds successfully' do
			expect(last_response).to be_successful
		end

		it 'returns the posted answer' do
			expect(resp[:question_id]).to eq(1)
			expect(resp[:a_answer]).to eq("Some answer")
		end

	end

	describe "DELETE /questions/:q_id/answers/:a_id" do
		before(:each) do
			FactoryGirl.create(:answer)
			delete '/questions/1/answers/1'
		end

		it 'responds successfully' do
			expect(last_response).to be_successful
		end

		it 'deletes the specified answer' do
			get '/questions/1/answers/1'
			expect(last_response.status).to eql(404) 
		end
	end

end
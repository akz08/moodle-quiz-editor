require_relative "../spec_helper"

describe "QuizEditor API" do
  
  describe "GET /categories" do
    before(:each) do 
      10.times {FactoryGirl.create(:category)}
      get '/categories'
    end

    let(:resp) { json_parse last_response.body }

    it 'responds successfully' do
      expect(last_response).to be_ok
    end

    it 'returns a list of categories' do
      expect(resp.length).to eq 10
    end
  end

  describe "GET /categories/:c_id" do
    before(:each) do
      FactoryGirl.create(:category)
      get '/categories/1'
    end

    let(:resp) { json_parse last_response.body }

    it 'responds successfully' do
      expect(last_response).to be_ok
    end

    it 'returns a category' do
      expect(resp.length).to eq 5
    end
  end

  describe "GET /categories/:c_id/export?type=moodle_xml" do
    before(:each) do
      FactoryGirl.create(:category)
      get '/categories/1/export?type=moodle_xml'
    end

    it 'responds successfully' do
      expect(last_response).to be_ok
    end

    it 'returns an xml attachment' do
      expect(last_response.headers['Content-Type']).to eql('application/xml;charset=utf-8')
    end
  end

  describe "PUT /categories/:c_id" do
    before(:each) do
      FactoryGirl.create(:category)
      put_json('/categories/1', {
        c_name: "New name",
        c_description: "New description"
      })
    end

    let(:resp) { json_parse last_response.body }

    it 'responds successfully' do
      expect(last_response).to be_ok
    end

    it 'returns the changed category' do
      expect(resp[:c_name]).to eq("New name")
      expect(resp[:c_description]).to eq("New description")
    end
  end

  describe "POST /categories" do
    before(:each) do
      post_json('/categories', {
        c_name: "Testing name",
        c_description: "Testing description"
      })
    end

    let(:resp) { json_parse last_response.body }

    it 'responds successfully' do
      expect(last_response).to be_successful
    end

    it 'returns the posted category' do
      expect(resp[:c_name]).to eq("Testing name")
      expect(resp[:c_description]).to eq("Testing description")
    end
  end

  describe "DELETE /categories/:c_id" do
    before(:each) do
      FactoryGirl.create(:category)
      delete '/categories/1'
    end

    let(:resp) { json_parse last_response.body }

    it 'responds successfully' do
      expect(last_response).to be_ok
    end

    it 'deletes the specified category' do
      get '/categories/1'
      expect(last_response.status).to eql(404)
    end
  end

  describe "GET /categories/:c_id/questions" do
    before(:each) do
      question = FactoryGirl.create(:question)
      category = FactoryGirl.create(:category)
      category.questions << question

      get '/categories/1/questions'
    end

    let(:resp) { json_parse last_response.body }

    it 'responds successfully' do
      expect(last_response).to be_ok
    end

    it 'returns a list of questions' do
      expect(resp.length).to eq 1
    end
  end

  describe "POST /categories/:c_id/questions" do
    before(:each) do
      question = FactoryGirl.create(:question)
      FactoryGirl.create(:category)

      post_json('/categories/1/questions', 
        id: question.id
      )
    end

    let(:resp) { json_parse last_response.body }

    it 'responds successfully' do
      expect(last_response).to be_successful
    end

    it 'returns a list of questions belonging to the category' do
      expect(resp.length).to eq 1
    end
  end

  describe "DELETE /categories/:c_id/questions/:q_id" do
    before(:each) do
      question = FactoryGirl.create(:question)
      category = FactoryGirl.create(:category)
      category.questions << question

      delete '/categories/1/questions/1'
    end

    let(:resp) { json_parse last_response.body }

    it 'responds successfully' do
      expect(last_response).to be_ok
    end

    it 'deletes the question from the category' do
      get '/categories/1/questions/1'
      expect(last_response.status).to eql(404)

      get 'questions/1'
      expect(last_response).to be_ok
    end
  end

end
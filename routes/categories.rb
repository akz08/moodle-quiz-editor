module QuizEditor
  module Routes
    class Categories < Routes::Base

      # GETs all available categories
      get '/categories' do

      end

      # GETs a specific category (is this useful?)
      get '/categories/:c_id' do

      end

      # GETs all questions of a category
      get '/categories/:c_id/questions' do

      end

      # PUTs new values into a category
      put '/categories/:c_id' do

      end

      # POSTs a new category
      post '/categories' do

      end

      # POSTs new question references to a category
      post '/categories/:c_id/questions' do 

      end

      # DELETEs a category
      delete '/categories/:c_id' do 

      end

      # DELETEs a reference to a question in a category
      delete '/categories/:c_id/questions/:q_id' do

      end

    end
  end
end

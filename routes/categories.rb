module QuizEditor
  module Routes
    class Categories < Routes::Base

      # GETs all available categories
      get '/categories' do
        format_response(Category.all, request.accept)
      end

      # GETs a specific category (is this useful?)
      get '/categories/:c_id' do
        format_response(category_by_id(params[:c_id]), request.accept)
      end

      # GETs all questions of a category
      get '/categories/:c_id/questions' do
        format_response(category_by_id(params[:c_id]).
          questions.all, request.accept)
      end

      # PUTs new values into a category
      put '/categories/:c_id' do
        category = category_by_id(params[:c_id])

        body = MultiJson.load request.body.read
        halt 500 unless category.update(
          :c_name         =>  body['c_name'],
          :c_description  =>  body['c_description']
        )
        format_response(category, request.accept)
      end

      # POSTs a new category
      post '/categories' do
        body = MultiJson.load request.body.read
        category = Category.new(
          :c_name         =>  body['c_name'],
          :c_description  =>  body['c_description']
        )
        if category.save
          status 201
          format_response(category, request.accept)
        else
          status 400
        end
      end

      # POSTs new (existing) question references to a category
      #   The route expects a valid Question JSON, or at least its id
      post '/categories/:c_id/questions' do 
        category = category_by_id(params[:c_id])
        body = MultiJson.load request.body.read
        # search by id from all available questions and add it to the category
        category << question_by_id(body['id'])
        # on success (no exception thrown), return all questions in the category
        status 201
        format_response(category.questions.all, request.accept)
      end

      # DELETEs a category
      delete '/categories/:c_id' do 
        halt 500 unless category_by_id(params[:c_id]).destroy
      end

      # DELETEs a reference to a question in a category
      delete '/categories/:c_id/questions/:q_id' do
        category = category_by_id(params[:c_id])
        question = question_by_id(params[:q_id])
        # find the question and destroy the *reference* to it
        if question_in_category?(question, category)
          category.questions.destroy(question)
        else
          halt 500
        end 
        # return all questions in the category
        format_response(category.questions.all, request.accept)
      end

      after do
        ActiveRecord::Base.connection.close
      end

      ## Helpers

      # Returns a Category object from a given id if found
      # 
      # @param id [Fixnum] the category id
      # @return [Category] the corresponding Category object
      def category_by_id(id)
        begin
          category = Category.find(id)
        rescue ActiveRecord::RecordNotFound
          halt 404
        end
      end

      # Returns a Question object from a given id if found
      #
      # @param id [Fixnum] the question id
      # @return [Question] the corresponding Question object
      def question_by_id(id)
        begin 
          question = Question.find(id)
        rescue ActiveRecord::RecordNotFound
          halt 404
        end
      end

      # Returns true if the question is in the given category
      # 
      # @param question [Question] a Question object
      # @param category [Category] a Category object
      def question_in_category?(question, category)
        begin
          category.questions.find(question)
          return true
        rescue ActiveRecord::RecordNotFound
          return false
        end
      end

      private :category_by_id, :question_by_id
    end
  end
end

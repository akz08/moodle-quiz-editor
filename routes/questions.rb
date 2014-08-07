module QuizEditor
	module Routes
		class Questions < Routes::Base
	  	helpers Helpers::GenerateMoodleXmlHelper

			## Questions
			get '/questions' do
				format_response(Question.all, request.accept)
			end

			get '/questions/:q_id' do
				format_response(question_by_id(params[:q_id]), request.accept)
			end

			get '/questions/:q_id/export' do 
				if params[:type] == "moodle_xml" then
					question = question_by_id(params[:q_id])
					
					content_type :xml
					attachment "moodlexml_question#{params[:format]}.xml"

					"#{generate_moodle_xml("category", question.q_type, question.q_name)}"
				else
					halt 404
				end
			end

			put '/questions/:q_id' do
				question = question_by_id(params[:q_id])

				body = MultiJson.load request.body.read
				halt 500 unless question.update(
					:q_name => 	body['q_name'],
					:q_type =>	body['q_type']
				)
				format_response(question, request.accept)
			end

			post '/questions' do
				body = MultiJson.load request.body.read
				question = Question.new(
					:q_name =>	body['q_name'],
					:q_type => 	body['q_type']
				)
				if question.save
					status 201
					format_response(question, request.accept)
				else
					status 400
				end
			end

			delete '/questions/:q_id' do
				halt 500 unless question_by_id(params[:q_id]).destroy
			end

			after do
				ActiveRecord::Base.connection.close
			end

			## Question Answers
			get '/questions/:q_id/answers' do
				question = question_by_id(params[:q_id])
				format_response(question.answers, request.accept)
			end

			get '/questions/:q_id/answers/:a_id' do 
				question = question_by_id(params[:q_id])
				answer = answer_by_id(question, params[:a_id])
				format_response(answer, request.accept)
			end

			put '/questions/:q_id/answers/:a_id' do
				question = question_by_id(params[:q_id])
				answer = answer_by_id(question, params[:a_id])

				body = MultiJson.load request.body.read
				halt 500 unless answer.update(
					:question_id	=> body['question_id'],	# to allow moving answers across questions
					:a_answer			=> body['a_answer'],
					:a_fraction		=> body['a_fraction'],
					:a_feedback		=> body['a_feedback']
				)
				format_response(answer, request.accept)
			end

			post '/questions/:q_id/answers' do
				question = question_by_id(params[:q_id])

				body = MultiJson.load request.body.read
				answer = Answer.new(
					:question_id 	=> params[:q_id],
					:a_answer			=> body['a_answer'],
					:a_fraction		=> body['a_fraction'],
					:a_feedback		=> body['a_feedback']
				)
				if answer.save
					status 201
					format_response(answer, request.accept)
				else 
					status 400
				end
			end

			## Helpers

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

			# Returns an Answer by id of a given Question if found
			# 
			# @param question [Question] a Question to query
			# @param id [Fixnum] the answer id
			# @return [Answer] the corresponding Answer object
			def answer_by_id(question, id)
				begin
					answer = question.answers.find(id)
				rescue ActiveRecord::RecordNotFound
					halt 404
				end
			end

			private :question_by_id, :answer_by_id
		end
	end
end

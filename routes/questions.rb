module QuizEditor
	module Routes
	    class Questions < Routes::Base
	    	helpers Helpers::GenerateMoodleXmlHelper

			# namespace '/api' do

				get '/questions' do
					format_response(Question.all, request.accept)
				end

				get '/questions/:id' do
					format_response(question_by_id(params[:id]), request.accept)
				end

				get '/questions/:id/export' do 
					if params[:type] == "moodle_xml" then
						question = question_by_id(params[:id])
						
						content_type :xml
						attachment "moodlexml_question#{params[:format]}.xml"

						"#{generate_moodle_xml("category", question.q_type, question.q_title)}"
					else
						halt 404
					end
				end

				post '/questions' do
					body = MultiJson.load request.body.read
					question = Question.new(
						:q_title =>	body['q_title'],
						:q_type => 	body['q_type']
					)
					if question.save
						status 201
						format_response(question, request.accept)
					else
						status 400
					end
				end

				put '/questions/:id' do
					body = MultiJson.load request.body.read
					question = question_by_id(params[:id])

					halt 500 unless question.update(
						:q_title => 	body['q_title'],
						:q_type =>		body['q_type']
					)
					format_response(question, request.accept)
				end

				delete '/questions/:id' do
					halt 500 unless question_by_id(params[:id]).destroy
				end

				after do
					ActiveRecord::Base.connection.close
				end
			# end

			def question_by_id(id)
				begin 
					question = Question.find(id)
				rescue ActiveRecord::RecordNotFound
					halt 404
				end
			end

			private :question_by_id
		end
	end
end

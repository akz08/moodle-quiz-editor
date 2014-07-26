# encoding: UTF-8

namespace '/api' do
	get '/questions' do
		format_response(Question.all, request.accept)
	end

	get '/questions/:id' do
		question ||= Question.get(params[:id]) || halt(404)
		format_response(question, request.accept)
	end

	get '/questions/:id/export' do
		if params[:type] == "moodle_xml" then
			question ||= Question.get(params[:id]) || halt(404)

			generator = MoodleXMLGenerator.new()
			content_type :xml
			attachment "moodlexml_question#{params[:format]}.xml"
			return "#{generator.generate("category", question.type, question.title)}"
		else 
			status 400			
		end
	end

	post '/questions' do
		body = JSON.parse request.body.read
		question = Question.create(
			title: 		body['title'],
			type:  		body['type']
		)
		status 201
		format_response(question, request.accept)
	end

	put '/questions/:id' do
		body = JSON.parse request.body.read
		question ||= Question.get(params[:id]) || halt(404)
		halt 500 unless question.update(
			title: 		body['title'],
			type: 		body['type']
		)
		format_response(question, request.accept)
	end

	delete '/questions/:id' do
		question ||= Question.get(params[:id]) || halt(404)
		halt 500 unless question.destroy
	end

	get '/rss' do


	generator = MoodleXMLGenerator.new()
	content_type :xml
		attachment "moodlexml_question.xml"
	"#{generator.generate("category", "trueFalse", "name")}"
	end
end

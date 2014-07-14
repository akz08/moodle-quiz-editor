# encoding: UTF-8

get '/questions' do
	format_response(Question.all, request.accept)
end

get '/questions/:id' do
	question ||= Question.get(params[:id]) || halt(404)
	format_response(question, request.accept)
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

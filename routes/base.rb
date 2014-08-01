module QuizEditor
	module Routes
		class Base < Sinatra::Base
			register Sinatra::ActiveRecordExtension
			register Sinatra::Namespace

			helpers Helpers::ResponseFormatHelper
		end
	end
end

# based on the article:
# http://www.codeproject.com/Tips/668655/Rest-Service-with-Ruby-plus-Sinatra-plus-Datamappe

require 'sinatra/base'

module QuizEditor
  module Helpers
    module ResponseFormatHelper
      def format_response(data, accept)
        accept.each do |type|
          return data.to_xml if type.downcase.eql? 'text/xml'
          return data.to_json if type.downcase.eql? 'application/json'
          return data.to_yaml if type.downcase.eql? 'text/x-yaml'
          return data.to_csv if type.downcase.eql? 'text/csv'
          return data.to_json
        end
      end
    end
  end
end    

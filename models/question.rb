#encoding UTF-8
class Question
	include DataMapper::Resource

	property :id,			Serial
	property :title,		String
	property :type,			String
end
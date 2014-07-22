#encoding UTF-8
class User
	include DataMapper::Resource
	include BCrypt

	property :id,			Serial,	:key => true
	property :username,		String,	:length => 3..50 # minimum 3 chars
	property :password,		BCryptHash
end
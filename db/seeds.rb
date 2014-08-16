# Default admin user account
User.create(u_email: "admin@admin.com", u_password: "encryptedPass")

# Default 'all questions' category
Category.create(c_name: "Default Category", c_description: "The default category which all new quesions are added to ")
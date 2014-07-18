#!/usr/bin/env bash

sudo apt-get update

# Install Git
sudo apt-get install -y build-essential git-core

# Install Ruby
\curl -sSL https://get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm reload
rvm install 2.1.2

# Install front-end tools
sudo apt-get install -y nodejs-legacy npm
npm install -g bower

# Install Java for Selenium/Protractor
sudo apt-get install -y default-jdk

# Install PhantomJS dependency
sudo apt-get install -y libfontconfig

# Prepare MySQL 5.5 credentials
sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password uclthesis'
sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password uclthesis'

# Install MySQL 5.5
sudo apt-get install -y mysql-server-5.5
# setup default database
mysql -uroot -puclthesis -e "CREATE DATABASE moodle_quiz_editor;"

# Install DataMapper dependency for dm-mysql-adapter
sudo apt-get install -y libmysqlclient-dev

# Install SQLite (testing)
sudo apt-get install -y libsqlite3-dev

# Install remaining dependencies
cd /vagrant

bundle install
npm install --no-bin-links
bower install --allow-root| xargs echo
bundle exec rake db:upgrade;

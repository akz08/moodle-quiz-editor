#!/usr/bin/env bash

apt-get update

# Install Git
apt-get install -y build-essential git-core

# Install Ruby
\curl -sSL https://get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm reload
rvm install 2.1.2

# Install front-end tools
apt-get install -y nodejs-legacy npm
npm install -g bower
npm install -g yo

# Install Java for Selenium/Protractor
apt-get install -y default-jdk

# Install PhantomJS dependency
apt-get install -y libfontconfig

# Prepare MySQL 5.5 credentials
debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password uclthesis'
debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password uclthesis'

# Install MySQL 5.5
apt-get install -y mysql-server-5.5
sudo apt-get install libmysqlclient-dev

# setup default database (now redundant with ActiveRecord)
mysql -uroot -puclthesis -e "CREATE DATABASE moodle_quiz_editor;"

# Install SQLite (testing)
apt-get install -y libsqlite3-dev

# Install remaining dependencies
cd /vagrant

bundle install
npm install --no-bin-links
bower install --allow-root| xargs echo
bundle exec rake db:setup;

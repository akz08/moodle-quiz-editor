#!/usr/bin/env bash

# based on "https://www.digitalocean.com/community/tutorials/how-to-install-ruby-2-1-0-and-sinatra-on-ubuntu-13-with-rvm"

apt-get update
apt-get install -y build-essential git-core
\curl -sSL https://get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm reload
rvm install 2.1.2
gem install sinatra

# JS stuff
apt-get install -y nodejs-legacy npm
npm install -g bower
# npm install -g yo
# npm install -g generator-angular
# npm install -g protractor

# Need to install Java for Selenium/Protractor
apt-get install -y default-jdk

# if problems persist when using yo
# bower cache clean
# npm cache clean

debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password uclthesis'
debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password uclthesis'

# MySQL
apt-get install -y mysql-server-5.5
# setup default database
mysql -uroot -puclthesis -e "CREATE DATABASE moodle_quiz_editor;"

# SQLite
apt-get install -y libsqlite3-dev

# Datamapper
apt-get install -y libmysqlclient-dev

# PhantomJS
apt-get install -y libfontconfig

# these commands to be run in the /vagrant directory
cd /vagrant
bundle install
npm install --no-bin-links
bower install --allow-root
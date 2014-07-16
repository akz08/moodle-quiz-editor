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
npm install -g yo
npm install -g generator-angular
# npm install -g protractor

# these commands to be run in the /vagrant directory
cd /vagrant
npm install
bower install --allow-root

# Need to install Java for Selenium/Protractor
apt-get install -y default-jdk

# if problems persist when using yo
# bower cache clean
# npm cache clean

debconf-set-selections <<< 'mysql-server mysql-server/root_password password uclthesis'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password uclthesis'

apt-get install -y mysql-server

# Datamapper
apt-get install -y libmysqlclient-dev

# PhantomJS
apt-get install -y libfontconfig


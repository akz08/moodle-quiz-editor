#!/usr/bin/env bash

# based on "https://www.digitalocean.com/community/tutorials/how-to-install-ruby-2-1-0-and-sinatra-on-ubuntu-13-with-rvm"

apt-get update
apt-get install -y build-essential git-core
curl -L get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rm reload
rvm install 2.1.2
gem install sinatra
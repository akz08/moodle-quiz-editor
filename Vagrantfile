# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.provision :shell, path: "setup.sh"
  config.vm.network "forwarded_port", guest: 8080, host: 8000
  config.vm.network "forwarded_port", guest: 9292, host: 9292
  # for 'grunt serve'
  config.vm.network "forwarded_port", guest: 9000, host: 4567
  # for livereload - commented out so can use on localhost due to speed concerns (this breaks livereload for 'grunt serve')
  # config.vm.network "forwarded_port", guest:35729, host: 35729

end

# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.provision :shell, path: "setup.sh"

  config.vm.network "forwarded_port", guest: 8080, host: 8000
  # for 'grunt serve'
  config.vm.network "forwarded_port", guest: 9000, host: 4567
  # for livereload
  config.vm.network "forwarded_port", guest:35729, host: 35729
end

Online Moodle Quiz Editor
=========================

About
-----
An online web application built on Sinatra and AngularJS to provide an alternative interface to Moodle's question creation functionality. Due to Moodle's current limitations, this is done by exporting the output to a Moodle compatible XML file.

This project was developed as part of an MSc in Computer Science at University College London (2013-2014).

Development
-----------
Vagrant was used to ease development on the project, and so should be used with the Vagrantfile and shell script.

```sh
git clone git@github.com:akz08/moodle-quiz-editor.git
cd moodle-quiz-editor
vagrant up
```

Dependencies
-----------
1. [VirtualBox][vbox]
2. [Vagrant][vagrant]

[vbox]: https://www.virtualbox.org/wiki/Downloads "VirtualBox downloads"
[vagrant]: http://downloads.vagrantup.com/ "Vagrant downloads"

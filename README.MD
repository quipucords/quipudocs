[![GitHub license](https://img.shields.io/github/license/quipucords/quipudocs.svg)](https://github.com/quipucords/quipudocs/blob/master/LICENSE)
[![Updates](https://pyup.io/repos/github/quipucords/quipudocs/shield.svg)](https://pyup.io/repos/github/quipucords/quipudocs/)
[![Python 3](https://pyup.io/repos/github/quipucords/quipudocs/python-3-shield.svg)](https://pyup.io/repos/github/quipucords/quipudocs/)
[![Documentation Status](https://readthedocs.org/projects/quipucords/badge/)](https://quipucords.readthedocs.io/en/latest/)
[![Build Status](https://travis-ci.org/quipucords/quipudocs.svg?branch=master)](https://travis-ci.org/quipucords/quipudocs)

# Quipudocs, Documentation for Quipucords

## Read the Docs Development
Quipudocs paired with Read the Docs is `sphinx` based information documentation. To work with the Quipudocs Read the Docs code, 
begin by cloning the repository:
  ```
  $ git clone git@github.com:quipucords/quipudocs.git
  $ cd ./quipudocs
  $ pipenv shell
  $ pip install -r requirements.txt
  $ make html
  ```

## Asciidoc Development
Quipudocs paired with Asciidoc leverages GUI based development tools. The requirements for working with Asciidoc
  - Your system needs to be running [NodeJS version 10+](https://nodejs.org/)
  - [Yarn 1.16+](https://yarnpkg.com) for dependency and script management
  - and [Docker](https://docs.docker.com/engine/installation/)

### Docker & Mac
Setting Docker up on a Mac? Install the appropriate package and you should be good to go. To check if everything installed correctly you can try these steps.
  * At a terminal prompt type

    ```
    $ docker run hello-world
    ```

### Docker & Linux
Setting Docker up on a Linux machine can include an additional convenience step. If you're having to prefix "sudo" in front of your Docker commands you can try these steps.
  * [Docker postinstall documentation](https://docs.docker.com/install/linux/linux-postinstall/)

### Yarn
To work with Yarn you can use NPM, or if you're on a Mac, use [Homebrew](https://brew.sh/) to do the installation
  - NPM
    ```
    $ npm install -g yarn
    ```
  - Homebrew
    ```
    $ brew update
    $ brew install yarn
    ```

## Asciidoc Quick Start

### Installing
  1. Clone the repository
     ```
     $ git clone https://github.com/quipucords/quipudocs.git
     ```

  1. Within the repo context, install project dependencies
     ```
     $ cd quipudocs && yarn
     ```
     
### Viewing Asciidoctor content as HTML
These are the contexts for running local Asciidoctor against Asciidoc files.
  ```
  $ yarn start
  ```
Or to see GitHub pages output run 
  ```
  $ yarn start:gh
  ```

For a more in-depth local run breakdown review the [contribution guidelines for workflow](./CONTRIBUTING.md#Workflow)

### Testing
Asciidoctor requires running through its build process in order to throw process errors, therefore
running `$ yarn start` will start up the build and testing process accordingly. All other testing is
a basic form of linting, typically on resource files and the Asciidoctor HTML output.

For in-depth testing guidance review the [contribution guidelines for testing](./CONTRIBUTING.md#Testing)

## Contributing
Contributing encompasses [repository specific requirements](./CONTRIBUTING.md) and the global 
[Quipucords guidelines](https://github.com/quipucords/quipucords/blob/master/CONTRIBUTING.md).

## Authors
Authorship and current maintainer information can be found in [AUTHORS](AUTHORS.MD).

## Copyright and License
Copyright 2017-2019, Red Hat, Inc.

Quipudocs is released under the [GNU Public License version 3](LICENSE).

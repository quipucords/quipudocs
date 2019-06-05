|license| |Updates| |Python 3|

quipudocs - Documentation for Quipucords
========================================

This *README* file contains information about the installation and development of quipudocs.

- `Introduction to quipudocs`_
- `Development`_
- `Authors`_
- `Copyright and License`_


Introduction to quipudocs
-------------------------
quipudocs is *sphinx* based information documentation.


Development
-----------

Read the Docs
^^^^^^^^^^^^
To work with the quipudocs code, begin by cloning the repository::

    git clone git@github.com:quipucords/quipudocs.git
    cd ./quipudocs
    pipenv shell
    pip install -r requirements.txt
    make html

Asciidoc
^^^^^^^^
The requirements for working with Asciidoc
- Your system needs to be running `NodeJS version 10+ <https://nodejs.org/>`_
- `Docker <https://docs.docker.com/engine/installation/>`_

To work with the Asciidoc EA and Help guides, begin by cloning the repository::

    git clone git@github.com:quipucords/quipudocs.git
    cd ./quipudocs
    npm install
    npm start

Build Asciidoc
^^^^^^^^^^^^^^
To build the Asciidoc EA and Help guides::

    npm run build

Test Asciidoc
^^^^^^^^^^^^^^
To test the Asciidoc EA and Help guides::

    npm test

Authors
-------
Authorship and current maintainer information can be found in `AUTHORS <AUTHORS.rst>`_.


Copyright and License
---------------------
Copyright 2017-2019, Red Hat, Inc.


quipudocs is released under the `GNU Public License version 3 <LICENSE>`_.

.. _readthedocs: https://quipucords.readthedocs.io/en/latest/
.. |license| image:: https://img.shields.io/github/license/quipucords/quipudocs.svg
.. |Updates| image:: https://pyup.io/repos/github/quipucords/quipudocs/shield.svg
   :target: https://pyup.io/repos/github/quipucords/quipudocs/
.. |Python 3| image:: https://pyup.io/repos/github/quipucords/quipudocs/python-3-shield.svg

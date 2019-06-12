[![GitHub license](https://img.shields.io/github/license/quipucords/quipudocs.svg)](https://github.com/quipucords/quipudocs/blob/master/LICENSE)
[![Updates](https://pyup.io/repos/github/quipucords/quipudocs/shield.svg)](https://pyup.io/repos/github/quipucords/quipudocs/)
[![Python 3](https://pyup.io/repos/github/quipucords/quipudocs/python-3-shield.svg)](https://pyup.io/repos/github/quipucords/quipudocs/)
[![Documentation Status](https://readthedocs.org/projects/quipucords/badge/?version=0.0.46)](https://quipucords.readthedocs.io/en/0.0.46/?badge=0.0.46)

# quipudocs - Documentation for Quipucords

This `README` file contains information about the installation and development of quipudocs.

- [Introduction to quipudocs](#intro)
- [Development](#development)
- [Authors](#authors)
- [Copyright and License](#copyright)


## <a name="intro"></a> Introduction to quipudocs
quipudocs is `sphinx` based information documentation.


## <a name="development"></a> Development

### Read the Docs
To work with the quipudocs code, begin by cloning the repository:
```
git clone git@github.com:quipucords/quipudocs.git
cd ./quipudocs
pipenv shell
pip install -r requirements.txt
make html
```

### Asciidoc
The requirements for working with Asciidoc
- Your system needs to be running [NodeJS version 10+](https://nodejs.org/)
- [Docker](https://docs.docker.com/engine/installation/)

To work with the Asciidoc Help guides, begin by cloning the repository:
```
git clone git@github.com:quipucords/quipudocs.git
cd ./quipudocs
npm install
npm start
```

### Build Asciidoc
To build the Asciidoc EA and Help guides::
```
npm run build
```

### Test Asciidoc
To run basic linting checks on HTML, JSON, and JS files for the Asciidoc EA and Help guides::
```
npm test
```

Asciidoctor contains a compiler check that processes when the build is run. We leverage this compiler check during our CI process as an additional "test".

## <a name="authors"></a> Authors
Authorship and current maintainer information can be found in [AUTHORS](AUTHORS.MD).


## <a name="copyright"></a> Copyright and License
Copyright 2017-2019, Red Hat, Inc.


quipudocs is released under the [GNU Public License version 3](LICENSE).


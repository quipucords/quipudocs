Online Scripted Installation
----------------------
The scripted installation runs an installer that uses Ansible to install the command line tool, quipucords server image, and the database image. When you run the scripted installation, the server is installed and started as described in `Configuring and Starting Quipucords <install.html#config-and-start>`_. However, you can change some of the defaults used by the scripted installation with the `Installation Options <install.html#install-opts>`_.

Obtaining the Installer
^^^^^^^^^^^^^^^^^^^^^^^
1. Download & Install the quipucords installer rpm.

- RHEL & CentOS 6::

    # yum install -y https://github.com/quipucords/qpc-tools/releases/latests/download/quipucords_installer.el6.noarch.rpm

- RHEL & CentOS 7::

    # yum install -y https://github.com/quipucords/qpc-tools/releases/latests/download/quipucords_installer.el7.noarch.rpm

- RHEL & CentOS 8::

    # yum install -y https://github.com/quipucords/qpc-tools/releases/latests/download/quipucords_installer.el8.noarch.rpm

Installing
~~~~~~~~~~
If you choose the internet connectivity option, use the following steps to run the installer.

1. Start the installation by entering the following command. Alternatively, enter the following command with options as described in `Installation Options <install.html#install-opts>`_::

    # qpc-tools --install

The output appears similar to the following example::

    Installation complete.

Installation Options
~~~~~~~~~~~~~~~~~~~~
The installer has various options, each of which has a default value. You can either run the installer with no options to use all the default values, or provide values for one or more of these options. You can pass values for these options by using the ``-e`` flag when you run the command to start the installer, as shown in the following example::

    # qpc-tools --install -e option1=value1 -e option2=value2 ...

Options:
 - **install_offline**
    - Contains a ``true`` or ``false`` value. Defaults to ``false``. Supply ``true`` to start an offline installation.
 - **use_supervisord**
    - Contains a ``true`` or ``false`` value. Defaults to ``true``. Supply ``false`` to start server without supervisord.
 - **install_server**
    - Contains a ``true`` or ``false`` value. Defaults to ``true``. Supply ``false`` to skip the installation of the server.
 - **install_cli**
    - Contains a ``true`` or ``false`` value. Defaults to ``true``. Supply ``false`` to skip the installation of the command line tool.
 - **pkg_install_dir**
    - Contains the fully qualified path to the downloaded packages for the installer. Defaults to ``<installer>/packages/``.
 - **server_install_dir**
    - Contains the fully qualified path to the installation directory for the Quipucords server. Defaults to ``~/quipucords/``.
 - **server_port**
    - Contains the port number for the Quipucords server. Defaults to ``9443``.
 - **server_username**
   - Sets the quipucords server username.  Defaults to ``admin``.
 - **server_password**
   - Sets the quipucords server password.  Defaults to ``qpcpassw0rd``.
 - **server_user_email**
   - Sets the Quipucords server user email address.  Defaults to ``admin@example.com``.
 - **open_port**
    - Contains a ``true`` or ``false`` value. Defaults to ``true``. Supply ``false`` to install without opening the server port in the firewall. The installation script must run with elevated privileges to open the server port.
 - **server_name**
    - Contains the name for the Quipucords server. Defaults to ``quipucords``.
 - **dbms_user**
    - Specifies the database user for postgres. Defaults to ``postgres``.
 - **dbms_password**
    - Specifies the database password for postgres. Defaults to ``password``.
 - **server_http_timeout**
    - Contains the HTTP timeout length for the Quipucords server. Defaults to ``120``.
 - **inspect_job_timeout**
    - Specifies the network inspect scan timeout in seconds. Defaults to ``10800`` (3 hours).
 - **connect_job_timeout**
    - Specifies the network connect scan timeout in seconds. Defaults to ``600`` (10 minutes).
 - **ansible_log_level**
    - Specifies the level of log output by ansible. Defaults to ``0`` which is no logs.

Offline Scripted Installation (RHEL 6 and CentOS 6)
----------------------
The scripted installation runs an installer that uses Ansible to install the command line tool, quipucords server image, and the database image. When you run the scripted installation, the server is installed and started as described in `Configuring and Starting Quipucords <install.html#config-and-start>`_. However, you can change some of the defaults used by the scripted installation with the `Installation Options <install.html#install-opts>`_.

Obtaining the Installer
^^^^^^^^^^^^^^^^^^^^^^^
1. Download & Install the quipucords installer rpm.

- RHEL & CentOS 6::

    # yum install -y https://github.com/quipucords/qpc-tools/releases/latests/download/quipucords_installer.el6.noarch.rpm

Offline Dependencies
^^^^^^^^^^^^^^^^^^^^^

The following associated dependencies must be installed onto the offline machine before the installation script can be executed.

**Server Dependencies:**

- `Ansible <https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-the-control-machine>`_

Installing Docker on Red Hat Enterprise Linux and CentOS 6.6 or later
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To install Docker on Red Hat Enterprise Linux or CentOS 6.6 or later, you must have kernel 2.6.32-431 or later installed.

To check the current kernel release, open a terminal session and use the ``uname`` command to display the kernel release information, as shown in the following example::

    # uname -r

The output of this command is similar to the following example::

  2.6.32-573.el6.x86_64

**TIP:** After you confirm that you have at least the minimum required kernel release, it is recommended that you fully update your system. Having a fully patched system can help you avoid kernel bugs that have already been fixed on the latest kernel packages.

When your system meets the minimum required kernel release, you can use the following steps to install Docker:

1. Make sure that you are logged in as a user with ``sudo`` or ``root`` privileges.

2. Download the Docker RPM package to the current directory::

    # curl -k -O -sSL https://yum.dockerproject.org/repo/main/centos/6/Packages/docker-engine-1.7.1-1.el6.x86_64.rpm

3. Install the required packages::

    # sudo yum install -y yum-utils device-mapper-persistent-data lvm2 libcgroup xz

4. Install the Docker package with yum::

    # sudo yum localinstall --nogpgcheck docker-engine-1.7.1-1.el6.x86_64.rpm

Starting Docker on Red Hat Enterprise Linux and CentOS 6.6 or later
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

After you install Docker, you must start it and verify that it is running.

1. Start the Docker daemon::

    # sudo service docker start

2. Verify that Docker is installed correctly. To do this step, run the hello-world image::

    # sudo docker run hello-world

This command displays output similar to the following truncated example. The first section of the output contains a message about the installation status::

    Unable to find image 'hello-world:latest' locally
    latest: Pulling from hello-world
    a8219747be10: Pull complete
    91c95931e552: Already exists
    hello-world:latest: The image you are pulling has been verified. Important: image verification is a tech preview feature and should not be relied on to provide security.
    Digest: sha256:aa03e5d0d5553b4c3473e89c8619cf79df368babd18681cf5daeb82aab55838d
    Status: Downloaded newer image for hello-world:latest
    Hello from Docker.
    This message shows that your installation appears to be working correctly.

    ...


3. To ensure that Docker starts when you start your system, enter the following command::

    # sudo chkconfig docker on

After you complete the steps to install Docker for Red Hat Enterprise Linux 6.6 or later or CentOS 6.6 or later, you can continue with the Quipucords server installation steps in `Installing the Quipucords Server Container Image <install.html#container>`_.

**Command Line Tool Dependencies:**

- `Download & Configure EPEL <install.html#commandline>`_
- Python 3.4
- Python 3.4-requests


Installing
^^^^^^^^^^
If you choose the offline option to run the installer, you will need to obtain the following packages on a machine with internet connectivity.

**Quipucords Server Package:**

- Server Container Image (`Download <https://github.com/quipucords/quipucords/releases/latest/download/quipucords_server_image.tar.gz>`_)

**Build the Postgres Docker Image:**

The Quipucords server requires a Postgres Docker image.  You must build the Docker image on a machine with internet connectivity.  Follow the steps documented below to create a Postgres Docker image.

- Install Docker (`Documentation <https://docs.docker.com/install/>`_)
- Create the postgres image tar with the following commands::

      # docker pull postgres:9.6.10
      # docker save -o postgres.9.6.10.tar postgres:9.6.10

**Note:** The offline installation script requires the postgres tar to be named ``postgres.9.6.10.tar``.

**Command Line Tool RPM Package:**

- RHEL & CentOS 6 (`Download <https://github.com/quipucords/qpc/releases/latest/download/qpc.el6.noarch.rpm>`_)

**Transfer Packages**

After the required packages have been collected, they will need to be transferred to the machine where the Quipucords server will be installed.

1. Create a ``packages`` directory to use to install the downloaded packages by entering the following command::

    # mkdir -p /usr/{lib}/qpc-tools-{x.y.z}/install/packages

- ``{lib}`` is your library version either lib or lib64
- ``{x.y.z}`` is the version of the qpc-tools rpm

2. Move the downloaded packages into the ``packages`` directory by entering the following command::

    # mv /path/to/package /usr/{lib}/qpc-tools-{x.y.z}/install/packages

**Start Offline Install**

Start the offline installation by entering the following command. Alternatively, enter the following command with options as described in `Installation Options`_::

    # qpc-tools --install -e install_offline=true

The output appears similar to the following example::

    Installation complete.


.. _install-opts:

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

# ALX Files Manager
This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination and background processing.

The objective is to build a simple platform to upload and view files:

    User authentication via a token
    List all files
    Upload a new file
    Change permission of a file
    View a file
    Generate thumbnails for images

You will be guided step by step for building it, but you have some freedoms of implementation, split in more files etc… (utils folder will be your friend)

Of course, this kind of service already exists in the real life - it’s a learning purpose to assemble each piece and build a full product.

Enjoy!


how to install redis server

Download, extract, and compile the latest stable Redis version (higher than 5.0.7 - https://redis.io/downloads/):

$ wget http://download.redis.io/releases/redis-6.0.10.tar.gz
$ tar xzf redis-6.0.10.tar.gz
$ cd redis-6.0.10
$ make

    Start Redis in the background with src/redis-server

$ src/redis-server &

    Make sure that the server is working with a ping src/redis-cli ping

PONG

    Using the Redis client again, set the value School for the key Holberton

127.0.0.1:[Port]> set Holberton School
OK
127.0.0.1:[Port]> get Holberton
"School"

    Kill the server with the process id of the redis-server (hint: use ps and grep)

$ kill [PID_OF_Redis_Server]

Copy the dump.rdb from the redis-5.0.7 directory into the root of the Queuing project.

Requirements:

    Running get Holberton in the client, should return School
# Mongo DB
Download the latest release through the shell, issue the following:

curl -O http://downloads.mongodb.org/linux/mongodb-linux-x86_64-2.6.12.tgz

## Extract the files from the downloaded archive.

For example, from a system shell, you can extract through the tar command:

tar -zxvf mongodb-linux-x86_64-2.6.12.tgz

## Copy the extracted archive to the target directory.

Copy the extracted folder to the location from which MongoDB will run.

mkdir -p mongodb
cp -R -n mongodb-linux-x86_64-2.6.12/ mongodb

## Ensure the location of the binaries is in the PATH variable.

The MongoDB binaries are in the bin/ directory of the archive. To ensure that the binaries are in your PATH, you can modify your PATH.

For example, you can add the following line to your shell’s rc file (e.g. ~/.bashrc):

export PATH=<mongodb-install-directory>/bin:$PATH

Replace <mongodb-install-directory> with the path to the extracted MongoDB archive.

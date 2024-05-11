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

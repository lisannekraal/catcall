This is an alternative to using a local
installation of MongoDB.

Setup Docker & Docker Compose
https://docs.docker.com/get-docker/


0. If you have a local installation of mongo, make sure you stop the service, otherwise the default port will be occupied, and launch will
fail.
1. The credentials to access the mongodb from docker are in the
docker-compose file.
2. run 'docker-compose up' to start the database service

Instructions from the web

/*****************************************************/
Shutting Down & Cleaning Up

We don’t want our image to be running 24/7, but shutting it down can be a little tricky.

In your terminal, press (to persist data)

**ctrl + c**

this may or may not kill the container gracefully 🤷‍. To start afresh, run (this will drop tables)

**docker-compose down**

and your container should be shut down. Now you just have to run

**docker-compose up**

again to get everything running. If you didn't compose down, the data you had last time should still be around.

If you want a fresh start for everything, run

**docker system prune -a**

and

**docker volume prune**

The first command removes any unused containers and the second removes any unused volumes. I recommend doing this fairly often since Docker likes to stash everything away causing the gigabytes to add up.
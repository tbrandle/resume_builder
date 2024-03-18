# Getting Started with Create React App

# Local start up

Make sure you have the following packages installed on your machine: docker, docker-compose, colima, just. If you do not have these packages installed, follow these steps:
1. download and install [docker](https://docs.docker.com/engine/install/)
2. install docker-compose (`brew install docker-compose`)
3. install just (`brew install just`)
3. download and install colima (`brew install colima`)

Steps to run app for the first time:
1. Once colima is installed, you can run `just setup`. This will start up colima with the correct memory allocations, build the ui, and backend images
2. Next, run `just up` to start up the postgres, node, and react containers. 
3. Visit `localhost:3000` and you are ready to make your first resume!

After the initial start up, you will only need to run `just up` since the images are already built.

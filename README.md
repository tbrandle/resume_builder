# Getting Started with Create React App

# Local start up

Make sure you have the following packages installed on your machine: docker, docker-compose, colima, just. If you do not have these packages installed, follow these steps:

1. download and install [docker](https://docs.docker.com/engine/install/)
2. install docker-compose (`brew install docker-compose`)
3. install just (`brew install just`)
4. download and install colima (`brew install colima`)

Steps to run app for the first time:

1. Add `.env` file in the `./server` directory with the following variables:
   - `PORT` is the port the server will run on (i.e. 8080).
   - `DATABASE_URL` is the url Prisma ORM uses to connect to the postgres database. It should follow this format `postgres://${USERNAME}:${PASSWORD}@db:${DB_PORT}/resume_db`
2. Add `.env` file to the `./ui` directory with the following variables:
   - `REACT_APP_BASE_URL` The value should look something like this: `http://localhost:${BACKEND_PORT}/api/resumes`
3. Once colima is installed, you can run `just setup`. This will start up colima with the correct memory allocations, build the ui, and backend images
4. Next, run `just up` to start up the postgres, node, and react containers.
5. Visit `localhost:3000` and you are ready to make your first resume!

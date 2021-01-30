# Microservice_React_Node_MongoDB


This is a microservice used for deploying a user creation and deletion forum
Making use of React + Node + MongoDB as the 3 main tools for this integration
Docker used for image creation.
Postman for api testing
NGINX as webserver & letscrypt for certification

**************************

nodejs folder consist of backend api related configuration with a Dockerfile.

code can be ranned individually using the command

#node server.js

it runs on port 8080 & makes use of MongoDB Atlas (Cloud Hosting) to store the data

***********************

React folder consist of the frontend configuration with a DockerFile and it can be executed by running the below command
Its available on port 8081 (mentioned in the react/.env folder)

# npm start


Application can be accessed using http://localhost:8081

************************

Docker-compose.yml consist of configuration of react , node, ngnix and certificate

need to run init-letsencrypt.sh first followed by docker-compose command to bring up the application

# ./init-letsencrypt.sh
# docker-compose up -d

************************

After cloning the repo run 

# npm install 

inside react and node folder to download the dependencies required

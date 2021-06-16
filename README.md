# youttala web app 

youttala is a web application where you can instantly learn how Swedish words are pronounced and used in the context by watching YouTube. Just type the word you want to hear and search.

https://www.youttala.com

# youttala-frontend

youttala-frontend is a react-app. 

Make sure that youttala-backend is running on http://localhost:3002/.

Link to youttala-backend github repo:

https://github.com/denyilm/youttala-backend

Link to youttala-backend docker hub repo:

https://hub.docker.com/repository/docker/denyilmaz/youttala-backend

# How to run youttala-frontend on a Docker container

1-You need to have Docker downloaded on your machine to run this app with docker.

Please read the instructions to download Docker:

https://www.docker.com/products/docker-desktop


2-Run the following command on your terminal

docker run -p 3030:3030 denyilmaz/youttala-frontend

3-Once you run this command you should see the following message in your terminal: 

"You can now view youttala-frontend in the browser.

  Local:            http://localhost:3030
  On Your Network:  http://172.17.0.3:3030"

# How to run youttala-frontend on your machine without Docker

1-You need nodejs installed on your machine.

Please read the instructions to download nodejs:

https://nodejs.org/en/download/

2-Go to the directory where you want to store youttala-backend

In the directory:

git clone https://github.com/denyilm/youttala-frontend.git

3-Go into ~/youttala-frontend and run:

npm install

4-Run the following command

npm start

5-Once you run this command you should see the following message in your console: 

"You can now view youttala-frontend in the browser.

  Local:            http://localhost:3030
  On Your Network:  http://172.17.0.3:3030"

# Ready to go

Go to http://localhost:3030 and start using youttala web app on your machine
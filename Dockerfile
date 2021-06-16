# docker build . -t youttala-frontend && docker run -p 3030:3030 youttala-frontend
FROM node:14
EXPOSE 3030
WORKDIR /usr/src/app
# Install node, found from the internet
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt install -y nodejs
COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_BACKEND_URL=http://localhost:3002
CMD ["npm", "start"]
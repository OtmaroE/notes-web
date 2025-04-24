# reference: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:16

ARG PORT
ARG REACT_APP_API_HOST_URL

# Create working directory
WORKDIR /user/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . /user/src/app

RUN npm run build


CMD ["node", "server.js"]
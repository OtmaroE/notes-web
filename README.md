# notes-website
Client website for notes-api, create an persist user's notes.

This is an educational WebApp.
Use and run this Application to learn about React design, API usage and local development setup.

# Table of content
1. [Stack](#stack)
2. [Run](#run)
    1. [Run manually](#run-manually)
    2. [Run with API](#run-with-api)

# Stack
- React@18.2.0
- Antd@5.19.2

# Run

### Run manualy
Considering local development, this repo comes with a `.env.example` file with the only two variables that can be configured.
Set those into a new `.env` file and run:
```
npm run start
```
> This will only run the website application, this assumes you already have the API running.

### Run prod-like build
The `Dockerfile` contains the instructions to build the react app and install `serve` a npm package that takes care of serving the HTML built.

To create an image for this production build run:
```
REACT_APP_API_HOST_URL=http://localhost:3030 docker build -t notes-web-production .
```
> [!NOTE]  
> Update the value for the environment variable to the API URL

To run in a container, run:
```
docker run -d -p 8080:8080 notes-web-production
```
> [!NOTE]  
> Update the port mapping as needed


To run the image, using 
### Run with API
To run both together, please look at: [nodes-development](https://github.com/OtmaroE/notes-development)

This React application consumes the following api: [notes-api](https://github.com/OtmaroE/notes-api)

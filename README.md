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
### Run with API
To run both together, please look at: [nodes-development](https://github.com/OtmaroE/notes-development)

This React application consumes the following api: [notes-api](https://github.com/OtmaroE/notes-api)

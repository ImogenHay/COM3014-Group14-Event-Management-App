# Authentication Microservice
Authenticates users for Event Management App. Built using NodeJS, express, yarn and MongoDB. Full list of dependencies in package.json.

If service wants to be run then `yarn run start` should be used

### Development Scripts:
- **`yarn install`** - install project dependencies
- **`yarn run start`** - starts the Express server by running the JavaScript file located at src/app.js.
- **`yarn run dev`** -  runs the development server using nodemon, which watches for changes in the source files and automatically restarts the server.

### APIs:
- **GET {host}/auth/healthcheck**
    - Returns 200 if service reachable
- **POST {host}/auth/signup**
    - Signs up the user
    - Takes in JSON object of the following format:`{ "email": "example@example.com", "password": "Password_1" }`
    - Returns a 200 and the following JSON object if successful:`{"email": "example@example.com", "token": "ey457g4w85uhwg8yrfy8whbrvyw4b5g"}`
- **POST {host}/auth/login**
    - Logs in the user
    - Takes in JSON object of the following format:`{ "email": "example@example.com", "password": "Password_1" }`
    - Returns a 200 and the following JSON object if successful:`{"email": "example@example.com", "token": "ey457g4w85uhwg8yrfy8whbrvyw4b5g"}`


### Events MongoDB Model:
- **email : string** - required, unique
- **password : string** - required

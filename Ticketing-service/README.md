# Ticketing Microservice
Manages tickets for Event Management App. Built using NodeJS, express, yarn, typescript and MongoDB. Full list of dependencies in package.json.

If service wants to be run then `npm start` should be used

### Technologies Used

- Node.js
- Express
- MongoDB

### Development Scripts:
- `npm install`: Installs project dependencies.
- `npm start`: Starts the Node.js server by running the `index.js` file using the Node.js runtime.
- `npm dev`: Starts the Node.js server using nodemon, which watches for changes in the `index.js` file and automatically restarts the server.
- `npm postman-test`: Runs the Postman test collection located at `Tests/Ticketing service.postman_collection.json` using the `newman` command-line tool.

### APIs
- **Get("/healthcheck", (req, res) => res.sendStatus(200));**
  - This API endpoint is used to perform a health check on the microservice. When a GET request is sent to "/healthcheck", the server responds with a status code of 200 (OK). This endpoint is used to verify that the microservice is up and running. 
- **Get("/tickets/:userId",validateUser, ticketController.getAllTickets);**
  - When a GET request is sent to "/tickets/:userId", the server verifies the user's authentication using the validateUser middleware, and then the ticketController.getAllTickets function is called to fetch and return all tickets belonging to the specified userId.
- **Post("/tickets",validateUser, ticketController.addTicket);**
  - This API endpoint is used to add a new ticket to the system. When a POST request is sent to "/tickets", the server verifies the user's authentication using the validateUser middleware, and then the ticketController.addTicket function is called to add the ticket to the system.

### Ticketing Service MongoDB Model

- **userId : string** - required
- **event : date** - required
- **venue : string** - required
- **tickets : number** - required
- **date : string** - required
- **price : number** - required
- **email : string** - required
- **booked : date** - required


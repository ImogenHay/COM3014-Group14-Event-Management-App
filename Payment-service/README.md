# Payment Microservice
This microservice manages payments using Stripe for the Event Management App.

If service wants to be run then `npm start` should be used

### Technologies Used

- Node.js
- Express
- Stripe
- MongoDB

### Development Scripts

- `npm install`: Installs project dependencies.
- `npm start`: Starts the Node.js server by running the `server.js` file using the Node.js runtime.
- `npm dev`: Starts the Node.js server using nodemon, which watches for changes in the `server.js` file and automatically restarts the server.
- `npm postman-test`: Runs the Postman test collection located at `Tests/Payment service.postman_collection.json` using the `newman` command-line tool.
  
### APIs
- **POST /payments**   
  - Creates a new payment. 
  - Requires user authentication. 
  - Validates the user's authentication using the validateUser middleware.

  - Expects payment details in the request body (amount, currency, source).

  - Processes the payment using a payment gateway (e.g., Stripe).

  - Creates a new payment record in the database.

  - Responds with the created payment object.

- **GET /payments**
  - Retrieves all payments. 
  - Requires user authentication. 
  - Validates the user's authentication using the validateUser middleware.
  - Fetches all payment records from the database. 
  - Responds with an array of payment objects representing the list of payments. 
  - Payment objects include details such as amount, currency, source, and status.

### Payment MongoDB Model

- **Payment amount : number** - required
- **currency : string** - required
- **Source : string** - required
- **status : string** 
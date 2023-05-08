# Payment Microservice
This microservice manages payments using Stripe for the Event Management App.

### Technologies Used

- Node.js
- Express
- Stripe
- MongoDB

### Development Scripts

- `npm install`: Installs project dependencies.
- `npm run dev`: Starts the microservice and MongoDB locally on http://localhost:5001.
- `npm run test`: Runs unit tests to check individual code units.
  
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
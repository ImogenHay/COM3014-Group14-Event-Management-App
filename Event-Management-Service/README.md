# Event-Management Microservice
Manages events for Event Management App. Built using NodeJS, express, yarn, typescript and MongoDB. Full list of dependencies in package.json.

If service wants to be run then `yarn run start` should be used

### Development Scripts:
- **`yarn install`** - install project dependencies 
- **`yarn run dev`** - starts service and MongoDB locally on http://localhost:3001
- **`yarn run build`** - compiles TypeScript code into JavaScript code using the TypeScript compiler (tsc) and outputs it to the build directory.
- **`yarn run start`** - Runs the compiled JavaScript code in the build directory by first running the "build" script to compile the TypeScript code and then executing the compiled code using the Node.js runtime.
- **`yarn run test`** - run jest unit tests to check individual code units
- **`yarn run postman-test`** - runs postman collection to check APIs working (service must already be running locally)
- **`yarn run lint`** - checks typescript standards and formatting
- **`yarn run lint-fix`** - fixes formatting

### APIs:
- **GET {host}/events/healthcheck**
  - Returns 200 if service reachable 
- **All following API calls require the authorization string to be included in the request headers**
- **POST {host}/events/create**
  - Creates event using json input in following format:
      `{
        "name": "Name of Event",
        "description": "Description of event",
        "venue": "Name of Venue",
        "date": "2023-01-10T00:00:00.000Z",
        "duration": 2,
        "availableTickets": 99
        }`. 
    
  - Returns 201 if created successfully.
- **GET {host}/events**
  - Returns list of all events in JSON format. 
  - Returns 200 if successful.
- **GET {host}/events/allCurrentUserEvents**
  - Returns list of all events of current user in JSON format.
  - Returns 200 if successful.
- **GET {host}/events/:eventId**
  - Returns JSON object of :eventId. 
  - Returns 200 if successful.
- **PUT {host}/events/:eventId**
  - Updates event. 
  - Requires json input in following format:
    `{
    "name": "Name of Event",
    "description": "Description of event",
    "venue": "Name of Venue",
    "date": "2023-01-10T00:00:00.000Z",
    "duration": 2,
    "availableTickets": 99
    } `.
  - Will update any fields with different value. 
  - Returns 200 if updated successfully.
- **DELETE {host}/events/:eventId**
  - Removes :eventId. Returns 200 if successful.
- **GET {host}/events/check/:eventId**
  - Returns number of tickets available for :eventID. 
  - Returns 200 if request successful.
- **PUT {host}/events/book-ticket/:eventId/:numOfTickets**
  - Subtracts :numOfTickets from number of available tickets for :eventID. 
  - Returns 200 if successful. 
  - If :numOfTickets too high 400 returned and number of available tickets unchanged.

### Events MongoDB Model:
- **name : string** - required, max length 50
- **description : string** - required, max length 500
- **venue : string** - required
- **date : Date** - required, ISO Date format, must be after current date
- **duration : number** - required, greater than 0
- **availableTickets : number** - required, greater than or equal 0
- **ticketPrice : number** - required, greater than or equal 0 
- **userId : string** - required
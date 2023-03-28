// here we will define all the routes
// from here we will call the handlers that are in controllers

import {Express, Request, Response} from "express";
import {
    getAllEventsHandler,
    getCheckAvailabilityHandler, getEventHandler,
    postCreateEventHandler,
    putBookTicketHandler
} from "./Controllers/events_controller";

// creating a function that takes in a parameter of type expresss
function routes(app: Express) {
    app.get('/events/healthcheck',(req:Request, res: Response) => {
        res.sendStatus(200);
    });
    app.post('/events/create', postCreateEventHandler);
    app.get('/events/all', getAllEventsHandler);
    app.get('/events/:eventId', getEventHandler);
    app.get('/events/availability-check/:eventId', getCheckAvailabilityHandler);
    app.put('/events/book-ticket/:eventId', putBookTicketHandler);
}

export default routes;
import axios from "axios";

const eventsUrl = "http://localhost:3001"; // replace with your API host

// Healthcheck API
export const healthcheck = async () => {
    try {
        const response = await axios.get(`${eventsUrl}/events/healthcheck`);
        return response.status === 200; // return true if status code is 200
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Create Event API
export const createEvent = async (event, token) => {
    try {
        const response = await axios.post(`${eventsUrl}/events/create`, event, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.status === 201; // return true if status code is 201
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Get All Events API
export const getAllEvents = async (token) => {
    try {
        const response = await axios.get(`${eventsUrl}/events`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // return JSON response data
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getAllUsersEvents = async (token) => {
    try {
        const response = await axios.get(`${eventsUrl}/events/allCurrentUserEvents`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // return JSON response data
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Get Event by ID API
export const getEventById = async (eventId, token) => {
    try {
        const response = await axios.get(`${eventsUrl}/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // return JSON response data
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Update Event API
export const updateEvent = async (eventId, event, token) => {
    try {
        const response = await axios.put(`${eventsUrl}/events/${eventId}`, event, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.status === 200; // return true if status code is 200
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Delete Event API
export const deleteEvent = async (eventId, token) => {
    try {
        const response = await axios.delete(`${eventsUrl}/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.status === 200; // return true if status code is 200
    } catch (error) {
        console.error(error);
        return false;
    }
};

// Check Available Tickets API
export const checkAvailableTickets = async (eventId, token) => {
    try {
        const response = await axios.get(`${eventsUrl}/events/check/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // return JSON response data
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Book Tickets API
export const bookTickets = async (eventId, numOfTickets, token) => {
    try {
        const response = await axios.put(`${eventsUrl}/events/book-ticket/${eventId}/${numOfTickets}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.status === 200; // return true if status code is 200
    } catch (error) {
        console.error(error);
        return false;
    }
};

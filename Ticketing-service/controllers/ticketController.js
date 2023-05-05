const Ticket = require("../models/Ticket");
const emailService = require("../services/emailService");
// const req = require("express/lib/request");
// const userId = req.userId
exports.getAllTickets = async (req, res) => {
    try {
        const user_id = req.userId
        const tickets = await Ticket.find({ userId: user_id });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addTicket = async (req, res) => {
    const userId = req.userId
    const {event, date, price, email } = req.body;

    const ticket = new Ticket({
        userId,
        event,
        date,
        price,
    });

    try {
        const newTicket = await ticket.save();
        emailService.sendConfirmationEmail(email, newTicket);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

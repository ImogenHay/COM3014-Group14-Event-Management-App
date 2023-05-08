const Ticket = require("../models/Ticket");
const emailService = require("../services/emailService");


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

    const {event,venue,tickets, date, price,email} = req.body;

    const ticket = new Ticket({
        userId,
        event,
        venue,
        tickets,
        date,
        price,
        email,
    });

    try {
        const newTicket = await ticket.save();
        emailService.sendConfirmationEmail(email, newTicket);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


require('dotenv').config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

exports.sendConfirmationEmail = (email, ticket) => {
    const mailOptions = {
        from: "rsm.13r@gmail.com",
        to: email,
        subject: "Ticket Confirmation",
        html: `
      <h1>Thank you for your purchase!</h1>
      <p>You have successfully purchased a ticket for ${ticket.event} on ${ticket.date}.</p>
      <p>Your ticket price is  £${ticket.price}.</p>
      <p>Please bring this email and a valid ID to the event.</p>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

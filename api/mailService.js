const nodemailer = require('nodemailer');
const config = require('../config/config');
const { EmailLog } = require('../models');

exports.sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport(config.emailConfig);
    const mailOptions = { from: config.emailConfig.auth.user, to, subject, text };

    try {
        const result = await transporter.sendMail(mailOptions);
        await EmailLog.create({ to, subject, text, status: 'Sent' });
        return result;
    } catch (error) {
        await EmailLog.create({ to, subject, text, status: 'Failed' });
        throw error;
    }
};

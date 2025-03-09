const express = require('express');
const router = express.Router();
const mailController = require('../api/mail');
const notificationController = require('../api/notification');
const slackController = require('../api/slack');
const verifyToken = require('../controller/tokenize');

// Email routes
router.post('/send-mail', verifyToken, mailController.sendEmail);

// Notification routes
router.post('/send-notification', verifyToken, notificationController.sendNotification);

// Slack routes
router.post('/send-slack-message', verifyToken, slackController.sendSlackMessage);

module.exports = router;

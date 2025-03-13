const express = require('express');
const router = express.Router();
const mailController = require('../api/mail');
const notificationController = require('../api/notification');
const slackController = require('../api/slack');
const healthController = require('../api/healthController');
const verifyToken = require('../controller/tokenize');

router.get('/health', verifyToken, healthController.checkHealth);
router.post('/send-mail', verifyToken, mailController.sendEmail);
router.post('/send-notification', verifyToken, notificationController.sendNotification);
router.post('/send-slack-message', verifyToken, slackController.sendSlackMessage);

module.exports = router;

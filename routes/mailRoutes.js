const express = require('express');
const router = express.Router();
const mailController = require('../api/mailController');
const verifyToken = require('../controller/tokenize')

router.post('/send', verifyToken, mailController.sendEmail);
router.get('/logs', mailController.getEmailLogs); 

module.exports = router;

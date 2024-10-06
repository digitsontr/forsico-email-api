const axios = require('axios');
//const { EmailLog } = require('../models');

exports.mainPage = (req, res) => {
    res.status(200).send('API is up and running!');
};

exports.sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    console.log("TO : ", to);
    
    const accessToken = await getAccessTokenAsync();
    const emailData = {
        message: {
            subject: subject,
            body: {
                contentType: "HTML",
                content: text 
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: to
                    }
                }
            ]
        },
        saveToSentItems: "true"
    };

    try {
        const response = await axios.post('https://graph.microsoft.com/v1.0/users/noreply@forsico.io/sendMail', emailData, {  // Corrected: Removed the extra curly braces around emailData
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Email sent successfully:', response.data);
        
        res.status(200).send('Email sent successfully');

        //const emailLogging = await EmailLog.create({ to, subject, text, status: 'Sent' });

        //console.log("EMAIL SUCCESS LOG : ", emailLogging)
    } catch (error) {
        console.error('Error on send email:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to send email');
    }
};

/*
exports.getEmailLogs = async (req, res) => {
    try {
        const logs = await EmailLog.findAll();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
*/

async function getAccessTokenAsync() {
    const { ConfidentialClientApplication } = require('@azure/msal-node');
    const config = {
        auth: {
            clientId: "2687e3c3-b48b-49a8-8238-4bdf71b7a2ac",
            authority: "https://login.microsoftonline.com/dbcd0249-1624-40e8-9182-602fb5c9d9a7",
            clientSecret: "8V-8Q~~6CDPMMyBM9RnPZ5AOfKaAPUq1jb6nMb-s",
        }
    };

    const cca = new ConfidentialClientApplication(config);
    const authResult = await cca.acquireTokenByClientCredential({
        scopes: ['https://graph.microsoft.com/.default']
    });

    return authResult.accessToken;
}

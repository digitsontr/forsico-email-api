const axios = require('axios');

exports.sendEmail = async (req, res) => {
    const { to, subject, html } = req.body;
    const accessToken = await getAccessTokenAsync();

    console.log("THIS IS A MAIL SENDER FUNCT.. \n", to, "\n", subject, "\n", html);


    const emailData = {
        message: {
            subject: subject,
            body: {
                contentType: "HTML",
                content: html
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
        const response = await axios.post('https://graph.microsoft.com/v1.0/users/noreply@forsico.io/sendMail', emailData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status > 199 && response.status < 300) {
            console.log('Email sent successfully:', response.data);

            const responseData = {
                status: 'success',
                message: 'Email sent successfully',
                timestamp: new Date().toISOString(),
            };
    
            console.log('Email sent successfully:', responseData);
            res.status(200).json(responseData);
        } else {
            console.log('Email sent failed:', response.data);

            const responseData = {
                status: 'failed',
                message: 'Email sent failed',
                timestamp: new Date().toISOString(),
            };
    
            console.log('Email sent successfully:', responseData);
            res.status(400).json(responseData);
        }
    } catch (error) {
        console.error('Error on send email:', error.response ? error.response.data : error.message);

        const responseData = {
            status: 'failed',
            message: 'Email sent failed',
            timestamp: new Date().toISOString(),
        };

        res.status(400).json(responseData);
    }
};


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

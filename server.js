const express = require('express');
//const bodyParser = require('body-parser');
const mailRoutes = require('./routes/mailRoutes');
//const { sequelize } = require('./models');

const app = express();
const port = 3000;

app.use(express.json());
//app.use(bodyParser.json());
app.use('/api/mail', mailRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const express = require('express');
const mailRoutes = require('./routes/mailRoutes');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/mail', mailRoutes);
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});


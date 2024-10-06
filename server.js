const express = require('express');
//const bodyParser = require('body-parser');
const mailRoutes = require('./routes/mailRoutes');
const { sequelize } = require('./models');

const app = express();
const port = 3000;

app.use(express.json());
//app.use(bodyParser.json());
app.use('/api/mail', mailRoutes);

// Veritabanı tablolarını oluştur
sequelize.sync({ force: false })  // force: true dikkatli kullanın, mevcut verileri siler!
    .then(() => {
        console.log('Database synced');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });


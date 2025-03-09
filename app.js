const express = require('express');
const cors = require('cors');
const communicationRoutes = require('./routes/communicationRoutes');
const app = express();
const port = process.env.PORT || 8080;

// Tüm originlere izin ver (sadece geliştirme ortamı için)
app.use(cors());

app.use(express.json());
app.use('/api/communication', communicationRoutes);
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});


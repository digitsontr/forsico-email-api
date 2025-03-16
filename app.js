const express = require('express');
const cors = require('cors');
const informationRoutes = require('./routes/informationRoutes');
const app = express();
const port = process.env.PORT || 8081;

// Tüm originlere izin ver (sadece geliştirme ortamı için)
app.use(cors());

app.use(express.json());
app.use('/api/information', informationRoutes);
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});


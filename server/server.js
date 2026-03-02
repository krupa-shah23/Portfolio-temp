require('dotenv').config(); // MUST be the first line
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/messages', messageRoutes); // Routes enquiries to your controller

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST"],
    credentials: true
}));

app.use(express.json());
app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log("Server berjalan di http://localhost:" + PORT);
});
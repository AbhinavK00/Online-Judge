const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;
const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Error connecting to Database', err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
//app.use(cors);
app.use('/', require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
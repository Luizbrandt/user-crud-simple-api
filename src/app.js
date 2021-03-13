require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routeUsers = require('./routes/userRoutes');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", routeUsers);
mongoose.set('useFindAndModify', false);

const connectionObj = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

mongoose.connect(process.env.MONGO_URL, connectionObj, () => {
    console.log('Connected do Database!');
})

app.listen(process.env.PORT);
console.log(`Server is running on PORT ${process.env.PORT}`)
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const routeUsers = require('./routes/userRoutes');

app.use("/api/users", routeUsers);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
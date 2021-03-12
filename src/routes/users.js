const express = require("express");
const router = express.Router();
const User = require('../models/User');

router.get("/", (request, response) => {
    response.send({message: "Test running OK!"});
})

router.post("/", (request, response) => {
    
    const requestUser = new User({
        name: request.body.name,
        cpf: request.body.cpf,
        email: request.body.email,
    });

    requestUser.save().then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });

})

module.exports = router;
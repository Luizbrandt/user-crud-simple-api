const data = require('../properties/userProperties.json');

const express = require("express");
const router = express.Router();
const User = require('../models/userModel');

const userService = require('../services/userServices');

//Create user - GET Request
router.post("/", async (request, response) => {

    const fieldsValidation = userService.userDataCheck(request.body);
    const hasOneCpf = await userService.getUserByCpf(request.body.cpf);
    const hasOneEmal = await userService.getUserByEmail(request.body.email);

    if(!fieldsValidation){
        response.status(data.STATUS_CODE.EMPTY_FIELDS).json({ message: data.MESSAGES.EMPTY_FIELD});
    }else if(hasOneCpf){
        response.status(data.STATUS_CODE.CONFLICT).json({ message: data.MESSAGES.CPF_USED});
    }else if(hasOneEmal){
        response.status(data.STATUS_CODE.CONFLICT).json({message: data.MESSAGES.EMAIL_USED});
    }else{
        const userCreated = await userService.createUser(request.body);
        response.json({ message: data.MESSAGES.CREATED_SUCCESS, user: userCreated });
    }

});

//Get all users
router.get("/", async (request, response) => {

    const users = await userService.getUsers();
    const items = users.length;
    const obj = [users, items];
    response.json(obj);

});

//Get user by Name
router.get("/name", async (request, response) => {

    const nameEmpty = userService.emptyName(request.body.name);

    if(nameEmpty){

        response.status(data.STATUS_CODE.NOT_FOUND).json({message: data.MESSAGES.EMPTY_NAME});

    }else{

        const userFound = await userService.getUserByName(request.body.name);

        if(userFound){

            response.json(userFound);

        }else{

            response.status(data.STATUS_CODE.NOT_FOUND).json({message: data.MESSAGES.NAME_NOT_FOUND});

        }
    }

});

//Get user by CPF
router.get("/cpf", async (request, response) => {

    const cpfEmpty = userService.emptyCpf(request.body.cpf);

    if(cpfEmpty){

        response.status(data.STATUS_CODE.NOT_FOUND).json({message: data.MESSAGES.EMPTY_CPF});

    }else{

        const userFound = await userService.getUserByCpf(request.body.cpf);

        if(userFound){

            response.json(userFound);

        }else{

            response.status(data.STATUS_CODE.NOT_FOUND).json({message: data.MESSAGES.CPF_NOT_FOUND});

        }
    }

});

//Get user by Email
router.get("/email", async (request, response) => {

    const emailEmpty = userService.emptyEmail(request.body.email);

    if(emailEmpty){

        response.status(data.STATUS_CODE.NOT_FOUND).json({message: data.MESSAGES.EMPTY_EMAIL});

    }else{

        const userFound = await userService.getUserByEmail(request.body.email);

        if(userFound){

            response.json(userFound);

        }else{

            response.status(data.STATUS_CODE.NOT_FOUND).json({message: data.MESSAGES.EMAIL_NOT_FOUND});

        }
    }

});

module.exports = router;
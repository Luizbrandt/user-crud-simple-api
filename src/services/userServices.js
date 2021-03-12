const User = require('../models/userModel');    

class UserService {

    userDataCheck(user){
        if(!user.name || !user.cpf || !user.email){
            return false;
        }
        
        return true;
    }

    async getUsers(){
        return await User.find();
    }

    async getUserByName(name){
        return await User.find({ name });
    }
    
    async getUserByCpf(cpf){
        return await User.findOne({ cpf });
    }

    async getUserByEmail(email){
        return await User.findOne({ email });
    }

    async createUser(userData){

        return await User.create({

            name: userData.name,
            cpf: userData.cpf,
            email: userData.email

        })
    }

    emptyName(name){
        return !name && true;
    }

    emptyCpf(cpf){
        return !cpf && true;
    }

    emptyEmail(email){
        return !email && true;
    }

}

const userService = new UserService();
module.exports = userService;
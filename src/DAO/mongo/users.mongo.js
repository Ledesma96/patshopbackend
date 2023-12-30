import mongoose from "mongoose";
import UsersModel from "../models/users.model.js"

export default class UsersMongo{
    constructor(){

    }

    getUserById = async(id) => {
        try {
            const uid = new mongoose.Types.ObjectId(id)
            const user = await UsersModel.findOne(uid).populate('my_shopping.shopping_id')
            return user.my_shopping
        } catch (error) {
            throw error
        }
    }
}
import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    dni:Number,
    email: {
        type: String,
        unique: true,
    },
    password:String,
    adress:[{
        street:String,
        heigth: String,
        CP:String,
        city:String,
        location: String
    }],
    shopping:[{
        cid:{
            type: mongoose.Schema.Types.ObjectId, ref:"carts"
        }
    }]
});

const UsersModel = mongoose.model(usersCollection, usersSchema);

export default UsersModel;
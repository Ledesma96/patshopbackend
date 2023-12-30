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
    shopping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    rol:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    image: String,
    my_shopping:[{
        shopping_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'orders'
        }
    }]
});

const UsersModel = mongoose.model(usersCollection, usersSchema);

export default UsersModel;
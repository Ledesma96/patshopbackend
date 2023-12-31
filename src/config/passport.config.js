import passport from "passport";
import local from "passport-local"
import usersModel from "../DAO/models/users.model.js";
import { createHash, isValidPassword } from "../uitils.js";
import CartsModel from "../DAO/models/carts.model.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    //passport local
    passport.use("register", new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email"
        }, 
        async(req, username, password, done) => {
        const {first_name, email, last_name, dni} = req.body

    try {
        const existUser = await usersModel.findOne({email: username})
        console.log(existUser);
        
        if(!existUser){
            const newUser ={
                first_name,
                last_name,
                email,
                dni,
                password: createHash(password),
                image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            const userCreated = new usersModel(newUser);
            await userCreated.save()
            return done(null, userCreated)
            
        }
        console.log(("El usuario ya existe"));
        return done(null, false)
        
    } catch (error) {
        return done("Error al registrar usuario", error)
    }
    }))

    passport.use("login", new LocalStrategy(
        { usernameField: "email" },
        async(username, password, done) => {
            try {
                const user = await usersModel.findOne({email: username})
                if(!user){
                    console.error("El usuario no existe")
                    return done(null, false)
                }
                if(!isValidPassword(user, password)){
                    console.error("Password invalido");
                    return done(null, false)
                }
                if(user.rol != 'admin'){
                    if(!user.shopping){
                        const newCart = new CartsModel
                        const id = newCart._id
                        user.shopping = id
                        await user.save()
                        await newCart.save()
                    }
                }
                return done(null, user)
                
            } catch (error) {
                return done("Error al iniciar sesion", error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await usersModel.findById(id)
        done(null, user)
    })
}

export default initializePassport
import { Router } from "express";
import passport from "passport";
import { getUserById } from "../controllers/users.controllers.js";

const router = Router();

router.post("/login", passport.authenticate("login", "/login"), async(req, res) => {
    if(!req.user) return res.status(400).send("credenciales invalidas")
    req.session.user = req.user
    console.log(req.user.shopping);
    return res.status(200).send({id: req.user._id, image: req.user.image, name: req.user.first_name,last_name: req.user.last_name, email: req.user.email, rol:req.user.rol, cart: req.user.shopping})

})


router.post("/register", passport.authenticate("register", {failureRedirect: "/register"}), 
async(req, res) => {
    res.send("ok")
})

router.get('/:id', getUserById)

export default router
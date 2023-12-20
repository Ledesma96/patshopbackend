import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/login", passport.authenticate("login", "/login"), async(req, res) => {
    if(!req.user) return res.status(400).send("credenciales invalidas")
    req.session.user = req.user
    console.log(req.user.shopping);
    return res.status(200).send({name: req.user.first_name, rol:req.user.rol, cart: req.user.shopping})

})


router.post("/register", passport.authenticate("register", {failureRedirect: "/register"}), 
async(req, res) => {
    res.send("ok")
})

export default router
import { usersServices } from "../services/index.js";

export const getUserById = async(req, res) => {
    try {
        const {id} = req.params

        const my_shopping = await usersServices.getUserById(id)
        res.status(200).send({success: true, message: 'User successfully obtained', my_shopping })
    } catch (error) {
        res.status(400).send({success: false, message: error.message})
    }
}
import { commentsServices } from "../services/index.js";

export const getComments = async(req, res) => {
    try {
        const comments = await commentsServices.getComments();
        res.status(200).send({success: true, message: 'Get comments successfully', comments: comments});
    } catch (error) {
        res.status(404).send({success: false, message:'An error ocurred', error: error.message});
    }
}

export const createComment = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            image: req.body.image || "data:image/jpeg;base64,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",
            profession: req.body.profession || "--",
            comment: req.body.comment
        }

        const comment = await commentsServices.createComment(data)

        res.status(201).send({success: true, message: comment})
    } catch (error) {
        res.status(500).send({success: false, message: comment})
    }
}
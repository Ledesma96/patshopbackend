import CommentsModel from "./models/comments.model.js";

export default class CommentsMongo{
    constructor(){

    }

    getComments = async() => {
        try {
            const comments = await CommentsModel.find()
            return comments
        } catch (error) {
            throw error
        }
    }

    createComment = async(data) => {
        try {
            const comment = await new CommentsModel(data).save()
            return 'Created comment successfully'
        } catch (error) {
            throw error
        }
    }
}
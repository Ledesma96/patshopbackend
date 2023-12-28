import mongoose from 'mongoose';

const commentsColection = 'comments'

const commentsSchema = new mongoose.Schema({
    name: String,
    image: String,
    profession: String,
    comment: String,
})

const CommentsModel = mongoose.model(commentsColection, commentsSchema)

export default CommentsModel
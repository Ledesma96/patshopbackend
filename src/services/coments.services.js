export default class CommentsServices{
    constructor(dao){
        this.dao = dao
    }

    getComments = async () => {
        return this.dao.getComments();
    }

    createComment = async(data) => {
        return this.dao.createComment(data)
    }
}
export default class UsersServices{
    constructor(dao){
        this.dao = dao
    }

    getUserById = async(id) => {
        return this.dat.getUserById(id)
    }
}
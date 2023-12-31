import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import bcrypt from "bcrypt"

export const createHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt)
};

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
};

export default __dirname
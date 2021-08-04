const db = require("../db")
const {BadRequestError} = require("../utils/errors")

class Settings{
    static async updateInfo({ user, settings }){
        if(!user){
            throw new BadRequestError("No authentication recognized")
        }
        const requiredFields = ["zip_code","first_name","last_name", "email", "age"]
        requiredFields.forEach(field =>{
            if(!settings.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })
        const query = `
        UPDATE users SET
            zip_code = $2,
            first_name = $3,
            last_name = $4,
            email = $5,
            age = $6
        WHERE username= $1;`
        const result = await db.query(query, [ user.username, settings.zip_code, settings.first_name, settings.last_name, settings.email, settings.age])
        const profile = result.rows[0]
        return profile
    }

}

module.exports = Settings
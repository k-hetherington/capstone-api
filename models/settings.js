const db = require("../db")
const {BadRequestError} = require("../utils/errors")

class Settings{
    // static async updateInfo({ user, settings }){
    //     if(!user){
    //         throw new BadRequestError("No authentication recognized")
    //     }
    //     const requiredFields = ["zip_code","first_name","last_name", "email"]
    //     requiredFields.forEach(field =>{
    //         if(!settings.hasOwnProperty(field)){
    //             throw new BadRequestError(`Missing ${field} in request body`)
    //         }
    //     })
    //     const results = await db.query(
    //         `
    //             UPDATE users SET
    //                 zip_code = $2,
    //                 first_name = $3,
    //                 last_name = $4,
    //                 email = $5,
    //             WHERE  username = $1;
    //         `,[ user.username, settings.zip_code, settings.first_name, settings.last_name, settings.email]
    //     )
    //     return results.rows[0]
        
    // }


    static async updateInfo({ user, settings }){
        if(!user){
            throw new BadRequestError("No authentication recognized")
        }
        const requiredFields = ["zip_code","first_name","last_name", "email"]
        requiredFields.forEach(field =>{
            if(!settings.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })
        const results = await db.query(`
        UPDATE users 
        SET
            zip_code = $2,
            first_name = $3,
            last_name = $4,
            email = $5
            WHERE id=(SELECT id FROM users WHERE username = $1);
        `, [ user.username, settings.zip_code, settings.first_name, settings.last_name, settings.email]
        );
        return results.rows[0]
    }
}

module.exports = Settings
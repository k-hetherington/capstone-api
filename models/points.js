const { BadRequestError } = require("../utils/errors")
const db = require("../db")


class Points{
    static async getPoints({user}){
        const results = await db.query(
            `SELECT points_quantity FROM give WHERE user_id =(SELECT id FROM users WHERE username = $1)`,
            [user.username]
        )
        return results.rows
    }

    static async redeemPoints({user}){
        // console.log("works?", await Points.getPoints({user}))
        // var points = await Points.getPoints({user})
        // console.log("redeem",points)
        // if(points.points_quantity){
        // var quantity = points.points_quantity -20
        // console.log("quantity", quantity)
        const results = await db.query(
        `UPDATE give SET points_quantity  = 0 WHERE user_id= (SELECT id FROM users WHERE username = $1) `, [user.username]
        )
        //quantity
        return results.rows[0]
        // }
        
    }

}
module.exports = Points
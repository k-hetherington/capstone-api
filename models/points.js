const { BadRequestError } = require("../utils/errors")
const db = require("../db")


class Points{
    static async getPoints({user}){
        const results = await db.query(
            `SELECT points_quantity FROM give WHERE user_id =(SELECT id FROM users WHERE username = $1) LIMIT 1
            `,
            [user.username]
        )
        var pointNumber = 0
        var points = results.rows[0]
    // points.forEach(function (item, index){
    //     console.log(points[index].points_quantity)
    //     pointNumber += points[index].points_quantity
    // })
        console.log("points",points)
        return points
    }

    static async redeemPoints({user}){
        var points = await Points.getPoints({user}).points_quantity - 20
        console.log("redeem",points)
        const results = await db.query(
        `UPDATE give SET points_quantity  = $1 WHERE user_id= (SELECT id FROM users WHERE username = $2) `, [points, user.username]
        )
        return results.rows[0]
    }


    // static async createConfirmationNumber({user}){
    //     const results = await db.query(
    //     `INSERT INTO confirmation(user_id, num_confirmation) VALUES((SELECT id FROM users WHERE username = $1),(SELECT ROUND(RAND()*999999, 100000))= $2)
    //      RETURNING id, user_id, num_confirmation `, [user.username]
    //     )
    //     console.log(results)
    //     return results.rows[0]
    // }

    // static async getConfirmNum({user}){
    //     const results = await db.query(
    //         `SELECT num_confirmation FROM confirmation WHERE user_id = (SELECT id FROM users WHERE username = $1)`,
    //         [user.username]
    //     )
    //     return results.rows
    // }
}
module.exports = Points
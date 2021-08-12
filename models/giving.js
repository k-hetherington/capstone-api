const { BadRequestError } = require("../utils/errors")
const db = require("../db")
const validate = require("../utils/validateGiving")
const validateGiving = require("../utils/validateGiving")

class Giving{

    //Create A Giving
    // static  validateGiving({ badGiving, user }){

        
    //     const requiredFields = ["product_type","quantity", "is_used"]
    //     requiredFields.forEach((field) => {
    //       if (!badGiving?.hasOwnProperty(field)) {
    //         throw new BadRequestError(`You forgot enter to enter the  - ${field} .`)
    //       }
    //     })
         
    //       if(badGiving.product_type=== ""){
    //         throw new BadRequestError("Please select a valid product type")
    //       }else if(badGiving.product_type===null){
    //         throw new BadRequestError("Please select a valid product type")
    //       }

    //       if(badGiving.quantity===0){
    //         throw new BadRequestError("You must select the mininum of one for quantity")
    //       }else if(badGiving.quantity===""){
    //         throw new BadRequestError("The quantity must be a number")
    //       }

    //       if(badGiving.is_used===""){
    //         throw new BadRequestError("Please select if your product is used or not")
    //       }
    //       return badGiving
    // }

    static async createGiving({ newGiving, user }){
      
      try {
        validateGiving(newGiving)
      } catch(err) {
          throw(err)
      }
   
      const results= await db.query(
            // Obehi: 
            //VALUES: I like to think of these of placeholders for what I'm inserting, cause I dont know exactly what the user
            // is gonna put down, but i know it's gonna be something cause its required
           
            `
            INSERT INTO give(product_type, quantity, is_used, product_pic, user_id)
            VALUES($1, $2, $3, $4, (SELECT id FROM users WHERE username = $5) )
            RETURNING id,
                      created_at,
                      product_type,
                      quantity,
                      is_used,
                      product_pic,
                      user_id,
                      points_quantity;
            `, 
            [newGiving.product_type, newGiving.quantity, newGiving.is_used, newGiving.product_pic, user.username]
            )
            await db.query(`UPDATE give SET points_quantity = points_quantity+ $1 WHERE user_id= (SELECT id FROM users WHERE username = $2)`, [newGiving.quantity, user.username] )
        
            return results.rows[0]
    }


  static async redeemPoints({user}){
  const results = await db.query(
    `UPDATE give SET points_quantity = 0 WHERE user_id= (SELECT id FROM users WHERE username = $1) `, [user.username]
  )
  return results.rows[0]
}




}

module.exports = Giving
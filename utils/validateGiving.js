const { BadRequestError } = require("./errors")
const validateGiving = (newGiving) => {
    const requiredFields = ["product_type","quantity", "is_used"]
       
        requiredFields.forEach((field) => {
          if (!newGiving?.hasOwnProperty(field)) {
            throw new BadRequestError(`You forgot enter to enter the  - ${field} .`)
          }
        })
         
          if(newGiving.product_type=== ""){
            throw new BadRequestError("Please select a valid product type")
          }else if(newGiving.product_type===null){
            throw new BadRequestError("Please select a valid product type")
          }

          if(newGiving.quantity===0){
            throw new BadRequestError("You must select the mininum of one for quantity")
          }else if(newGiving.quantity===""){
            throw new BadRequestError("The quantity must be a number")
          }

          if(newGiving.is_used===""){
            throw new BadRequestError("Please select if your product is used or not")
          }
}

module.exports = validateGiving
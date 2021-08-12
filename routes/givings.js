
//Obehi
const express = require("express")
const Giving = require("../models/giving")
const security = require("../middleware/security")
const router = express.Router()

//Obehi: This creates new giving entries. We want the authenticated user to enter something into the give form or the give database (this is why we use the 
// (POST) request
//security.requireAuthenticatedUser,
router.post("/",  security.requireAuthenticatedUser, async(req, res, next)=>{
    try {
        const user = res.locals.user
        const givings = await Giving.createGiving({ newGiving:req.body, user })
        return res.status(201).json({  givings }) 
    } catch (err) {
        return next(err)   
    }
})

// router.post("/",  security.requireAuthenticatedUser, async(req, res, next)=>{
//     try {
//         const user = res.locals.user
       
//         const badgivings = await Giving.validateGiving({ badGiving:req.body, user })
//         return res.status(201).json({  badgivings }) 
//     } catch (err) {
//         next(err)   
//     }
// })





module.exports = router;




module.exports = router;
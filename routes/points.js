const express = require("express")
const Points = require("../models/points")
const security = require("../middleware/security")
const router = express.Router()



router.post("/", security.requireAuthenticatedUser, async(req, res, next)=>{
    const user = res.locals.user
    console.log(user.username)
    const redeem = await Points.redeemPoints({user})
    //const confirm = await Points.createConfirmationNumber({user})
    return res.status(201).json({redeem})
})

router.get("/", security.requireAuthenticatedUser, async(req, res, next)=>{
    const user = res.locals.user
    const pointNumber = await Points.getPoints({user})

    // var pointNumber = 0
    // points.forEach(function (item, index){
    //     console.log(points[index].points_quantity)
    //     pointNumber += points[index].points_quantity
    // })
    //const number = await Points.getConfirmNum({user})
    console.log("pointNumber", pointNumber)
    return res.status(200).json({pointNumber})
})

// router.post("/", security.requireAuthenticatedUser, async(req, res, next)=>{
//     const user = res.locals.user
//     console.log(user.username)
//     const confirm = await Points.createConfirmationNumber({user})
//     return res.status(201).json({confirm})
// })

// router.get("/", security.requireAuthenticatedUser, async(req, res, next) =>{
//     const user = res.locals.user
//     const number = await Points.getConfirmNum({user})
//     return res.status(200).json({number})
// })

module.exports = router;
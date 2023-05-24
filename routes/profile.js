const express = require("express")
const Profile = require("../models/profile")
const router = express.Router()
const security = require("../middleware/security")
const tokens = require("../utils/tokens")

router.get("/", security.requireAuthenticatedUser, async (req, res, next)=>{
    try {
        const user =res.locals.user
        const recycleJson = await Profile.fetchNumberRecycled({ user })
        const donationJson = await Profile.fetchNumberDonations({ user })
        var recycleNumber = 0
        var donationNumber = 0
        donationJson.forEach(function (item,index){
            donationNumber += donationJson[index].quantity
        })
        recycleJson.forEach(function (item,index){
            recycleNumber += recycleJson[index].quantity
        })
        return res.status(200).json({ donationNumber, recycleNumber })
    } catch (error) {
        console.log(error)
        next(error)
    }
} )

// Obehi: This gets the giving entries of the user
router.get("/donations", security.requireAuthenticatedUser, async(req,res,next)=>{
    try{
        const user = res.locals.user
        const donations = await Profile.fetchDonations({ user })
        return res.status(200).json({ donations })
    }catch(error){
        console.log(error)
        next(error)
    }
 
})

router.post("/", security.requireAuthenticatedUser, async (req, res, next)=>{
    try {
        const user = res.locals.user
        const url = await Profile.addPic({user,url: req.body})
        const upload = await Profile.uploadPic({user, upload: req.body})
        if (url === null){
            return res.status(200).json({ upload })
        }
        return res.status(200).json({ url })
    } catch (err) {
        next(err)
    }
})

//Obehi: This gets the recycling entries of the user
router.get("/recycles", security.requireAuthenticatedUser, async(req,res,next)=>{
    try{
        const user = res.locals.user
        const recycles = await Profile.fetchRecycles({ user })
        return res.status(200).json({ recycles })
    }catch(error){
        console.log(error)
        next(error)
    }
    
})


module.exports = router
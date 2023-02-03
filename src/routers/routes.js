const express = require("express")
const router = express()
const {postUrl, getCompanies} = require("../controllers/controller.js")
const middleware=require("../middleware")
router.use(express.json())
router.post("/save",middleware.postValidator,postUrl)
router.get("/companies/sector/:id", middleware.idValidator, getCompanies)
module.exports=router
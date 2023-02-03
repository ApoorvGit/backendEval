const services=require("../services/service.js")
const HttpError=require("../error")

const postUrl=async (req,res)=>{
    try{
        const newBody=await services.postService(req.body.urlLink)
        res.status(201).json(newBody)
    }catch (error) {
        if (error instanceof HttpError) {
            res.status(error.code).json({ message: error.message })
        }
    }
    
}
const getCompanies=async (req,res)=>{
    try{
        console.log(req.params.id)
        const newBody=await services.getService(req.params.id)
        res.status(200).json(newBody)
    }catch (error) {
        if (error instanceof HttpError) {
            res.status(error.code).json({ message: error.message })
        }
    }
}
module.exports={postUrl, getCompanies}
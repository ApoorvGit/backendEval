const joi=require("joi")

//schemas 
const postValidatorSchema=joi.object({
    urlLink:joi.string().uri().required()
})
const idValidatorSchema=joi.object({
    id: joi.string().regex(/^[a-zA-Z0-9\s]+$/).required()
})

//validators
const postValidator=(req,res,next)=>{
    const {error}=postValidatorSchema.validate(req.body)
    if(error){
        return res.status(400).json({"message":error.message})
    }
    next()
}
const idValidator=(req,res,next)=>{
    const {error}=idValidatorSchema.validate(req.params)
    if(error){
        return res.status(400).json({"message":error.message})
    }
    next()
}

module.exports={postValidator, idValidator}
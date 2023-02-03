const joi=require("joi")

//schemas 
const postValidatorSchema=joi.object({
    urlLink:joi.string().uri().required()
})
const idValidatorSchema=joi.object({
    id: joi.string().regex(/^[a-zA-Z0-9\s]+$/).required()
})

const idAndStringValidatorSchema=joi.object({
    "id": joi.string(),
    "ceo": joi.string()
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
const idAndStringValidator=(req,res,next)=>{
    console.log(req.params.id)
    console.log(req.body.ceo)
    const {error}=idAndStringValidatorSchema.validate({"id":req.params.id, "ceo": req.body.ceo} )
    if(error){
        return res.status(400).json({"message":error.message})
    }
    next()
}
module.exports={postValidator, idValidator, idAndStringValidator}
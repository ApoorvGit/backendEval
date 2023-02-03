const fs = require("fs")
const axios = require("axios")
const {CompaniesInfo}=require("../../db/models")
const { Sequelize } = require("sequelize")
const HttpError=require("../error")
const postService=async (urlLink)=>{
    try{

        console.log(urlLink)
        const data=await axios.get(urlLink, "utf-8", (err, data) => {
            if (err) console.log(err)
            else console.log(data)
        })
        console.log(data.data)
        const myArray=  data.data.split("\n")
        const companyAndSectorData=[]
        for(let itr=0;itr<myArray.length;itr++){
            companyAndSectorData.push(myArray[itr].split(","))
        }
        for(let itr=1;itr<companyAndSectorData.length;itr++){
            const data=await axios.get("http://54.167.46.10/company/"+companyAndSectorData[itr][0], "utf-8", (err, data) => {
                if (err) console.log(err)
                else console.log(data)
            })
            const newBody = {
                "companyId": data.data.id,
                "name": data.data.name,
                "ceo": data.data.ceo,
                "score": 0,
                "sector": ""
            }
            await CompaniesInfo.create(newBody)
            console.log(newBody)
        }
        for(let itr=1;itr<companyAndSectorData.length;itr++){
            const data=await axios.get("http://54.167.46.10/sector?name="+companyAndSectorData[itr][1], "utf-8", (err, data) => {
                if (err) console.log(err)
                else console.log(data)
            })
            // console.log(data.data)
            const currentSector=data.data
            const performanceIndex=currentSector[0].performanceIndex
            console.log(performanceIndex)
            const cpi=performanceIndex[0].value
            // console.log(cpi)
            const cf=performanceIndex[1].value
            const mau=performanceIndex[2].value
            const roic=performanceIndex[3].value
            let score=((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4
            score=parseInt(score)
            console.log(score)
            //console.log(performanceIndex)
            console.log(companyAndSectorData[itr][0])
            await CompaniesInfo.update({ "Score": Number(score), "sector":companyAndSectorData[itr][1] }, {
                where: {
                    "companyId":companyAndSectorData[itr][0].toString()
                }
            })
            console.log("updated")
        }
        const result=await CompaniesInfo.findAll({
            attributes: ["companyId","name", "Score", "sector"]
        })
        console.log(result)
        return result
    }
    catch (error) {
        console.log(error)
        throw new HttpError(error.message, error.code)
    }
}

const getService=async (id)=>{
    try{
        console.log(id)
        const result=await CompaniesInfo.findAll({
            attributes: ["companyId","name", "Score", [Sequelize.literal("RANK() OVER (ORDER BY \"Score\" DESC)"), "rank"]],
            where:{
                "sector":id
            },
            limit: 2,
            order: [["Score", "DESC"]]
        })
        console.log(result)
        return result
    }
    catch (error) {
        console.log(error)
        throw new HttpError(error.message, error.code)
    }
}
const updateService=async (id, ceo)=>{
    try{
        console.log(id)
        console.log(ceo)
        const result=await CompaniesInfo.update({ "ceo": ceo }, {
            where: {
                "companyId":id
            }
        })
        return result
    }catch(error){
        throw new HttpError(error.message, error.code)
    }     
}  
module.exports={postService, getService, updateService}
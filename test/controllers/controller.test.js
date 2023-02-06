const controller=require("../../src/controllers/controller") 
const HTTPError = require("../../src/error")
const service=require("../../src/services/service") 
describe("Company Score generation api", ()=>{
    it("should create a new entries in companyInfo database and show the id, name and score of each company", async ()=>{
        jest.spyOn(service, "postService").mockResolvedValue([{
            "id":"1",
            "name": "mckinsey",
            "score": 500
        }])
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockReq={
            body:{
                urlLink:"https://s3-ap-southeast-1.amazonaws.com/he-public-data/companyinformation89b52a2.csv"
            }
        }
        await controller.postUrl(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(201)
        expect(mockRes.json).toBeCalledWith([{
            "id":"1",
            "name": "mckinsey",
            "score": 500
        }])
    }),
    it("should throw an error with 404 status code", async ()=>{
        jest.spyOn(service, "postService").mockResolvedValue(new Error("resource not found"))
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockReq={
            body:{
            }
        }
        await controller.postUrl(mockReq, mockRes)
        expect(mockRes.json).toBeCalledWith(new Error("resource not found"))
    }),
    it("should show the top 2 scoring companies in a sector", async ()=>{
        jest.spyOn(service, "getService").mockResolvedValue([{
            "companyId": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
            "name": "Apple",
            "Score": 29,
            "rank": "1"
        },
        {
            "companyId": "8727cc61-8c4b-4285-8853-2db808392c04",
            "name": "Google",
            "Score": 29,
            "rank": "1"
        }])
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockReq={
            params:{
                "id":"Software"
            }
        }
        await controller.getCompanies(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(200)
        expect(mockRes.json).toBeCalledWith([{
            "companyId": "46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc",
            "name": "Apple",
            "Score": 29,
            "rank": "1"
        },
        {
            "companyId": "8727cc61-8c4b-4285-8853-2db808392c04",
            "name": "Google",
            "Score": 29,
            "rank": "1"
        }])
    }),
    it("should throw an error with 404 status code when sector id is not provided", async ()=>{
        jest.spyOn(service, "getService").mockResolvedValue(new Error("No such sector found"))
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockReq={
            params:{
            }
        }
        await controller.getCompanies(mockReq, mockRes)
        expect(mockRes.json).toBeCalledWith(new Error("No such sector found"))
    }),
    it("should update the ceo of a company", async ()=>{
        jest.spyOn(service, "updateService").mockResolvedValue([1])
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockReq={
            params:{
                "id":"1"
            },
            body:{
                "ceo":"new ceo"
            }
        }
        await controller.updateCeo(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(200)
        expect(mockRes.json).toBeCalledWith([1])
    }),
    it("should throw an 404 error if id is not provided", async ()=>{
        jest.spyOn(service, "updateService").mockResolvedValue(new Error("company id not found"))
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockReq={
            params:{
            },
            body:{
                "ceo":"new ceo"
            }
        }
        await controller.updateCeo(mockReq, mockRes)
        expect(mockRes.json).toBeCalledWith(new Error("company id not found"))
    })

})
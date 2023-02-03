const controller=require("../../src/controllers/controller") 
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
    })

})
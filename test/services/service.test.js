const services = require("../../src/services/service")
const model=require("../../db/models")
// console.log(model)
const {CompaniesInfo}=model
const axios = require("axios")
// console.log(companiesInfo)
describe("Testing services", () => {
    it("should show the top 2 scoring companies in a sector", async () => {
        jest.spyOn(CompaniesInfo, "findAll").mockResolvedValue([{
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
        const users=await services.getService("Software")
        expect(users).toStrictEqual([{
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
    it("should update the ceo of a company", async () => {
        jest.spyOn(CompaniesInfo, "update").mockResolvedValue([1])
        const users=await services.updateService("1", "new ceo")
        expect(users).toStrictEqual([1])
    })

})
const express = require("express")

const app = express()
app.use(express.json())
const middleware=require("../../src/middleware")
  
describe("POST validation", () => {
    
    it("should return 400 if urlLink is not provided", () => {
        const mockReq={
            body: {}
        }
        const mockRes={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockNext=jest.fn()
        middleware.postValidator(mockReq, mockRes, mockNext)
        // Expect status 400 bad request called if there is error
        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({ message: "\"urlLink\" is required" })
        expect(mockNext).toHaveBeenCalledTimes(0)
    })
  
    it("should return 400 if urlLink is not a valid URI", () => {
        const mockReq={
            body: {urlLink: "not a valid URI"}
        }
        const mockRes={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockNext=jest.fn()
        middleware.postValidator(mockReq, mockRes, mockNext)
        // Expect status 400 bad request called if there is error
        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({ message: "\"urlLink\" must be a valid uri" })
        expect(mockNext).toHaveBeenCalledTimes(0)
    })
  
    it("should return 200 if urlLink is provided and is a valid URI", () => {
        const mockReq={
            body: {urlLink: "http://mckinsey.com"}
        }
        const mockRes={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockNext=jest.fn()
        middleware.postValidator(mockReq, mockRes, mockNext)
        expect(mockNext).toHaveBeenCalled()
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
describe("Get request validation", () => {
    
    it("should return 400 if id is not provided", () => {
        const mockReq={
            params: {}
        }
        const mockRes={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockNext=jest.fn()
        middleware.idValidator(mockReq, mockRes, mockNext)
        // Expect status 400 bad request called if there is error
        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({ message: "\"id\" is required" })
        expect(mockNext).toHaveBeenCalledTimes(0)
    })
  
    it("should return 400 if id is not valid ", () => {
        const mockReq={
            params: {id: 123.23}
        }
        const mockRes={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockNext=jest.fn()
        middleware.idValidator(mockReq, mockRes, mockNext)
        // Expect status 400 bad request called if there is error
        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({ message: "\"id\" must be a string" })
        expect(mockNext).toHaveBeenCalledTimes(0)
    })
  
    it("should return 200 if id is provided and is a valid also", () => {
        const mockReq={
            params: {id: "1234e567"}
        }
        const mockRes={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockNext=jest.fn()
        middleware.idValidator(mockReq, mockRes, mockNext)
        expect(mockNext).toHaveBeenCalled()
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})

describe("Patch/Update request validation", () => {
  
    it("should return 400 if id is not valid or ceo name is not a string", () => {
        const mockReq={
            params: {id: 123.23},
            body: {ceo: 1234}
        }
        const mockRes={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockNext=jest.fn()
        middleware.idAndStringValidator(mockReq, mockRes, mockNext)
        // Expect status 400 bad request called if there is error
        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({ message: "\"id\" must be a string" })
        expect(mockNext).toHaveBeenCalledTimes(0)
    })
  
    it("should return 200 if id is provided and is a valid also", () => {
        const mockReq={
            body: {ceo: "apoorv"},
            params: {id: "123e456"}
        }
        const mockRes={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockNext=jest.fn()
        middleware.idAndStringValidator(mockReq, mockRes, mockNext)
        expect(mockNext).toHaveBeenCalled()
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
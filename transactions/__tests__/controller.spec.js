import { TransactionController } from "../controller.js";

describe("Transaction Controller", () => {

    let request;
    let response;

    class ResponseMock {
        _json = null;
        _status = 0;
        json(value) {
            this._json = value;
        }
        status(value) {
            this._status = value;
            return this;
        }
    }

    beforeEach(() => {
        request = {};
        response = new ResponseMock();
    })

    describe("given find transactions by user", () => {
        
        test("when success, then return transactions", (done) => {
    
            const transactions = [{ uid: 1 }, { uid: 2 }];
    
            const controller = new TransactionController({
                findByUser: () => Promise.resolve(transactions)
            });
    
            controller.findByUser(request, response).then(() => {
                expect(response._json).toEqual(transactions);
                done();
            })
    
        })
    
        test("when fail, then return error", (done) => {
    
            const error = { code: 400 }
    
            const controller = new TransactionController({
                findByUser: () => Promise.reject(error)
            });
    
            controller.findByUser(request, response).then(() => {
                expect(response._json).toEqual(error);
                done();
            })
        })
    
        test("when fail, then return error status 400", (done) => {
    
            const error = { code: 400 }
    
            const controller = new TransactionController({
                findByUser: () => Promise.reject(error)
            });
    
            controller.findByUser(request, response).then(() => {
                expect(response._status).toEqual(error.code);
                done();
            })
        })
    })
})
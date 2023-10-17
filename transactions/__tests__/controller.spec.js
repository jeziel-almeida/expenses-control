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

    describe("given find transactions by uid", () => {

        test("when success, then return status 200", async () => {

            const controller = new TransactionController({
                findByUid: () => Promise.resolve()
            });

            const request = { params: { uid: 1 } };

            await controller.findByUid(request, response);

            expect(response._status).toEqual(200);
        })
        
        test("when success, then return transaction", async () => {

            const transaction = {
                findByUid: () => Promise.resolve()
            }

            const controller = new TransactionController(transaction);

            const request = { params: { uid: 1 } };

            await controller.findByUid(request, response);

            expect(response._json).toEqual(transaction);
        })

        test("when fail, then return error status", async () => {

            const controller = new TransactionController({
                findByUid: () => Promise.reject({ code: 400 })
            });

            const request = { params: { uid: 1 } };

            await controller.findByUid(request, response);

            expect(response._json).toEqual({ code: 400 });
        })
    })

    describe("given create new transaction", () => {

        test("when success, then return status 201", async () => {

            const controller = new TransactionController({
                create: () => Promise.resolve()
            });

            const request = { body: {} }

            await controller.create(request, response);

            expect(response._status).toEqual(201)
        })

        test("when success, then return transaction", async () => {

            const transaction = {
                create: () => Promise.resolve()
            }

            const controller = new TransactionController(transaction);

            const request = { body: { uid: 1 } }

            await controller.create(request, response);

            expect(response._json).toEqual(transaction)
        })

        test("then transaction should belong to user on request", async () => {

            const transaction = {
                create: () => Promise.resolve()
            }

            const controller = new TransactionController(transaction);

            const request = { body: {}, user: { uid: "anyUserUid" } }

            await controller.create(request, response);

            expect(response._json.user).toEqual({ uid: "anyUserUid" })
        })

        test("then fail, then return error status", async () => {

            const transaction = {
                create: () => Promise.reject({ code: 500 })
            }

            const controller = new TransactionController(transaction);

            const request = { body: {}, user: { uid: "anyUserUid" } }

            await controller.create(request, response);

            expect(response._status).toEqual(500)
        })

        test("then fail, then return error", async () => {

            const transaction = {
                create: () => Promise.reject({ code: 500 })
            }

            const controller = new TransactionController(transaction);

            const request = { body: {}, user: { uid: "anyUserUid" } }

            await controller.create(request, response);

            expect(response._json).toEqual({ code: 500 })
        })
    })
})
import { authenticateToken } from "../authenticate-jwt.js";

describe("Authenticate JWT", () => {
   
    test("given no authorization header, then return error 401", () => {

        const request = {
            headers: {}
        }
        const response = new ResponseMock();
        const next = () => {};

        authenticateToken(request, response, next);

        expect(response._status).toEqual(401);
    })

    test("given authorization header, when invalid, then return error 401", async () => {

        const request = {
            headers: {
                authorization: "Invalid"
            }
        }
        const response = new ResponseMock();
        const next = () => {};
        const auth = {
            verifyIdToken: () => Promise.reject()
        }

        await authenticateToken(request, response, next, auth);

        expect(response._status).toEqual(401);
    })

    test("given authorization header, when valid, then add user to request", async () => {

        const request = {
            headers: {
                authorization: "Valid"
            }
        }
        const response = new ResponseMock();
        const next = () => {};
        const auth = {
            verifyIdToken: () => ({ sub: "anyUserUid" })
        }

        await authenticateToken(request, response, next, auth);

        expect(request.user).toEqual({ uid: "anyUserUid"});
    })

    class ResponseMock {
        _status;
        status(value) {
            this._status = value;
            return this;
        }
        json(value) {

        }
    }

})
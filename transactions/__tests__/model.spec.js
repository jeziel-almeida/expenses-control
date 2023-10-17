import { TransactionNotFoundError } from "../errors/transaction-not-found.error.js";
import { TransactionUidNotInformedError } from "../errors/transaction-uid-not-informed.error.js";
import { UserDoesntOwnTransactionError } from "../errors/user-doesnt-own-transaction.error.js";
import { UserNotInformedError } from "../errors/user-not-informed.error.js";
import { Transaction } from "../model.js";

describe("Transaction Model", () => {

    describe("given find user by uid", () => {

        test("when user is not informed, then return error 400", async () => {

            const model = new Transaction();

            const response = model.findByUser();

            await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
        })

        test("when user uid is not informed, then return error 400", async () => {

            const model = new Transaction();
            model.user = {};

            const response = model.findByUser();

            await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
        })

        test("when user is informed, then return transactions", async () => {

            const model = new Transaction(transactionRepositoryMock);

            model.user = { uid: "anyUserUid" };

            const response = model.findByUser();

            await expect(response).resolves.toEqual([
                { uid: "transaction1" }, { uid: "transaction2" }
            ]);
        })

        const transactionRepositoryMock = {
            findByUserUid: () => Promise.resolve([
                { uid: "transaction1" }, { uid: "transaction2" }
            ]),
        }
    })

    describe("given find transactions by uid", () => {

        test("when uid present, then return transaction", async () => {

            const model = new Transaction({
                findByUid: () => Promise.resolve(createTransaction())
            });

            model.uid = 1;
            model.user = { uid: "anyUserUid" }

            await model.findByUid();

            expect(model).toEqual(createTransaction())
        })

        test("when uid not present, then return error 400", async () => {

            const model = new Transaction();

            await expect(model.findByUid()).rejects.toBeInstanceOf(TransactionUidNotInformedError);
        })

        test("when user doesn't own transaction, then return 403 error", async () => {

            const transactionDb = createTransaction();
            transactionDb.user = { uid: "anyOtherUserUid" }

            const model = new Transaction({
                findByUid: () => Promise.resolve(transactionDb) 
            });
            model.uid = 9;
            model.user = { uid: "anyUserUid" }

            await expect(model.findByUid()).rejects.toBeInstanceOf(UserDoesntOwnTransactionError)
        })

        test("when transaction not found, then return error 404", async () => {

            const model = new Transaction({
                findByUid: () => Promise.resolve(null)
            });
            model.uid = 9;

            await expect(model.findByUid()).rejects.toBeInstanceOf(TransactionNotFoundError);
        })
    })

    describe("given create new transaction", () => {

        const params = {
            date: "anyDate",
            description: "anyDescription",
            money: {
                currency: "anyCurrency",
                value: 10
            },
            transactionType: "Supermercado",
            type: "expense",
            user: {
                uid: "anyUserUid"
            }
        }

        const repositoryMock = {
            _hasSaved: false,
            save() {
                this._hasSaved = true;
                return Promise.resolve({ uid: 1 });
            }
        }

        test("then return new transaction", async () => {

            const model = new Transaction(repositoryMock);

            await model.create(params);

            const newTransaction = createTransaction();

            expect(model).toEqual(newTransaction);

        })

        test("then save transaction", async () => {

            const model = new Transaction(repositoryMock);

            await model.create(params);

            expect(repositoryMock._hasSaved).toBeTruthy();

        })
    })

    function createTransaction() {
        const transaction = new Transaction();
        transaction.uid = 1;
        transaction.date = "anyDate";
        transaction.description = "anyDescription";
        transaction.money = {
            currency: "anyCurrency",
            value: 10
        }
        transaction.transactionType = "Supermercado";
        transaction.type = "expense";
        transaction.user = {
            uid: "anyUserUid"
        }
        return transaction;
    }

})
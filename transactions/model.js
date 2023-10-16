import { TransactionNotFoundError } from "./erros/transaction-not-found.error.js";
import { TransactionUidNotInformedError } from "./erros/transaction-uid-not-informed.error.js";
import { UserNotInformedError } from "./erros/user-not-informed.error.js";
import { TransactionRepository } from "./repository.js";

export class Transaction {

    uid;
    date;
    description;
    money;
    transactionType;
    type;
    user;

    #repository;

    constructor(transactionRepository) {
        this.#repository = transactionRepository || new TransactionRepository();
    }

    findByUser() {

        if(!this.user?.uid) {
            return Promise.reject(new UserNotInformedError())
        }

        return this.#repository.findByUserUid(this.user.uid);
    }
    
    findByUid() {

        if(!this.uid) {
            return Promise.reject(new TransactionUidNotInformedError());
        }

        this.#repository.findByUid(this.uid).then(transactionDb => {
            if (!transactionDb) {
                return Promise.reject(new TransactionNotFoundError());
            }
            this.date = transactionDb.date;
            this.description = transactionDb.description;
            this.money = transactionDb.money
            this.transactionType = transactionDb.transactionType;
            this.type = transactionDb.type;
            this.user = transactionDb.user;
        })
    }
}
import { TransactionRepository } from "./repository.js";


export class Transaction {

    date;
    description;
    money;
    transactionType;
    type;
    user;

    #repository;

    constructor() {
        this.#repository = new TransactionRepository();
    }

    findByUser() {

        if(!this.user?.uid) {
            return Promise.reject({
                code: 400,
                message: "Usuário não informado."
            })
        }

        return this.#repository.findByUserUid(this.user.uid);
    }
}
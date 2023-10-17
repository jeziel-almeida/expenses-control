export class TransactionUidNotInformedError extends Error {

    constructor() {
        super("Uid da transação não informado");
        this.name = "transaction-uid-not-informed";
        this.code = 400;
    }
}
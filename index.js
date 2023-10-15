import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from './middlewares/authenticate-jwt.js';
import { TransactionController } from './transactions/controller.js';

const app = express();

admin.initializeApp({
    credential: admin.credential.cert("serviceAccountKey.json")
});

const transactionController = new TransactionController();

app.get("/transactions", authenticateToken, transactionController.findByUser)

app.listen(3000, () => console.log("API Rest iniciada em http://localhost:3000"))
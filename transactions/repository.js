import admin from 'firebase-admin';

export class TransactionRepository {

    async findByUserUid(uid) {

        const snapshot = await admin.firestore()
            .collection('transactions')
            .where('user.uid', '==', uid)
            .orderBy('date', 'desc')
            .get();

        const listTransactions = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }))

        return listTransactions;
    }

    async findByUid(uid) {

        const snapshot = await admin.firestore()
            .collection('transactions')
            .doc(uid)
            .get();
            
        return snapshot.data();
    }

    async save(transaction) {

        const response = await admin.firestore()
            .collection('transactions')
            .add(JSON.parse(JSON.stringify(transaction)));

        return {
            uid: response.id
        }
    }
}
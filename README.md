# API REST Node.js com Express

## TDD - Test Driven Development

### Tecnologias utilizadas

* [Node.js](https://google.com)
* [Express](https://google.com)
* [Jest](https://google.com)

### Descrição

API REST Node.js com Express

### Endpoints

#### [GET] http://localhost:3000/transactions

Retorna todas as transações do usuário definido na header de requisição 'Authorization'

#### [GET] http://localhost:3000/transactions/uid

Retorna a transação cujo uid é passado no parâmetro 'uid', sendo a transação do usuário definido na header de requisição 'Authorization'.

#### [POST] http://localhost:3000/transactions

Salva uma nova transação no banco de dados

Corpo da requisição:

```json
{
    "money": {
        "currency": "string",
        "value": "number"
    },
    "description": "string",
    "date": "2023-10-17",
    "transactionType": "string",
    "type": "expense | income",
    "user": {
        "uid": "e1eRQqXawSYHjz5GBghRTMHrOjv1"
    }
}
```
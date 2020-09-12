const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService')

transactionRouter.get('/', async (req, res) => {
    try {
        const { period } = req.query;
        if (period === undefined)
            res.status(400).send({ "error": "É necessário informar o parâmetro \" period\", cujo o valor deve estár no formato yyyy-mm" });
        const transactions = await transactionService.getTransactions(period);
        res.send(transactions)
    } catch (error) {
        res.status(500).send(error);
    }
});


transactionRouter.get('/numLancamentos', async (req, res) => {
    try {
        const { period } = req.query;
        if (period === undefined)
            res.status(400).send({ "error": "É necessário informar o parâmetro \" period\", cujo o valor deve estár no formato yyyy-mm" });
        const transactions = await transactionService.getNumLancamentos(period);
        res.send({ "lançamentos": transactions.toString() })
    } catch (error) {
        res.status(500).send(error);
    }
});

transactionRouter.get('/receitas', async (req, res) => {
    try {
        const { period } = req.query;
        if (period === undefined)
            res.status(400).send({ "error": "É necessário informar o parâmetro \" period\", cujo o valor deve estár no formato yyyy-mm" });
        const transactions = await transactionService.getReceitas(period);
        
        res.send( transactions)
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = transactionRouter;

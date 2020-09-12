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

/*Rotas apenas para o desafio*/
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
        res.send( {receita:transactions})
    } catch (error) {
        res.status(500).send(error);
    }
});
transactionRouter.get('/despesas', async (req, res) => {
    try {
        const { period } = req.query;
        if (period === undefined)
            res.status(400).send({ "error": "É necessário informar o parâmetro \" period\", cujo o valor deve estár no formato yyyy-mm" });
        const transactions = await transactionService.getDespesas(period);
        res.send( {despesas:transactions})
    } catch (error) {
        res.status(500).send(error);
    }
});

transactionRouter.get('/saldo', async (req, res) => {
    try {
        const { period } = req.query;
        if (period === undefined)
            res.status(400).send({ "error": "É necessário informar o parâmetro \" period\", cujo o valor deve estár no formato yyyy-mm" });
        const receita = await transactionService.getReceitas(period);
        const despesa = await transactionService.getDespesas(period);
        res.send( {receita:receita - despesa})
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = transactionRouter;

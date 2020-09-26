const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService')

transactionRouter.get('/', async (req, res) => {
    try {
        const { period } = req.query;
        if (period === undefined)
            res.status(400).send({ "error": "É necessário informar o parâmetro \" period\", cujo o valor deve estár no formato yyyy-mm" });
        const transactions = await transactionService.getTransactions(period);
        res.send({
            length: transactions.length,
            transactions
        })
    } catch (error) {
        res.status(500).send(error);
    }
});
transactionRouter.post('/', async (req, res) => {
    try {
        const { description, value, category, year, month, day, type } = req.body;
        const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
        const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, '0')}`;
        const postTransactions = {
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type
        }
        const newTransaction = await transactionService.postTransactions(postTransactions);
        res.send(newTransaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

transactionRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { description, value, category, year, month, day, type } = req.body;
        const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
        const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, '0')}`;
        const putTransactions = {
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type
        }
        const updatedTransaction = await transactionService.putTransaction(id, putTransactions);
        res.send(updatedTransaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

transactionRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTransaction = await transactionService.deleteTransaction(id);
        res.send({ result: deletedTransaction, message: "Deletado com sucesso" });
    } catch (error) {

    }
})

/*Rotas apenas para o desafio*/
transactionRouter.patch('/corrigeErro', async (req, res) => {
    try {
        const transactions = await transactionService.getNumLancamentos(period);
        res.send({ "lançamentos": transactions.toString() })
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
        res.send({ receita: transactions })
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
        res.send({ despesas: transactions })
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
        res.send({ receita: receita - despesa })
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = transactionRouter;

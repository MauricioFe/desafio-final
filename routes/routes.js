const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService')

transactionRouter.get('/', async (req, res) => {
    res.send(req.query);
});


module.exports = transactionRouter;

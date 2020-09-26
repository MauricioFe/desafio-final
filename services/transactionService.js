const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

async function getTransactions(period) {
    const transactions = await TransactionModel.find({ yearMonth: period })
    return transactions;
}

async function postTransactions(transaction) {
    const newTransaction = new TransactionModel(transaction);
    await newTransaction.save();
    return newTransaction;
}

async function putTransaction(id, transaction) {
    const updatedTransaction = await TransactionModel.findByIdAndUpdate({ _id: ObjectId(id) }, transaction, { new: true })
    return updatedTransaction;
}

async function patchErro () {
    const updatedTransaction = await TransactionModel.updateMany({category: "Receita"}, {type: '+'})
    return updatedTransaction;
}

async function deleteTransaction(id) {
    const deletedTransaction = await TransactionModel.findByIdAndDelete({ _id: ObjectId(id) });
    return deletedTransaction;
}

async function getNumLancamentos(period) {
    const transactions = await TransactionModel.count({ yearMonth: period })
    return transactions;
}
async function getReceitas(period) {
    const transactions = await TransactionModel.find({ $and: [{ yearMonth: period }, { type: "+" }] })
    const receita = transactions.reduce((acc, curr) => {
        return acc + curr.value;
    }, 0)

    return receita;
}

async function getDespesas(period) {
    const transactions = await TransactionModel.find({ $and: [{ yearMonth: period }, { type: "-" }] })
    const despesas = transactions.reduce((acc, curr) => {
        return acc + curr.value;
    }, 0)

    return despesas;
}
module.exports = { getTransactions, postTransactions, putTransaction, deleteTransaction, getNumLancamentos, getReceitas, getDespesas };
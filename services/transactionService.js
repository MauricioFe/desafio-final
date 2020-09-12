const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

async function getTransactions(period){
    const transactions = await TransactionModel.find({yearMonth:period})
    return transactions;
}

async function getNumLancamentos(period){
    const transactions = await TransactionModel.count({yearMonth:period})
    return transactions;
}
async function getReceitas(period){
    const transactions = await TransactionModel.aggregate().match({yearMonth:period}, {type: "+"}).group({_id: null, total:{$sum: "$value"}})
    return transactions;
}

module.exports = {getTransactions, getNumLancamentos, getReceitas};
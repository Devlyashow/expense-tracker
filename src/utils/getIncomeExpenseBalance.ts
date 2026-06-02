import type { Transaction } from "../types";
type BalanceSummary = {
    income: number;
    expense: number;
    balance: number;
}

function getIncomeExpenseBalance(transactions: Transaction[]): BalanceSummary {
// Складываем прибыль
const income = transactions.filter((t)=>t.amount>0)
.reduce((acc, transaction)=> acc + transaction.amount,0)
// Складываем расходы
const expense = transactions.filter((t)=>t.amount<0)
.reduce((acc, transaction)=>acc + transaction.amount,0) * -1
// Считаем баланс (складываем все подряд)
const balance = transactions.reduce((acc,transaction) => acc + transaction.amount,0)
return {
    income, 
    expense,
    balance
}
}

export default getIncomeExpenseBalance
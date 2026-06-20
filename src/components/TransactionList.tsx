import TransactionItem from "./TransactionItem"
import type {Transaction} from "../types/index"

type TransactionListProps = {
title: string;
transactions: Transaction[];
sortedTransactions: Transaction[];
}

function TransactionList({title, transactions, sortedTransactions}: TransactionListProps) {
 
    // Разделяем транзакции на доходы и расходы
    const incomeTransactions = sortedTransactions.filter(t => t.amount > 0)
    const expenseTransactions = sortedTransactions.filter(t => t.amount < 0)

    return (
        <div>
            <h2>{title}</h2>
            {transactions.length === 0 && <p>Транзакций пока нет. Добавьте первую транзакцию через форму выше</p>}
            {(transactions.length !== 0 && sortedTransactions.length === 0) ?  <p>По вашему запросу ничего не найдено. Попробуйте изменить фильтр, поиск или сортировку</p> 
            : (
                <div className="transactions-columns">
                {incomeTransactions.length > 0 ? <div className="transactions-income">
                        <h3>Доходы</h3>
                        {incomeTransactions.length === 0 ? <p>Доходов нет</p> : incomeTransactions.map((transaction) => (
                            <TransactionItem
                                key={transaction.id}
                                transaction={transaction}
                            />
                        ))}
                    </div> : null}
                {expenseTransactions.length > 0 ? <div className="transactions-expense">
                        <h3>Расходы</h3>
                        {expenseTransactions.length === 0 ? <p>Расходов нет</p> : expenseTransactions.map((transaction) => (
                            <TransactionItem
                                key={transaction.id}
                                transaction={transaction}
                            />
                        ))}
                    </div> : null}
                </div>
            )}
        </div>
    )
}
export default TransactionList
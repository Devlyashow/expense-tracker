import { memo } from "react"
import { Link} from 'react-router-dom'
import { useTransactionsContext } from "../context/useTransactionsContext"
import type { Transaction } from "../types"
import formatDate from "../utils/formatDate"

type TransactionItemProps = {
    transaction: Transaction;
};

function TransactionItem({transaction}: TransactionItemProps) {
    const {deleteTransaction, categories} = useTransactionsContext()

    const {id, category, text, amount, date} = transaction
    
    const categoryObj = categories.find((obj)=>obj.key === category)
    
    const categoryName = categoryObj?.name ?? 'Неизвестная категория'
      
    return (
  <li className={amount < 0 ? "minus" : "plus"}>
    <div className="categorytext">
      <p className="category">{categoryName}</p>
      <h4 className="transaction-title">{text}</h4>
    </div>

    <div className="transaction_amount">
      <Link
        to={`/transaction/${id}/edit`}
        className="buttonHomePage edit-btn"
      >
        <img className="edit-logo" src="/edit-logo.png" alt="Редактировать" />
      </Link>

      <div className="transaction-main-info">
        <span className="transactionAmountValue">
          {amount > 0 ? "+" : ""}
          {amount}
        </span>

        <p className="transactionDate">{formatDate(date)}</p>
      </div>

      <button
        className="delete-btn"
        onClick={() => deleteTransaction(id)}
      >
        х
      </button>
    </div>
  </li>
)
}

export default memo(TransactionItem)
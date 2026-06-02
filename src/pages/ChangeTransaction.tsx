import { useParams } from 'react-router-dom'
import TransactionForm from '../components/TransactionForm'
import { useTransactionsContext } from '../context/useTransactionsContext'   
import {useBackToLastPage} from '../hooks/useBackToLastPage'

export default function ChangeTransaction() {
    
    const { transactions, editTransaction } = useTransactionsContext();
    
    const {transactionId} = useParams()
    if (!transactionId) {
        return <div>Некорректный id транзакции</div>
    }

    const transaction = transactions.find(
        (obj)=>obj.id===String(transactionId))
    
    if (!transaction) {
        return <div>Транзакция не найдена</div>
    }

    
    const initialData = {
        id: String(transaction.id),
        category: transaction.category,
        text: transaction.text,
        amount: String(Math.abs(transaction.amount)),
        date: transaction.date
    }

    const { backToLastPage, goToHome } = useBackToLastPage()


  return (
    <div>
        <TransactionForm
        initialData={initialData}
        mode="edit"
        onSubmit={editTransaction}
        backToLastPage={backToLastPage}/>
        <div className='aboutPageButtons'>
            <button onClick={backToLastPage}>Назад</button>
            <button onClick={goToHome}>На главную</button>
        </div>
    </div>
  )
}

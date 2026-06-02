import TransactionForm from "./TransactionForm"
import getLocalDateString  from "../utils/getLocalDateString"
import { useTransactionsContext } from "../context/useTransactionsContext"  

function AddTransaction() {
    const {addTransaction} = useTransactionsContext()
    const mode = 'create'
    const tooday = new Date()


    const initialData = {
        category: "",
        text: '',
        amount: '',
        date: getLocalDateString(tooday)
    }
    
    return (
    <div>
        <TransactionForm
        mode={mode}
        onSubmit={addTransaction} 
        initialData={initialData}
        />
    </div>
        )
}

export default AddTransaction
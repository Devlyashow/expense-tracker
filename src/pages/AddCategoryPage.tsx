import { Link } from 'react-router-dom';
import type { Category, CategoryFormData, CreateCategoryData, Transaction } from '../types';
import CategoryForm from '../components/CategoryForm';


type AddCategoryPageProps = {
  categories: Category[];
  transactions: Transaction[];
  deleteCategory: (id: string) => void;
  addCategory: (newCategory: CreateCategoryData) => void;
}

export default function AddCategoryPage({categories, transactions, deleteCategory, addCategory}:AddCategoryPageProps) {

    const initialData: CategoryFormData = {
        text: '',
        incomeOrExpense: null,
    }

    function hasTransactionsWithThisCategory (id: string) {
        const category = categories.find(cat=>cat.id===id)
        if (!category) return false
        return transactions.some(txn => txn.category === category.key)
    }

    function handleCreateCategory(data:CategoryFormData) {
        if (!data.incomeOrExpense) return

        const newCategory: CreateCategoryData = {
            key: crypto.randomUUID(),
            name: data.text,
            type: data.incomeOrExpense,
        }
    addCategory(newCategory)
    }

    const income = categories.filter(obj=>obj.type==='income')
    const expense = categories.filter(obj=>obj.type==='expense')
    
return (
    <div>
        <div className='categoryPage_income-expense'>
            <div className='categoryPage_income'>
            <label className='categoryPage_income_label'>Доходы</label>
                {income.length === 0? <div className='categoryPage_expense_help'>Добавьте статью доходов</div> : (income.map(categoryObj => {

                const isCategoryUsed = hasTransactionsWithThisCategory(categoryObj.id)

                return (
                    <div className='categoryPage_card categoryPage_card_income' key={categoryObj.key}>
                    <div className='categoryPage_card_name-delete'>
                        <span title={isCategoryUsed ? 'Нельзя удалить категорию, потому что с ней есть транзакции' : ''}>
                            <button
                                onClick={() => deleteCategory(categoryObj.id)}
                                disabled={isCategoryUsed}
                            >
                                X
                            </button>
                            </span>
                        <p>{categoryObj.name}</p>
                    </div>

                    <Link
                        to={`/category/${categoryObj.id}/edit`}
                        className='buttonHomePage edit-btn'
                    >
                        <img className="edit-logo" src='edit-logo.png' />
                    </Link>
                    </div>
                )
                }))}        
            </div>
        
            <div className='categoryPage_expense'>
            <label className='categoryPage_expense_label'>Расходы</label>
                {expense.length === 0? <div className='categoryPage_expense_help'>Добавьте статью расходов</div> : (expense.map(categoryObj => {

                const isCategoryUsed = hasTransactionsWithThisCategory(categoryObj.id)

                return (
                    <div className='categoryPage_card categoryPage_card_expense' key={categoryObj.key}>
                    <div className='categoryPage_card_name-delete'>
                       <span title={isCategoryUsed ? 'Нельзя удалить категорию, потому что с ней есть транзакции' : ''}>
                            <button
                                onClick={() => deleteCategory(categoryObj.id)}
                                disabled={isCategoryUsed}
                            >
                                X
                            </button>
                            </span>
                        
                        <p>{categoryObj.name}</p>
                    </div>

                    <Link
                        to={`/category/${categoryObj.id}/edit`}
                        className='buttonHomePage edit-btn'
                    >
                        <img className="edit-logo" src='/edit-logo.png' />
                    </Link>
                    </div>
                )
                }))} 
            </div>
                    
        </div>

        <CategoryForm
        initialData={initialData}
        onSubmit={handleCreateCategory}
        mode='create'
        />
    </div>
)
}

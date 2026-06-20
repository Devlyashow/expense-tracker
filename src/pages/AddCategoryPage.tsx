import { useState } from 'react';
import { Link } from 'react-router-dom';
import type {
  Category,
  CategoryFormData,
  CategoryType,
  CreateCategoryData,
  Transaction
} from '../types';
import CategoryForm from '../components/CategoryForm';
import ButtonsBottom from '../components/ButtonsBottom'

type AddCategoryPageProps = {
  categories: Category[];
  transactions: Transaction[];
  deleteCategory: (id: string) => void;
  addCategory: (newCategory: CreateCategoryData) => void;
}

export default function AddCategoryPage({categories, transactions, deleteCategory, addCategory}:AddCategoryPageProps) {


    function getInitialData(type: CategoryType): CategoryFormData {
        return {
            text: '',
            incomeOrExpense: type,
        }
    }

    const [activeCreateType, setActiveCreateType] = useState<CategoryType | null>(null)

    function hasTransactionsWithThisCategory (id: string) {
        const category = categories.find(cat=>cat.id===id)
        if (!category) return false
        return transactions.some(txn => txn.category === category.key)
    }

    function handleCreateCategory(data: CategoryFormData) {
  if (!activeCreateType) return

  const newCategory: CreateCategoryData = {
    key: crypto.randomUUID(),
    name: data.text,
    type: activeCreateType,
  }

  addCategory(newCategory)
  setActiveCreateType(null)
}
       
    const income = categories.filter(obj=>obj.type==='income')
    const expense = categories.filter(obj=>obj.type==='expense')
    
return (
    <div>
        <section className="category-page-header">
            <p className="category-page-badge">Категории</p>

            <h2>Управление категориями</h2>

            <p>
                Создавайте собственные категории доходов и расходов. 
                Категории используются при добавлении транзакций и помогают точнее анализировать статистику.
            </p>
        </section>
        <div className='categoryPage_income-expense'>
            <div className='categoryPage_income'>
                <label className='categoryPage_income_label'>Доходы</label>
                <div className="category-create-area">
  {activeCreateType !== 'income' && (
    <button
      type="button"
      className="category-create-btn category-create-btn-income"
      onClick={() => {setActiveCreateType('income')}}>
      + Добавить доход
    </button>
  )}

  {activeCreateType === 'income' && (
    <div className="category-inline-form">
      <CategoryForm
        key="income"
        initialData={getInitialData('income')}
        onSubmit={handleCreateCategory}
        mode="create"
        isTypeFixed={true}
      />

      <button
        type="button"
        className="category-cancel-btn"
        onClick={() => setActiveCreateType(null)}
      >
        Отмена
      </button>
    </div>
  )}
</div>
                    {income.length === 0? <div className='categoryPage_expense_help'>Добавьте статью доходов</div> : (income.map(categoryObj => {

                    const isCategoryUsed = hasTransactionsWithThisCategory(categoryObj.id)

                    return (
                        <div className='categoryPage_card categoryPage_card_income' key={categoryObj.key}>
                            <div className='categoryPage_card_name-delete'>
                                <span title={isCategoryUsed ? 'Нельзя удалить категорию, потому что с ней есть транзакции' : ''}>
                                    <button
                                        className="category-delete-btn"
                                        onClick={() => deleteCategory(categoryObj.id)}
                                        disabled={isCategoryUsed}
                                        aria-label={`Удалить категорию ${categoryObj.name}`}
                                    >
                                        ×
                                    </button>
                                </span>
                                <p className="categoryPage_card_name">{categoryObj.name}</p>
                            </div>
                            <Link
                                to={`/category/${categoryObj.id}/edit`}
                                className='buttonHomePage edit-btn'
                                aria-label={`Редактировать категорию ${categoryObj.name}`}
                            >
                                <img className="edit-logo" src='/edit-logo.png' />
                            </Link>
                        </div>
                            )
                                    }))}    
                    
            </div>
        
            <div className='categoryPage_expense'>
            <label className='categoryPage_expense_label'>Расходы</label>
            <div className="category-create-area">
  {activeCreateType !== 'expense' && (
    <button
      type="button"
      className="category-create-btn category-create-btn-expense"
      onClick={() => setActiveCreateType('expense')}
    >
      + Добавить расход
    </button>
  )}

  {activeCreateType === 'expense' && (
    <div className="category-inline-form">
      <CategoryForm
        key="expense"
        initialData={getInitialData('expense')}
        onSubmit={handleCreateCategory}
        mode="create"
        isTypeFixed={true}
      />

      <button
        type="button"
        className="category-cancel-btn"
        onClick={() => setActiveCreateType(null)}
      >
        Отмена
      </button>
    </div>
  )}
</div>
                {expense.length === 0? <div className='categoryPage_expense_help'>Добавьте статью расходов</div> : (expense.map(categoryObj => {
                const isCategoryUsed = hasTransactionsWithThisCategory(categoryObj.id)

                return (
                    <div className='categoryPage_card categoryPage_card_expense' key={categoryObj.key}>
                            <div className='categoryPage_card_name-delete'>
                                <span title={isCategoryUsed ? 'Нельзя удалить категорию, потому что с ней есть транзакции' : ''}>
                                    <button
                                        className="category-delete-btn"
                                        onClick={() => deleteCategory(categoryObj.id)}
                                        disabled={isCategoryUsed}
                                        aria-label={`Удалить категорию ${categoryObj.name}`}
                                    >
                                        ×
                                    </button>
                                </span>
                                <p className="categoryPage_card_name">{categoryObj.name}</p>
                            </div>
                            <Link
                                to={`/category/${categoryObj.id}/edit`}
                                className='buttonHomePage edit-btn'
                                aria-label={`Редактировать категорию ${categoryObj.name}`}
                            >
                                <img className="edit-logo" src='/edit-logo.png' />
                            </Link>
                        </div>
                )
                }))} 
            </div>
                    
        </div>
        <ButtonsBottom/>
    </div>
)
}

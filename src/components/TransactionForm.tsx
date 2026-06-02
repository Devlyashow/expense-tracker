import { useState, useRef } from 'react'
import {useTransactionsContext} from '../context/useTransactionsContext'
import type { Transaction,CreateTransactionData} from '../types'
import {useBackToLastPage} from '../hooks/useBackToLastPage'


type ModeType = 'create' | 'edit'
type TransactionFormData = {
    id?: string;
    category: string;
    text: string;
    amount: string;
    date: string;
}
type TransactionFormBaseProps = {
  initialData: TransactionFormData;
};

type TransactionFormCreateProps = TransactionFormBaseProps & {
  mode: 'create';
  onSubmit: (transaction: CreateTransactionData) => void | Promise<void>;
};

type TransactionFormEditProps = TransactionFormBaseProps & {
  mode: 'edit';
  onSubmit: (transaction: Transaction) => void | Promise<void>;
};

type TransactionFormProps =
  | TransactionFormCreateProps
  | TransactionFormEditProps;


type TransactionFormErrors  = {
    category: string;
    text: string;
    amount: string;
    date: string;
};

type TransactionFormField = keyof TransactionFormErrors;

export default function TransactionForm({ mode, onSubmit, initialData}: TransactionFormProps) {
    const {categories} = useTransactionsContext()
    const {backToLastPage} = useBackToLastPage()
    const [formData, setFormData] = useState<TransactionFormData>(initialData)
    const [error, setError] = useState<TransactionFormErrors>({category: '',text: '',amount: '', date: ''})
    const selectedCategoryObject = categories.find(
category => category.key === formData.category
)
    const selectRef = useRef<HTMLSelectElement | null>(null)

    function focusSelect() {
            selectRef.current?.focus()
    }
    const isFormValid =
        Boolean(selectedCategoryObject) &&
        formData.text.trim() !== '' &&
        formData.amount !== '' &&
        Number(formData.amount) !== 0 &&
        formData.date !== ''

    function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const {name, value} = e.target
        const fieldName = name as TransactionFormField

    setFormData(prev => ({
        ...prev,
        [fieldName]: value
    }))

    setError(prev => ({
        ...prev,
        [fieldName]: ''
    }))
    }

    // Кнопка "добавить"
    function handleSubmit (e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
     const newErrors: TransactionFormErrors = {
    category: '',
    text: '',
    amount: '',
    date: ''
    }
        if (formData.category === '') {
            newErrors.category = 'Выберите категорию'
        }
        if (formData.text.trim() === "") {
            newErrors.text = 'Введите название транзакции'
        }
        if (formData.amount === "") {
            newErrors.amount = 'Введите сумму'
        }
        if (Number(formData.amount) === 0) {
            newErrors.amount = 'Сумма не должна быть равна 0'
        }
        if (formData.date === '') {
            newErrors.date = 'Выберите дату'
        }
        if (!selectedCategoryObject) {
            newErrors.category = 'Выберите корректную категорию'
        }
        if (Object.values(newErrors).some(errorMessage => errorMessage !== '')) {
        setError(newErrors)
        return
        }
        if (!selectedCategoryObject) return

        const numericAmount = Math.abs(Number(formData.amount))
        const finalAmount = selectedCategoryObject.type === 'income'
  ? numericAmount
  : -numericAmount

        

        if (mode === 'create') {
            const newTransaction: CreateTransactionData = {
            category: formData.category,
            text: formData.text.trim(), 
            amount: finalAmount,
            date: formData.date
        }
            onSubmit(newTransaction) 
            setFormData({
            category: '',
            text: '',
            amount: '',
            date: ''
        })
            focusSelect()
        }

        if (mode === 'edit') {
            if (initialData.id === undefined) return

            const updatedTransaction: Transaction = {
                ...initialData,
                id: initialData.id,
                category: formData.category,
                text: formData.text.trim(),
                amount: finalAmount,
                date: formData.date
            }
            onSubmit(updatedTransaction)
            backToLastPage?.()
        }
        
            setError({
                category: '',
                text: '',
                amount: '',
                date: ''
            })
        }

  return (
    <div>
        {mode === 'create' && <h3>Добавить транзакцию</h3>}
        {mode === 'edit' && <h3>Изменить транзакцию</h3>}
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="category">Категория</label>
                <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                ref={selectRef}>
                    <option value="">Выберите категорию</option>
                    {categories.map((obj)=>{
                     return <option key={obj.id}  value={obj.key}>{obj.name}</option>
                    })}
                </select>
                {categories.length === 0 && <p className="error">Добавьте категорию на странице с категориями</p>}
                {error.category && <p className="error">{error.category}</p>}
            </div>

            <div className="form-control">
                <label htmlFor="text">Название</label>
                <input
                id="text"
                name="text"
                type="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="Например: Зарплата"
                />
                {error.text && <p className="error">{error.text}</p>}
            </div>

            <div className="form-control">
                    <label htmlFor="amount">Сумма</label>
                    <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Введите сумму"
                    />
                {error.amount && <p className="error">{error.amount}</p>}
            </div>
            <div className="form-control">
                <label htmlFor="date">Дата</label>
                <input
                id='date'
                name='date'
                type='date'
                value={formData.date}
                onChange={handleChange}
                />
                {error.date && <p className="error">{error.date}</p>}
            </div>
                <button disabled={!isFormValid} type='submit'>
                        { mode === 'create' ? 'Добавить транзакцию' : 'Сохранить изменения'}
                </button>
        </form>
        
    </div>
  )
}

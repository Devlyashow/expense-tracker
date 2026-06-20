import { useState } from 'react';
import type {ChangeEvent, SubmitEvent } from 'react'
import type {CategoryFormData, CategoryFormMode, CategoryType} from '../types'

type CategoryFormProps = {
  initialData: CategoryFormData;
  mode: CategoryFormMode;
  onSubmit: (data: CategoryFormData) => void;
  hasTransactionsWithThisCategory? : boolean;
  isTypeFixed?: boolean
}

export default function CategoryForm({initialData, mode, onSubmit, hasTransactionsWithThisCategory, isTypeFixed}:CategoryFormProps)
{
    const [formData, setFormData] = useState<CategoryFormData>(initialData)
    const [error, setError] = useState('')

            function handleChange(e: ChangeEvent<HTMLInputElement>) {
                 const { name, value } = e.target
        
            if (name === 'incomeOrExpense') {
                setFormData(prev => ({
                    ...prev,
                    incomeOrExpense: value as CategoryType
                }))
                setError('')
                return
            }
        
            setFormData(prev => ({
                ...prev,
                text: value
            }))
        
            setError('')
            }
        
            function handleSubmit(e: SubmitEvent <HTMLFormElement>) {
                e.preventDefault()
                setError('')
                if (!formData.text.trim()) return setError('Добавьте название категории')
                if (!formData.incomeOrExpense) return setError('Выберите статью доход/расход')
                onSubmit({
                    text: formData.text.trim(),
                    incomeOrExpense: formData.incomeOrExpense})
                if (mode === 'create') {
                    setFormData({
                        text: '',
                        incomeOrExpense: isTypeFixed ? formData.incomeOrExpense : null
                    })
                }
            }
            const isCategoryTypeDisabled =
                mode === 'edit' && Boolean(hasTransactionsWithThisCategory)


  return (
    <div className='categoryPage_form'>
                <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Впишите название категории</label>
                    <input
                    id="text"
                    name="text"
                    type="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="Например: Зарплата"
                    />
                </div>
                <div className='incomeOrExpense'>
                    <label htmlFor="income">
                        Доходы
                        <input 
                        id="income"
                        type='radio' 
                        name='incomeOrExpense' 
                        value="income"
                        disabled={isCategoryTypeDisabled || isTypeFixed}
                        checked={formData.incomeOrExpense === 'income'}
                        onChange={handleChange}></input>
                    </label>
                    
                    <label htmlFor="expense">
                        Расходы
                        <input 
                        id="expense"
                        type='radio' 
                        name='incomeOrExpense' 
                        value="expense"
                        disabled={isCategoryTypeDisabled || isTypeFixed}
                        checked={formData.incomeOrExpense === 'expense'}
                        onChange={handleChange}></input>
                        </label>
                </div>
                {isCategoryTypeDisabled && (
                <p className="help">
                    Тип категории нельзя изменить, потому что с ней уже есть транзакции
                </p>
                )}
                <button className='categoryPage_form_button'>{mode === 'create' ? 'Добавить категорию' : 'Обновить категорию'}</button>
                <div className='aboutPageButtons'>
                </div>
                {error? <p className='error'>{error}</p> : null}
                
                </form>
        </div>
  )
}

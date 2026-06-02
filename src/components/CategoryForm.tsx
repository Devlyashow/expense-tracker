import { useState } from 'react';
import type {ChangeEvent, SubmitEvent } from 'react'
import type {CategoryFormData, CategoryFormMode, CategoryType} from '../types'

type CategoryFormProps = {
  initialData: CategoryFormData;
  mode: CategoryFormMode;
  onSubmit: (data: CategoryFormData) => void;
  hasTransactionsWithThisCategory? : boolean;
}

export default function CategoryForm({initialData, mode, onSubmit, hasTransactionsWithThisCategory}:CategoryFormProps)
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
                        incomeOrExpense: null
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
                    <label htmlFor="income">Доходы</label>
                    <input 
                    id="income"
                    type='radio' 
                    name='incomeOrExpense' 
                    value="income"
                    disabled={isCategoryTypeDisabled}
                    checked={formData.incomeOrExpense === 'income'}
                    onChange={handleChange}></input>
                    <label htmlFor="expense">Расходы</label>
                    <input 
                    id="expense"
                    type='radio' 
                    name='incomeOrExpense' 
                    value="expense"
                    disabled={isCategoryTypeDisabled}
                    checked={formData.incomeOrExpense === 'expense'}
                    onChange={handleChange}></input>
                </div>
                {isCategoryTypeDisabled && (
                <p className="help">
                    Тип категории нельзя изменить, потому что с ней уже есть транзакции
                </p>
                )}
                <button className='categoryPage_form_button'>{mode === 'create' ? 'Добавить категорию' : 'Обновить категорию'}</button>
            </form>
        {error? <p className='error'>{error}</p> : null}
        </div>
  )
}

import { useEffect, useState, useCallback } from 'react'
import type { Transaction, Category, CreateCategoryData, CreateTransactionData } from '../types'
import {
    getCategoriesFromSupabase,
    getTransactionsFromSupabase,
    createCategoryFromSupabase,
    updateCategoryFromSupabase,
    deleteCategoryFromSupabase,
    createTransactionFromSupabase,
    updateTransactionFromSupabase,
    deleteTransactionFromSupabase
} from '../services/supabaseApi'


export default function useExpenseTrackerData() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [dataError, setDataError] = useState<string | null>(null)

  useEffect(() => {
    async function loadInitialData() {
      setDataLoading(true)
      setDataError(null)

      try {
        const [apiTransactions, apiCategories] = await Promise.all([
          getTransactionsFromSupabase(),
          getCategoriesFromSupabase(),
        ])

        setTransactions(apiTransactions)
        setCategories(apiCategories)
      } catch (err) {
        if (err instanceof Error) {
          setDataError(err.message)
        } else {
          setDataError('Неизвестная ошибка')
        }
      } finally {
        setDataLoading(false)
      }
    }

    loadInitialData()
  }, [])
// Функция, добавляющая категорию
  async function addCategory(newCategory: CreateCategoryData) {
    try {
      const createdCategory = await createCategoryFromSupabase(newCategory)
  
      setCategories(prevCategories => [
        ...prevCategories,
        createdCategory
      ])
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error('Неизвестная ошибка')
      }
    }
  }
// Функция удаляющая категорию
  const deleteCategory = useCallback(async (id: string) => {
    try {
      await deleteCategoryFromSupabase(id)
  
      setCategories(prevCategories =>
        prevCategories.filter(category => category.id !== id)
      )
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error('Неизвестная ошибка')
      }
    }
  }, [])

// Функция изменяющая категорию
  async function editCategory(updatedCategory: Category) {
    try {
    const savedCategory = await updateCategoryFromSupabase(updatedCategory)

    setCategories(prevCategories =>
    prevCategories.map(category =>
        category.id === savedCategory.id ? savedCategory : category
     )
    )
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error('Неизвестная ошибка')
      }
    }
  }

// Функция, добавляющая транзакцию
  async function addTransaction(newTransaction: CreateTransactionData) {
    try {
       const createdTransaction = await createTransactionFromSupabase(newTransaction)
      setTransactions(prevTransactions => [...prevTransactions, createdTransaction])
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error('Неизвестная ошибка')
      }
    }
  }

// Функция изменяющая транзакцию
async function editTransaction(updatedTransaction: Transaction) {
  try {
    const updated = await updateTransactionFromSupabase(updatedTransaction)
    setTransactions(prevTransactions=>{
      return prevTransactions.map((trans)=>{
      if (trans.id===updated.id) {
        return updated
      } else return trans})
})
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Неизвестная ошибка')
    }
  }}

  // Функция, удаляющая транзакцию
const deleteTransaction = useCallback(async (id: string)=>{
  try {
    await deleteTransactionFromSupabase(id)

    setTransactions(prevTransactions =>
    prevTransactions.filter(transaction => transaction.id !== id))
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('Неизвестная ошибка')
    }
  }
}, [])

  return {
    transactions,
    categories,
    dataLoading,
    dataError,
    addCategory,
    deleteCategory,
    editCategory,
    addTransaction,
    editTransaction,
    deleteTransaction,
  }
}
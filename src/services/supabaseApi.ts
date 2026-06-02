import type { Category, Transaction, CreateCategoryData, CreateTransactionData } from '../types'
import { supabase } from './supabaseClient'
// Получитть категории из базы
export async function getCategoriesFromSupabase(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, key, name, type')

  if (error) {
    throw new Error('Не удалось загрузить категории')
  }

  return data
}
// Получить транзакции из базы
export async function getTransactionsFromSupabase(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('id, category, text, amount, date')

  if (error) {
    throw new Error('Не удалось загрузить транзакции')
  }

  return data
}
// Создать категорию в базе
export async function createCategoryFromSupabase(
  category: CreateCategoryData
): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select('id, key, name, type')
    .single()

  if (error) {
    throw new Error('Не удалось создать категорию')
  }

  return data
}
// Редактировать категорию в базе
export async function updateCategoryFromSupabase(
  category: Category
): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .update({
      name: category.name,
      type: category.type,
    })
    .eq('id', category.id)
    .select('id, key, name, type')
    .single()

  if (error) {
    throw new Error('Не удалось обновить категорию')
  }

  return data
}
// Удаление категории из базы
export async function deleteCategoryFromSupabase(id: string): Promise<void> {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error('Не удалось удалить категорию')
  }
}
// Создать транзакцию в базе
export async function createTransactionFromSupabase(
  transaction: CreateTransactionData
): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select('id, category, text, amount, date')
    .single()

  if (error) {
    throw new Error('Не удалось создать транзакцию')
  }

  return data
}
// Изменить транзакцию
export async function updateTransactionFromSupabase(
  transaction: Transaction
): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .update({
        category: transaction.category,
        text: transaction.text,
        amount: transaction.amount,
        date: transaction.date,
    })
    .eq('id', transaction.id)
    .select('id, category, text, amount, date')
    .single()

  if (error) {
    throw new Error('Не удалось обновить транзакцию')
  }

  return data
}
//Удаление транзакции из базы
export async function deleteTransactionFromSupabase(id: string): Promise<void> {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error('Не удалось удалить транзакцию')
  }
}
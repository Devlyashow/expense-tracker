import { useState, useMemo} from 'react'
import getReadyTransactions from '../utils/getReadyTransactions'
import type { Transaction, Category } from '../types'
import type { SortOption } from '../constants/sortNames'

export default function useTransactionsFilters(transactions:Transaction[], categories: Category[]) {
// state Фильтр списка по категории
const [selectedCategory, setSelectedCategory] = useState<string>("all")
// state Поиска транзакции в категории
const [searchTerm, setSearchTerm] = useState<string>("")
// state Сортировка списка
const [sortOption, setSortOption] = useState<SortOption>("newest")
// Отфильтрованный и отсортированный список транзакций
const readyTransactions = useMemo(()=>{
return getReadyTransactions(
    transactions,
    selectedCategory,
    searchTerm,
    sortOption,
    categories)
}, [transactions, selectedCategory, searchTerm, sortOption, categories]) 
// Функция, сбрасывающая фильтры
function resetFilters() {
  setSelectedCategory("all")
  setSearchTerm('')
  setSortOption('newest')
}

  return {selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, sortOption, setSortOption, readyTransactions, resetFilters}
}

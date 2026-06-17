import type { Transaction, Category } from "../types"
import type { SortOption } from "../constants/sortNames"

function getReadyTransactions(transactions: Transaction[], selectedCategory: string, searchTerm: string, sortOption: SortOption, categories: Category[]): Transaction[] {

    const categoryFilteredTransactions = selectedCategory === 'all' ? transactions : 
    transactions.filter(transaction=>transaction.category === selectedCategory)
    // Поиск транзакции в категории 
    const filteredTransactions = categoryFilteredTransactions.filter((transaction)=>{
      return transaction.text.toLowerCase().includes(searchTerm.toLowerCase())
    })
    const sortedTransactions = [...filteredTransactions].sort((a,b)=>{

    const textA = a.text.toLowerCase()
    const textB = b.text.toLowerCase()

    const categoryObjA = categories.find((obj)=>obj.key===a.category)
    const categoryNameA = categoryObjA?.name ?? 'Неизвестная категория'

    const categoryObjB = categories.find((obj)=>obj.key===b.category)
    const categoryNameB = categoryObjB?.name ?? 'Неизвестная категория'

    const categoryA = categoryNameA.toLowerCase()
    const categoryB = categoryNameB.toLowerCase()

  if (sortOption === "amount-desc") {
    return b.amount - a.amount
  }

  if (sortOption === "amount-asc") {
    return a.amount - b.amount
  }
  if (sortOption === "name-az") {
    return textA.localeCompare(textB)
  }
  
  if (sortOption === "name-za") {
    return textB.localeCompare(textA)
  }
  if (sortOption === "category-az") {
    return categoryA.localeCompare(categoryB)
  }
  
  if (sortOption === "category-za") {
    return categoryB.localeCompare(categoryA)
  }
  
  return b.id - a.id
})
  return sortedTransactions
}

export default getReadyTransactions
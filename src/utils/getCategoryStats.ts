import type { Transaction, Category, CategoryStatsItem, CategoryType } from '../types'

export default function getCategoryStats(
    transactions: Transaction[],
    categories: Category[],
    categoryType: CategoryType): CategoryStatsItem[] {
 if (categoryType === 'income') {
    const incomeTransactions = transactions.filter(t => t.amount > 0)
    const incomeCategories = categories.filter(c => c.type === 'income')
    const totalIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0)
    const incomeStats = incomeCategories.map(category => {
        const categoryTransactions = incomeTransactions.filter(t => t.category === category.key && t.amount > 0)
        const totalAmount = categoryTransactions.reduce((acc, t) => acc + t.amount, 0)
        const percent = totalIncome === 0 ? 0 : (totalAmount / totalIncome) * 100
            return {
                categoryKey: category.key,
                name: category.name,
                value: totalAmount,
                percent: Number(percent.toFixed(2))
            }
        }).filter(stat => stat.value > 0)
    
    return incomeStats
}

if (categoryType === 'expense') {
    const expenseTransactions = transactions.filter(t => t.amount < 0)
    const expenseCategories = categories.filter(c => c.type === 'expense')
    const totalExpense = Math.abs(expenseTransactions.reduce((acc, t) => acc + t.amount, 0))
    const expenseStats = expenseCategories.map(category => {
        const categoryTransactions = expenseTransactions.filter(t => t.category === category.key && t.amount < 0)
        const totalAmount = Math.abs(categoryTransactions.reduce((acc, t) => acc + t.amount, 0))
        const percent = totalExpense === 0 ? 0 : (totalAmount / totalExpense) * 100
        return {
            categoryKey: category.key,
            name: category.name,
            value: totalAmount,
            percent: Number(percent.toFixed(2))
        }
    }).filter(stat => stat.value > 0)
    
    return expenseStats
 }

 return []
} 
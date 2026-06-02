import Header from "../components/Header"
import BalanceDisplay from "../components/BalanceDisplay"
import AddTransaction from "../components/AddTransaction"
import TransactionList from "../components/TransactionList"
import CategoryFilter from "../components/CategoryFilter"
import TransactionSearch from "../components/TransactionSearch"
import TransactionSort from '../components/TransactionSort'
import sortNames from '../constants/sortNames'
import useTransactionsUrlSync from '../hooks/useTransactionsUrlSync'
import type { Transaction, Category } from "../types"
import type { Dispatch, SetStateAction, RefObject } from "react"
import type { SortOption } from "../constants/sortNames"

type TransactionsPageProps = {
balance: number,
filteredBalance: number,
selectedCategory: string,
income: number,
expense: number,
setSelectedCategory: Dispatch<SetStateAction<string>>,
searchTerm: string,
setSearchTerm: Dispatch<SetStateAction<string>>,
sortOption: SortOption,
setSortOption: Dispatch<SetStateAction<SortOption>>,
hasActiveFilters: boolean,
resetFilters: ()=>void,
readyTransactions: Transaction[],
transactions: Transaction[],
searchInputRef: RefObject<HTMLInputElement | null>,
defaultFilters: {
  category: boolean,
  search: boolean,
  sort: boolean,
}
categories: Category[]
}

export default function TransactionsPage({
balance,
filteredBalance,
selectedCategory,
income,
expense,
setSelectedCategory,
searchTerm,
setSearchTerm,
sortOption,
setSortOption,
hasActiveFilters,
resetFilters,
readyTransactions,
transactions,
searchInputRef,
defaultFilters,
categories}: TransactionsPageProps) {

    const { from } = useTransactionsUrlSync({
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  sortNames
})
 
  return (
    <div>
    {from==='home'? <p>Открыто из: главной</p> : null }
    {from==='about'? <p>Открыто из: страницы "О приложении"</p> : null }
    <Header title="Учёт доходов и расходов"/>
    <BalanceDisplay 
      balance={balance}
      income={income}
      expense={expense}
    />
    {defaultFilters.category && (
      <div className="balance-container balance-category-container">
        <div className={`balance-total ${filteredBalance > 0 ? 'balance-positive' : ''} ${filteredBalance < 0 ? 'balance-negative' : ''} ${filteredBalance === 0 ? 'balance-zero' : ''}`}>
          <h3>Баланс по категории</h3>
          <p className="balance-category-name">
            {categories.find(c => c.key === selectedCategory)?.name}
          </p>
          <p className="balance-value">{filteredBalance === 0 ? 0 : `${filteredBalance > 0 ? '+' : ''}${filteredBalance}`}</p>
        </div>
      </div>
    )}
    <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <TransactionSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchInputRef={searchInputRef}
      />
      <p className="results-count">
          Найдено транзакций: {readyTransactions.length}
      </p>
      <TransactionSort
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      {hasActiveFilters && (
        <button className='filters-clear' onClick={resetFilters}>Сбросить фильтры</button>
      )}
      <TransactionList
      title='Список транзакций'
      transactions={transactions}
      sortedTransactions={readyTransactions}
      />
      <AddTransaction/>
    </div>
  )
}

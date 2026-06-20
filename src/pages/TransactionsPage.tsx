import Header from "../components/Header"
import BalanceDisplay from "../components/BalanceDisplay"
import AddTransaction from "../components/AddTransaction"
import TransactionList from "../components/TransactionList"
import CategoryFilter from "../components/CategoryFilter"
import TransactionSearch from "../components/TransactionSearch"
import TransactionSort from '../components/TransactionSort'
import sortNames from '../constants/sortNames'
import useTransactionsUrlSync from '../hooks/useTransactionsUrlSync'
import PeriodFilter from "../components/PeriodFilter"
import ButtonsBottom from "../components/ButtonsBottom"
import type { Transaction, Category } from "../types"
import type { Dispatch, SetStateAction, RefObject } from "react"
import type { SortOption } from "../constants/sortNames"
import type { PeriodPreset } from "../types"
import { useNavigateInApp} from '../hooks/useNavigateInApp'

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
categories: Category[],
dateFrom: string,
dateTo: string,
periodPreset: PeriodPreset,
error: string,
title: string,
setDateFrom: Dispatch<React.SetStateAction<string>>,
setDateTo: Dispatch<React.SetStateAction<string>>,
setPeriodPreset: Dispatch<React.SetStateAction<PeriodPreset>>
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
categories,
dateFrom,
dateTo,
periodPreset,
error,
title,
setDateFrom,
setDateTo,
setPeriodPreset
}: TransactionsPageProps) {

    const { from } = useTransactionsUrlSync({
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  sortNames
})
    const {goToCategories} = useNavigateInApp()
  
  return (
    <div>
    <Header title="Учёт доходов и расходов"/>
    {categories.length === 0 && <div className="whenCategoriesZero">
      <p className="error">Сначала нужно создать категории доходов и расходов</p>
      <button type="button" onClick={goToCategories}>Создать категории</button>
      </div>}
    <PeriodFilter
    dateFrom={dateFrom}
    dateTo={dateTo}
    periodPreset={periodPreset}
    error={error}
    setDateFrom={setDateFrom}
    setDateTo={setDateTo}
    setPeriodPreset={setPeriodPreset}
    title={title}
    />
    <BalanceDisplay 
      balance={balance}
      income={income}
      expense={expense}
    />

    <AddTransaction/>

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
      <ButtonsBottom
      fromTransaction={true}
      />
    </div>
  )
}

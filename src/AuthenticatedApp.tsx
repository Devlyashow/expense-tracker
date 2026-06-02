import './App.css'
import useTransactionsFilters from './hooks/useTransactionsFilters'
import getIncomeExpenseBalance from './utils/getIncomeExpenseBalance'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import TransactionsPage from './pages/TransactionsPage'
import AddCategoryPage from './pages/AddCategoryPage'
import StatisticsPage from './pages/StatisticsPage'
import ChangeTransaction from './pages/ChangeTransaction'
import ChangeCategoryPage from './pages/ChangeCategoryPage'
import TransactionsProvider from './context/TransactionsProvider'
import {useEffect, useRef, useMemo, useState} from "react"
import { Route, BrowserRouter as Router, Routes, NavLink, Navigate} from 'react-router-dom'
import useExpenseTrackerData from './hooks/useExpenseTrackerData'


export default function AuthenticatedApp({
  userEmail,
  signOut,
}: {
  userEmail?: string
  signOut: () => void | Promise<void>
}) {
  const {
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
  } = useExpenseTrackerData()

  const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    readyTransactions,
    resetFilters,
  } = useTransactionsFilters(transactions, categories)

const [isMenuOpen, setIsMenuOpen] = useState(false)

function toggleMenu() {
  setIsMenuOpen(prev => !prev)
}

function closeMenu() {
  setIsMenuOpen(false)
}

// ref к инпуту для фокуса на него
const searchInputRef = useRef<HTMLInputElement | null>(null)
useEffect(()=>{
  function handleKeyDown(event: KeyboardEvent) {
    const isTypingField = document.activeElement?.tagName
    if (event.key !== '/') return
    if (isTypingField === 'INPUT' || isTypingField === 'TEXTAREA') return
    searchInputRef.current?.focus()
    event.preventDefault()
  }
  window.addEventListener('keydown', handleKeyDown)
  return ()=>{
    window.removeEventListener('keydown', handleKeyDown)
  }
}, [])

// Подсчет расходов/доходов, баланса
const totals = useMemo(()=>{
  return getIncomeExpenseBalance(transactions)
},[transactions])
// Готовый объект {доход, расход, общий баланс}
const {income, expense, balance} = totals
// Считаем отфильтрованныe значения
const filteredTotals = useMemo(()=>{
  return getIncomeExpenseBalance(readyTransactions)
}, [readyTransactions])
// Отфильтрованный баланс
const filteredBalance = filteredTotals.balance
// Проверяем, есть ли включеные фильтры
const defaultFilters = {
  category: selectedCategory !== "all",
  search: searchTerm !== "",
  sort: sortOption !== 'newest'}
const hasActiveFilters = Object.values(defaultFilters).includes(true);

// Отражение поиска в document.title
useEffect(()=>{
  if (searchTerm === "") {
    document.title = 'Учёт доходов и расходов'
    return }
  document.title = `Поиск: ${searchTerm}`
}, [searchTerm])

// При нажатии на Escape сбрасываются фильтры
useEffect(()=>{
if (!hasActiveFilters) return
function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return
    resetFilters()
  }
  window.addEventListener('keydown',handleKeyDown)
  return ()=>{window.removeEventListener('keydown', handleKeyDown)}
}, [selectedCategory, searchTerm, sortOption])

const isActive = ({isActive}: { isActive: boolean })=>isActive? 'navLink activeNavLink' : 'navLink'
return (
  <TransactionsProvider
    transactions={transactions}
    categories={categories}
    addTransaction={addTransaction}
    editTransaction={editTransaction}
    deleteTransaction={deleteTransaction}
  >
    <Router>
        <div className="nav">
  <div className="nav-inner">
    <button
      type="button"
      className="burger-button"
      onClick={toggleMenu}
      aria-label="Открыть меню"
      aria-expanded={isMenuOpen}
    >
      ☰
    </button>

    

    <nav className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
      <NavLink to="/" end className={isActive} onClick={closeMenu}>
        Главная
      </NavLink>

      <NavLink to="/addCategories" className={isActive} onClick={closeMenu}>
        Категории
      </NavLink>

      <NavLink to="/transactions" className={isActive} onClick={closeMenu}>
        Транзакции
      </NavLink>

      <NavLink to="/statistics" className={isActive} onClick={closeMenu}>
        Статистика
      </NavLink>

      <NavLink to="/about" className={isActive} onClick={closeMenu}>
        О приложении
      </NavLink>

      {userEmail && <span className="nav-user-email">{userEmail}</span>}
      
      <button
        type="button"
        onClick={() => {
          closeMenu()
          signOut()
        }}
      >
        Выйти
      </button>
    </nav>
  </div>
</div>
      {dataLoading && <p>Загрузка данных...</p>}
      {dataError && <p className="error">Ошибка загрузки данных: {dataError}</p>}
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/addCategories' element={<AddCategoryPage
          categories={categories}
          transactions={transactions}
          deleteCategory={deleteCategory}
          addCategory={addCategory}
        />}></Route>
        <Route path='/transactions' element={<TransactionsPage 
          balance={balance}
          filteredBalance={filteredBalance}
          selectedCategory={selectedCategory}
          categories={categories}
          income={income}
          expense={expense}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
          hasActiveFilters={hasActiveFilters}
          resetFilters={resetFilters}
          readyTransactions={readyTransactions}
          transactions={transactions}
          searchInputRef={searchInputRef}
          defaultFilters={defaultFilters}
        />}></Route>
        <Route path="/transaction" element={<Navigate to="/transactions" replace/>} />
        <Route path="/transaction/:transactionId/edit" element={<ChangeTransaction/>}/>
        <Route path='/statistics' element={<StatisticsPage
          transactions={transactions}
          categories={categories}
        />} />
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/category/:categoryId/edit' element={<ChangeCategoryPage
        editCategory={editCategory}
        />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </TransactionsProvider>
  )
}
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
import getLocalDateString from './utils/getLocalDateString'
import type { PeriodPreset, CreateTransactionData, CreateCategoryData, Transaction } from './types'
import Toast from './components/Toast'

type ToastType = 'success' | 'error' | 'info'

type Toast = {
  message: string
  type: ToastType
}

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
 
// Бургер меню открыто/закрыто
const [isMenuOpen, setIsMenuOpen] = useState(false)

function toggleMenu() {
  setIsMenuOpen(prev => !prev)
}

function closeMenu() {
  setIsMenuOpen(false)
}

// Toast уведомления
const [toast, setToast] = useState<Toast | null>(null)

function showToast(message: string, type: ToastType = 'info') {
  setToast({
    message,
    type,
  })
}

async function handleAddCategory(newCategory: CreateCategoryData) {
  await addCategory(newCategory)
  showToast('Категория добавлена', 'success')
}

async function handleDeleteCategory(id: string) {
  await deleteCategory(id)
  showToast('Категория удалена', 'success')
}

async function handleAddTransaction(newTransaction: CreateTransactionData) {
  await addTransaction(newTransaction)
  showToast('Транзакция добавлена', 'success')
}

async function handleEditTransaction(updatedTransaction: Transaction) {
  await editTransaction(updatedTransaction)
  showToast('Транзакция изменена', 'success')
}

async function handleDeleteTransaction(id: string) {
  await deleteTransaction(id)
  showToast('Транзакция удалена', 'success')
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

// Фильтр периода
const today = new Date()
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const firstDay = '01'; 
const [periodPreset, setPeriodPreset] = useState<PeriodPreset>('month')
const [dateFrom, setDateFrom] = useState(`${year}-${month}-${firstDay}`)
const [dateTo, setDateTo] = useState(getLocalDateString(today))
const title = dateFrom || dateTo
  ? `Статистика за период с ${dateFrom || 'начала'} по ${dateTo || 'сегодня'}`
  : 'Выберите период для отображения статистики'
const isInvalidDateRange =
   Boolean(dateFrom && dateTo && dateFrom > dateTo)
const error = isInvalidDateRange ? 'Дата "от" не может быть больше даты "по"' : ''

const transactionsByPeriod = useMemo(() => {
  return transactions.filter((trans) => {
    if (dateFrom && trans.date < dateFrom) return false
    if (dateTo && trans.date > dateTo) return false
    return true
  })
}, [transactions, dateFrom, dateTo])

 const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    readyTransactions,
    resetFilters,
  } = useTransactionsFilters(transactionsByPeriod, categories)

// Подсчет расходов/доходов, баланса
const totals = useMemo(()=>{
  return getIncomeExpenseBalance(transactionsByPeriod)
},[transactionsByPeriod])
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
    addTransaction={handleAddTransaction}
    editTransaction={handleEditTransaction}
    deleteTransaction={handleDeleteTransaction}
  >
    <Router>
        <div className="nav">
          <div className="nav-inner">
            <div className="burger-menu-control">
              <span className="burger-label">Меню</span>
              <button
                type="button"
                className="burger-button"
                onClick={toggleMenu}
                aria-label="Открыть меню"
                aria-expanded={isMenuOpen}
              >
                ☰
              </button>
            </div>

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

      {userEmail && <span className="nav-menu-email">{userEmail}</span>}
      
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

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {dataLoading && <p>Загрузка данных...</p>}
      {dataError && <p className="error">Ошибка загрузки данных: {dataError}</p>}
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/addCategories' element={<AddCategoryPage
          categories={categories}
          transactions={transactions}
          deleteCategory={handleDeleteCategory}
          addCategory={handleAddCategory}
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
          dateFrom={dateFrom}
          dateTo={dateTo}
          periodPreset={periodPreset}
          error={error}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          setPeriodPreset={setPeriodPreset}
          title={title}
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
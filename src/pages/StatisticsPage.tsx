import getCategoryStats from "../utils/getCategoryStats";
import PeriodFilter from "../components/PeriodFilter";
import StatisticsChartCard from "../components/StatisticsChartCard";
import type { Transaction, Category, PeriodPreset, CategoryType} from "../types";
import { useState} from "react";

type StatisticsPageProps = {
  transactions: Transaction[];
  categories: Category[];
}

export default function StatisticsPage({transactions, categories}: StatisticsPageProps) {
const [activeIndex, setActiveIndex] = useState<number | null>(null)
const [activeChart, setActiveChart] = useState<CategoryType | null>(null)
const [dateFrom, setDateFrom] = useState('')
const [dateTo, setDateTo] = useState('')
const [periodPreset, setPeriodPreset] = useState<PeriodPreset>('all')
const title = dateFrom || dateTo
  ? `Статистика за период с ${dateFrom || 'начала'} по ${dateTo || 'сегодня'}`
  : 'Выберите период для отображения статистики'
const isInvalidDateRange =
   Boolean(dateFrom && dateTo && dateFrom > dateTo)
const error = isInvalidDateRange ? 'Дата "от" не может быть больше даты "по"' : ''
const filteredTransactions = transactions.filter(t => {
  if (dateFrom && t.date < dateFrom) {return false}
  if (dateTo && t.date > dateTo) {return false}
  return true
})
const incomeFilteredBalance = filteredTransactions.reduce((acc, t) => t.amount > 0 ? acc + t.amount : acc, 0)
const expenseFilteredBalance = filteredTransactions.reduce((acc, t) => t.amount < 0 ? acc + t.amount : acc, 0)
const incomeStats = getCategoryStats(filteredTransactions, categories, 'income');
const incomeStatsSorted = [...incomeStats].sort((a, b) => b.percent - a.percent);
const expenseStats = getCategoryStats(filteredTransactions, categories, 'expense');
const expenseStatsSorted = [...expenseStats].sort((a, b) => b.percent - a.percent);
const incomeTransactionsCount = filteredTransactions.filter(t => t.amount > 0).length
const expenseTransactionsCount = filteredTransactions.filter(t => t.amount < 0).length

  return (
<div className="statistics-page">
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
  <StatisticsChartCard
  incomeStatsSorted={incomeStatsSorted}
  activeIndex={activeIndex}
  setActiveIndex={setActiveIndex}
  activeChart={activeChart}
  setActiveChart={setActiveChart}
  filteredTransactions={filteredTransactions}
  incomeFilteredBalance={incomeFilteredBalance}
  expenseStatsSorted={expenseStatsSorted}
  expenseFilteredBalance={expenseFilteredBalance}
  incomeTransactionsCount={incomeTransactionsCount}
  expenseTransactionsCount={expenseTransactionsCount}
   />

</div>
)}

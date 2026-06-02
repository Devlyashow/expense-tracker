import React from 'react'
import { COLORS } from '../constants/colorsForPie';
import { PieChart, Pie, Tooltip, Cell  } from 'recharts';
import type { CategoryStatsItem, Transaction, CategoryType } from '../types';


type StatisticsChartCardProps = {
  incomeStatsSorted: CategoryStatsItem[];
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  activeChart: CategoryType | null;
  setActiveChart: React.Dispatch<React.SetStateAction<CategoryType | null>>;
  filteredTransactions: Transaction[];
  incomeFilteredBalance: number;
  expenseStatsSorted: CategoryStatsItem[];
  expenseFilteredBalance: number;
  incomeTransactionsCount: number;
  expenseTransactionsCount: number;
}

export default function StatisticsChartCard({incomeStatsSorted, activeIndex, setActiveIndex, activeChart, setActiveChart, filteredTransactions, incomeFilteredBalance, expenseStatsSorted, expenseFilteredBalance, incomeTransactionsCount, expenseTransactionsCount}: StatisticsChartCardProps) {

  return (
<div className="statistics-container">
    <div className="chart-section chart-income">
          <h2>Доходы</h2>
          {incomeStatsSorted.length === 0 ? <img src="/no-data.png" alt="Нет данных" style={{ display: 'block', margin: '20px auto' }} />
            : <PieChart width={210} height={210} style={{ display: 'block', margin: '0 auto' }}>
            <Pie
              data={incomeStatsSorted}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}>
              {incomeStatsSorted.map((entry, index) => (
                  <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      onMouseEnter={() => {
                        setActiveIndex(index)
                        setActiveChart('income')
                      }}
                      onMouseLeave={() => {
                        setActiveIndex(null)
                        setActiveChart(null)
                      }}
                      opacity={
                        activeChart === null ||
                        activeChart !== 'income' ||
                        activeIndex === index ? 1 : 0.4
                      }
                    />
                )
              )}
              </Pie>
              <Tooltip />
          </PieChart>
          }
          <div className="chart-legend">
            <ul>
                {filteredTransactions.length > 0 && incomeStatsSorted.length > 0 && <div><p>Итог: {incomeFilteredBalance} ₽</p> <p>Количество транзакций: {incomeTransactionsCount}</p></div>}
                {incomeStatsSorted.length === 0 ? <p>В выбранный вами период транзакций не найдено</p> : incomeStatsSorted.length === 0 && <p>Доходов пока нет. Добавьте первую транзакцию через форму на странице "Транзакции"</p>}
                {incomeStatsSorted.map((stat, index) => (
                <li
                key={stat.categoryKey}
                className="chart-legend-item"
                onMouseEnter={() => {
                  setActiveIndex(index)
                  setActiveChart('income')
                  }}
                onMouseLeave={() => {
                setActiveIndex(null)
                setActiveChart(null)
                }}
                >
                  <div className="chart-legend_left">
                    <span style={{ backgroundColor: COLORS[index % COLORS.length] }} className="legend-color"></span>
                    {stat.name}
                  </div>
                  <div className="chart-legend_right">
                    {stat.value} ₽ - {stat.percent}%
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div> 
        <div className="chart-section chart-expense">
            <h2>Расходы</h2>
            {expenseStatsSorted.length === 0 ? <img src="/no-data.png" alt="Нет данных" style={{ display: 'block', margin: '20px auto' }} />
            : <PieChart width={210} height={210} style={{ display: 'block', margin: '0 auto' }}>
              <Pie
                data={expenseStatsSorted}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}>
                {expenseStatsSorted.map((entry, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      onMouseEnter={() => {
                        setActiveIndex(index)
                        setActiveChart('expense')
                      }}
                      onMouseLeave={() => {
                        setActiveIndex(null)
                        setActiveChart(null)
                      }}
                      opacity={
                        activeChart === null ||
                        activeChart !== 'expense' ||
                        activeIndex === index ? 1 : 0.4
                      }
                    />
                  )
                }
                )}
                </Pie>
                <Tooltip />
          </PieChart>}
            
          <div className="chart-legend">
            <ul>
              {filteredTransactions.length > 0 && expenseStatsSorted.length > 0 && <div><p>Итог: {expenseFilteredBalance} ₽</p> <p>Количество транзакций: {expenseTransactionsCount}</p></div>}
              {expenseStatsSorted.length === 0 ? <p>В выбранный вами период транзакций не найдено</p> : expenseStatsSorted.length === 0 && <p>Расходов пока нет. Добавьте первую транзакцию через форму на странице "Транзакции"</p>}
              {expenseStatsSorted.map((stat, index) => (
                <li
                key={stat.categoryKey}
                className="chart-legend-item"
                onMouseEnter={() => {
                  setActiveIndex(index)
                  setActiveChart('expense')
                  }}
                onMouseLeave={() => {
                setActiveIndex(null)
                setActiveChart(null)
                }}
                >
                <div className="chart-legend_left">
                  <span style={{ backgroundColor: COLORS[index % COLORS.length] }} className="legend-color"></span>
                  {stat.name}
                </div>
                <div className="chart-legend_right">
                  {stat.value} ₽ - {stat.percent}%
                </div>
              </li>
              ))}
            </ul>
          </div>
        </div>
    </div>
  )
}

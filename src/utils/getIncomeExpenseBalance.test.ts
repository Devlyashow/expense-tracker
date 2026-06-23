import { describe, test, expect } from 'vitest'
import getIncomeExpenseBalance from './getIncomeExpenseBalance'

describe('getIncomeExpenseBalance', () => {
  test('correctly calculates income, expense and balance', () => {
    const transactions = [
      {
        id: '1',
        category: 'salary',
        text: 'Зарплата',
        amount: 1000,
        date: '2026-06-01',
      },
      {
        id: '2',
        category: 'food',
        text: 'Еда',
        amount: -300,
        date: '2026-06-02',
      },
      {
        id: '3',
        category: 'transport',
        text: 'Такси',
        amount: -200,
        date: '2026-06-03',
      },
    ]

    const result = getIncomeExpenseBalance(transactions)

    expect(result).toEqual({
      income: 1000,
      expense: 500,
      balance: 500,
    })
  })
})
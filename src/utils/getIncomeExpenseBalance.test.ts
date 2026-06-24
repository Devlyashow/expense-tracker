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

        const transactions2 = [
      {
        id: '1',
        category: 'salary',
        text: 'Зарплата',
        amount: 1000,
        date: '2026-06-01',
      },
      {
        id: '2',
        category: 'other-job',
        text: 'Халтуры',
        amount: 500,
        date: '2026-06-02',
      },
      {
        id: '3',
        category: 'capital',
        text: 'Проценты с накоплений',
        amount: 200,
        date: '2026-06-03',
      },
    ]

            const transactions3 = [
      {
        id: '1',
        category: 'food',
        text: 'продукты',
        amount: -500,
        date: '2026-06-01',
      },
      {
        id: '2',
        category: 'transport',
        text: 'Такси',
        amount: -300,
        date: '2026-06-02',
      },
    ]

    const result = getIncomeExpenseBalance(transactions)
    const result2 = getIncomeExpenseBalance(transactions2)
    const result3 = getIncomeExpenseBalance(transactions3)


    expect(result).toEqual({
      income: 1000,
      expense: 500,
      balance: 500,
    })
    expect(result2).toEqual({
      income: 1700,
      expense: 0,
      balance: 1700,
    })
        expect(result2).toEqual({
      income: 1700,
      expense: 0,
      balance: 1700,
    })
  })
})
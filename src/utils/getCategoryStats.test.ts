import { describe, test, expect } from 'vitest'
import getCategoryStats from './getCategoryStats'
import type {Category, Transaction} from '../types/index'

describe('getCategoryStats', () => {

    const categories: Category[] = [
      {id: 'food',
      key: 'food',
      name: 'food',
      type: 'expense'},
      {id: 'salary',
      key: 'salary',
      name: 'salary',
      type: 'income'},
      {id: 'gifts',
      key: 'gifts',
      name: 'gifts',
      type: 'income'},
      {id: 'transport',
      key: 'transport',
      name: 'transport',
      type: 'expense'},
      {id: 'otherjob',
      key: 'otherjob',
      name: 'otherjob',
      type: 'income'
      }
    ]
    const transactions: Transaction[] = [
      {
        id: 'taxi',
        category: 'transport',
        text: 'taxi',
        amount: -500,
        date: '05-07-2026'
      },
      {
        id: 'salary',
        category: 'salary',
        text: 'salary',
        amount: 1000,
        date: '06-07-2026'
      },
      {
        id: 'food',
        category: 'food',
        text: 'products',
        amount: -200,
        date: '06-07-2026'
      },
      {
        id: 'otherjob',
        category: 'otherjob',
        text: 'salary',
        amount: 500,
        date: '06-07-2026'
      },
    ]

test('calculates income category stats', () => {

 const result = getCategoryStats(transactions,categories, 'income')
 expect(result).toEqual([
  {
        categoryKey: 'salary',
        name: 'salary',
        value: 1000,
        percent: 66.67,  
    },
    {
      categoryKey: 'otherjob',
        name: 'otherjob',
        value: 500,
        percent: 33.33, 
    }
  ]
  )
  })

  test('calculates expense category stats', () => {
   const result = getCategoryStats(transactions,categories, 'expense') 
     expect(result).toEqual([
  {
      categoryKey: 'food',
        name: 'food',
        value: 200,
        percent: 28.57,
    },
  {
        categoryKey: 'transport',
        name: 'transport',
        value: 500,
        percent: 71.43,
    },
  ]
  )
  })

  test('excludes categories without transactions', () => {
    const result = getCategoryStats(transactions,categories, 'income') 
     expect(result.some(item => item.categoryKey === 'gifts')).toBe(false)
  })

  test('returns empty array when there are no matching transactions', () => {
    const result = getCategoryStats([],categories, 'income') 
     expect(result).toEqual([])
  })
})
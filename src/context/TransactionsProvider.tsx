import {TransactionsContext} from './TransactionsContext'
import type {TransactionsContextValue} from './TransactionsContext'
import type { ReactNode } from 'react'

type TransactionsProviderProps = TransactionsContextValue & {children: ReactNode}

export default function TransactionsProvider({children,
  transactions,
  categories,
  addTransaction,
  editTransaction,
  deleteTransaction,
}:TransactionsProviderProps) {

    const value: TransactionsContextValue = {
      transactions,
      categories,
      addTransaction,
      editTransaction,
      deleteTransaction,
    }

  return (
    <TransactionsContext.Provider value={value}>
        {children}
    </TransactionsContext.Provider>
  )
}